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

  const restrictedRadius = 1.5;

  useFrame((state) => {
    if (ref.current) {
      ref.current.lookAt(center);
      if (isActive) {
        const activePosition = ref.current.getWorldPosition(vec);
        const targetPosition = ref.current.getWorldPosition(vec);
        activePosition.y < 0 ? targetPosition.add(new THREE.Vector3(-1, -0.5, -1.5)) : targetPosition.add(new THREE.Vector3(1, 0.5, 1.5));

        const distance = targetPosition.distanceTo(center);

        if (distance < restrictedRadius) {
          const direction = targetPosition.clone().normalize();
          targetPosition.copy(direction.multiplyScalar(restrictedRadius));
        }

        state.camera.position.lerp(targetPosition, 0.05);

        const newDistance = state.camera.position.distanceTo(center);
        if (newDistance < restrictedRadius) {
          const direction = state.camera.position.clone().normalize();
          state.camera.position.copy(direction.multiplyScalar(restrictedRadius));
        }

        state.camera.lookAt(ref.current.getWorldPosition(vec));
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
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 3.4]);
  const [canvasHeight, setCanvasHeight] = useState('700px');

  useEffect(() => {
    const updateControls = () => {
      if (window.innerWidth <= 425) {
        setCameraPosition([0, 0, 4.5]);
      }
    };

    const updateHeight = () => {
      if (window.innerWidth <= 600) {
        setCanvasHeight('500px');
      } else {
        setCanvasHeight('700px');
      }
    };

    updateControls();
    updateHeight();

    window.addEventListener('resize', updateControls);
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateControls);
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <>
      <Canvas
        style={{ width: '100%', height: canvasHeight, borderRadius: '1rem' }}
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
