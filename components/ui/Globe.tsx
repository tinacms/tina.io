import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

const Model = ({ activeGlobeId, ...props }) => {
  const fbx = useLoader(FBXLoader, '/lowpoly-earth.fbx');
  const llamaFbx = useLoader(FBXLoader, '/llama-chunky.fbx');

  const markerPositions = [
    { id: 0, position: [-80, -58, -48] }, // Sydney
    { id: 1, position: [-80, -70, -10] }, // Auckland
    { id: 2, position: [50, 95, -10] }, // Oslo
    { id: 3, position: [80, 70, 10] }, // Porto
  ];

  return (
    <group {...props} dispose={null} scale={[0.01, 0.01, 0.01]}>
      <primitive object={fbx} />
      {markerPositions.map((marker) => (
        <group key={marker.id} position={new THREE.Vector3(...marker.position)}>
          <Marker index={marker.id} isActive={marker.id === (activeGlobeId - 1)} llamaObject={llamaFbx} />
        </group>
      ))}
    </group>
  );
};

const Marker = ({ index, isActive, llamaObject }) => {
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
          const targetPosition = activePosition.add(new THREE.Vector3(-1, -0.5, -1.5)); 
        }

        if (activePosition.y > 0){
          const targetPosition = activePosition.add(new THREE.Vector3(1 , 0.5, 1.5));
        }
        state.camera.position.lerp(targetPosition, 0.05);
        state.camera.lookAt(ref.current.getWorldPosition(vec));

        console.log(`Camera Position: ${state.camera.position.x}, ${state.camera.position.y}, ${state.camera.position.z}`);
      }
    }
  });

  return (
    <group ref={ref}>
      <primitive object={llamaObject.clone()} scale={[0.1, 0.1, 0.1]} />
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
 const [isEnabledOrbitControls, setEnableOrbitControls] = useState(false);
 const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 3.4]);

 useEffect(() => {
    const updateControls = () => {
        setEnableOrbitControls(window.innerWidth > 768 ? false : true);

        if (window.innerWidth <= 425)
        {
            setCameraPosition([0, 0, 4.5]);
        }
    }

    updateControls();
    window.addEventListener('resize', updateControls);
 })



  return (
    <>
<Canvas
  style={{ width: '100%', height: '700px', borderRadius: '1rem' }}
  camera={{ position: cameraPosition, fov: 50 }}
>
  <ambientLight intensity={3} />
  <directionalLight position={[5, 5, 5]} intensity={1} />
  <directionalLight position={[-5, 5, 5]} intensity={1} />
  <directionalLight position={[5, -5, 5]} intensity={1} />
  <Model position={[0, 0, 0]} activeGlobeId={activeGlobeId} />
  <Environment preset="forest" />
  <GlobeScene />
  <OrbitControls />
</Canvas>


    </>
  );
};

export default Globe;
