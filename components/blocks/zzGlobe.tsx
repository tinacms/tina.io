// Globe.tsx
import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  Html,
  OrbitControls,
  Environment,
  ContactShadows,
} from '@react-three/drei'
import { FaMapMarkerAlt } from 'react-icons/fa'
import * as THREE from 'three'

const Model = (props) => {
  const { nodes, materials } = useGLTF('/earth.gltf') as any
  return (
    <group rotation={[-Math.PI / 2, 0, Math.PI]} {...props} dispose={null}>
      /* Rendering materials of the globe */
      <mesh
        geometry={(nodes['URF-Height_Lampd_Ice_0'] as any).geometry}
        material={materials.Lampd_Ice}
      />
      <mesh
        geometry={(nodes['URF-Height_watr_0'] as any).geometry}
        material={materials.watr}
        material-color="#ADD8E6"
        material-roughness={0}
      />
      <mesh
        geometry={(nodes['URF-Height_Lampd_0'] as any).geometry}
        material={materials.Lampd}
        material-color="orange"
      >
        /* Create Markers */
        <Marker rotation={[-1, , 0]} position={[0.8, -0.8, -0.6]}>
          <FaMapMarkerAlt style={{ color: 'orange' }} />
          <div
            style={{ position: 'absolute', fontSize: 10, letterSpacing: -0.5 }}
          >
            Sydney
          </div>
        </Marker>


        <group position={[0, 0, 1.3]} rotation={[0, 0, Math.PI]}>
          <Marker rotation={[0, Math.PI / 2, Math.PI / 2]}>
            <div
              style={{
                position: 'absolute',
                fontSize: 10,
                letterSpacing: -0.5,
                left: 17.5,
              }}
            >
              north
            </div>
            <FaMapMarkerAlt style={{ color: 'indianred' }} />
          </Marker>
        </group>
      </mesh>
    </group>
  )
}

const Marker = ({ children, ...props }) => {
  const ref = useRef<THREE.Group>(null)
  const [isOccluded, setOccluded] = useState(false)
  const [isInRange, setInRange] = useState(false)
  const isVisible = isInRange && !isOccluded
  const vec = new THREE.Vector3()

  useFrame((state) => {
    if (ref.current) {
      const range =
        state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <=
        10
      if (range !== isInRange) setInRange(range)
    }
  })

  return (
    <group ref={ref}>
      <Html
        transform
        occlude
        onOcclude={setOccluded}
        style={{
          transition: 'all 0.2s',
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isVisible ? 1 : 0.25})`,
        }}
        {...props}
      >
        {children}
      </Html>
    </group>
  )
}

const Globe = () => {
  return (
    <Canvas
      style={{ width: '100%', height: '500px' }}
      camera={{ position: [5, 0, 0], fov: 50 }}
    >
      <ambientLight intensity={1} />
      <Model position={[0, 0.25, 0]} />
      <Environment preset="city" />
      <ContactShadows
        frames={1}
        scale={100}
        position={[0, -1, 0]}
        far={1}
        blur={5}
        opacity={0.5}
        color="#204080"
      />
      <OrbitControls />
    </Canvas>
  )
}

export default Globe
