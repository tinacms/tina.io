import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

const Model = ({ activeGlobeId, ...props }) => {
  const fbx = useLoader(FBXLoader, '/polyearth.fbx');

  const markerPositions = [
    { id: 0, position: [20, -60, 93] }, // Sydney
    { id: 1, position: [50, -70, 70] }, // Auckland
    { id: 2, position: [-40, 100, -18] }, // Oslo
  ];

  return (
    <group {...props} dispose={null} scale={[0.01, 0.01, 0.01]}>
      <primitive object={fbx} />
      {markerPositions.map((marker) => (
        <group key={marker.id} position={new THREE.Vector3(...marker.position)}>
          <Marker index={marker.id} isActive={marker.id === (activeGlobeId - 1)} />
        </group>
      ))}
    </group>
  );
};

const Marker = ({ index, isActive }) => {
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const vec = new THREE.Vector3();
  const center = new THREE.Vector3(0, 0, 0);

  useFrame((state) => {
    if (ref.current) {
      ref.current.lookAt(center);
      if (isActive) {
        const activePosition = ref.current.getWorldPosition(vec)
        const targetPosition = ref.current.getWorldPosition(vec);
        if (activePosition.y < 0)
        {
          const targetPosition = activePosition.add(new THREE.Vector3(0, 0, 2)); 
        }

        if (activePosition.y > 0){
          const targetPosition = activePosition.add(new THREE.Vector3(1, 1, 0));
        }
        state.camera.position.lerp(targetPosition, 0.05);
        state.camera.lookAt(ref.current.getWorldPosition(vec));
      }
    }
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 5, 10, 32]} />
        <meshStandardMaterial color={isActive ? '#FF8000' : 'red'} />
      </mesh>
    </group>
  );
};

const GlobeScene = () => {
  const { gl, scene, camera } = useThree();
  const labelRenderer = useRef<CSS2DRenderer | null>(null);

  useEffect(() => {
    if (!labelRenderer.current) {
      labelRenderer.current = new CSS2DRenderer();
      labelRenderer.current.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.current.domElement.style.position = 'absolute';
      labelRenderer.current.domElement.style.top = '0px';
      document.body.appendChild(labelRenderer.current.domElement);
    }

    const handleResize = () => {
      const currentCamera = camera as THREE.PerspectiveCamera;
      currentCamera.aspect = window.innerWidth / window.innerHeight;
      currentCamera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.current?.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (labelRenderer.current) {
        document.body.removeChild(labelRenderer.current.domElement);
        labelRenderer.current = null;
      }
    };
  }, [camera, gl]);

  useFrame(() => {
    if (labelRenderer.current) {
      labelRenderer.current.render(scene, camera);
    }
  });

  return null;
};

const Globe = ({ activeGlobeId }) => {
  return (
    <>
      <Canvas
        style={{ width: '100%', height: '700px', borderRadius: '1rem' }}
        camera={{ position: [-1.5, -1, 2.4], fov: 50 }}
      >
        <ambientLight intensity={1} />
        <Model position={[0, 0.25, 0]} activeGlobeId={activeGlobeId} />
        <Environment preset="apartment" />
        <GlobeScene />
      </Canvas>
    </>
  );
};

export default Globe;
