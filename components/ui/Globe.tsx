import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const geographicToCartesian = (latitude, longitude, radius = 1) => {
  const latRad = (latitude * Math.PI) / 180
  const lonRad = (longitude * Math.PI) / 180
  const x = radius * Math.cos(latRad) * Math.cos(lonRad)
  const y = radius * Math.cos(latRad) * Math.sin(lonRad)
  const z = radius * Math.sin(latRad)
  return [x, y, z]
}

const cartesianToGeographic = (x, y, z, radius = 1) => {
  const latRad = Math.asin(z / radius)
  const lonRad = Math.atan2(y, x)
  const latitude = (latRad * 180) / Math.PI
  const longitude = (lonRad * 180) / Math.PI
  return [latitude, longitude]
}

const Model = ({ activeGlobeId, cardItems, ...props }) => {
  const fbx = useLoader(FBXLoader, '/lowpoly-earth.fbx')
  const chunkyLlamaFbx = useLoader(FBXLoader, '/llama-chunky.fbx')
  const greyLlamaFbx = useLoader(FBXLoader, '/grey-llama.fbx')

  const markerPositions = cardItems.map((item, index) => {
    const position = geographicToCartesian(item.markerLAT, item.markerLONG, 110)
    return { id: index, position }
  })

  return (
    <group {...props} dispose={null} scale={[0.01, 0.01, 0.01]}>
      <primitive object={fbx} />
      {markerPositions.map((marker) => (
        <group key={marker.id} position={new THREE.Vector3(...marker.position)}>
          <Marker
            index={marker.id}
            isActive={marker.id === activeGlobeId}
            chunkyLlamaObject={chunkyLlamaFbx}
            greyLlamaObject={greyLlamaFbx}
          />
        </group>
      ))}
    </group>
  )
}

const Marker = ({ index, isActive, chunkyLlamaObject, greyLlamaObject }) => {
  const ref = useRef<THREE.Group>(null)
  const vec = new THREE.Vector3()
  const center = new THREE.Vector3(0, 0, 0)

  const restrictedRadius = 3.0

  useFrame((state) => {
    if (ref.current) {
      ref.current.lookAt(center)
      ref.current.rotation.z += Math.PI / 2

      if (isActive) {
        const activePosition = ref.current.getWorldPosition(vec)
        const targetPosition = cartesianToGeographic(
          activePosition.x,
          activePosition.y,
          activePosition.z,
          110
        )
        activePosition.y < 0
          ? (targetPosition[1] = targetPosition[1] + 40)
          : (targetPosition[1] = targetPosition[1] - 40)
        activePosition.y < 0
          ? (targetPosition[0] = targetPosition[0] - 30)
          : (targetPosition[0] = targetPosition[0] - 5)

        const targetGeometric = new THREE.Vector3(
          ...geographicToCartesian(targetPosition[0], targetPosition[1], 3)
        )

        state.camera.position.lerp(targetGeometric, 0.01)

        const newDistance = state.camera.position.distanceTo(center)
        if (newDistance < restrictedRadius) {
          const direction = state.camera.position.clone().normalize()
          state.camera.position.copy(direction.multiplyScalar(restrictedRadius))
        }

        state.camera.lookAt(ref.current.getWorldPosition(vec))
      }
    }
  })

  return (
    <group ref={ref}>
      <primitive
        object={isActive ? chunkyLlamaObject.clone() : greyLlamaObject.clone()}
        scale={[0.1, 0.1, 0.1]}
      />
    </group>
  )
}

const Globe = ({ activeGlobeId, cardItems }) => {
  const containerRef = useRef(null)
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([-2, -1, -3])
  const [canvasSize, setCanvasSize] = useState({
    width: '100%',
    height: '700px',
  })

  useEffect(() => {
    const updateControls = () => {
      if (window.innerWidth <= 425) {
        setCameraPosition([0, 0, 4.5])
      }
    }

    const updateSize = () => {
      if (containerRef.current) {
        const container = containerRef.current
        const height = window.innerWidth <= 600 ? '500px' : '700px'
        setCanvasSize({ width: container.clientWidth, height })
      }
    }

    updateControls()
    updateSize()

    window.addEventListener('resize', updateControls)
    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateControls)
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '700px' }}>
      <Canvas
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
          borderRadius: '1rem',
        }}
        camera={{ position: cameraPosition, fov: 50 }}
      >
        <ambientLight intensity={3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={1} />
        <directionalLight position={[5, -5, 5]} intensity={1} />
        <Model
          position={[0, 0, 0]}
          activeGlobeId={activeGlobeId}
          cardItems={cardItems}
        />
      </Canvas>
    </div>
  )
}

export default Globe
