import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const geographicToCartesian = (latitude, longitude, radius = 1) => {
  const latRad = (latitude * Math.PI) / 180;
  const lonRad = (longitude * Math.PI) / 180;
  const x = radius * Math.cos(latRad) * Math.cos(lonRad);
  const y = radius * Math.cos(latRad) * Math.sin(lonRad);
  const z = radius * Math.sin(latRad);
  return [x, y, z];
};

const cartesianToGeographic = (x, y, z, radius = 1) => {
  const latRad = Math.asin(z / radius);
  const lonRad = Math.atan2(y, x);
  const latitude = (latRad * 180) / Math.PI;
  const longitude = (lonRad * 180) / Math.PI;
  return [latitude, longitude];
};

// Smooth easing function for natural animation
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const countryCoordinates = [
  { country: 'Oslo', lat: 59, lng: 10 },
  { country: 'Copenhagen', lat: 0, lng: 0 },
  { country: 'Porto', lat: 0, lng: 0 },
  { country: 'Melbourne', lat: -26.81015, lng: 225.96399 },
  { country: 'Oslo', lat: -1, lng: 59 },
  { country: 'London', lat: 7, lng: 52 },
  { country: 'Melbourne', lat: -27.81015, lng: 220.9541 },
  { country: 'Melbourne', lat: -27.81015, lng: 220.9541 },
  { country: 'Newcastle', lat: -27.81015, lng: 210 },
];

const Model = ({ activeGlobeId, cardItems, ...props }) => {
  const groupRef = useRef<THREE.Group>(null);
  const fbx = useLoader(FBXLoader, '/lowpoly-earth.fbx');
  const chunkyLlamaFbx = useLoader(FBXLoader, '/llama-chunky.fbx');
  const greyLlamaFbx = useLoader(FBXLoader, '/grey-llama.fbx');

  // Animation state for globe rotation
  const isAnimating = useRef(false);
  const animationProgress = useRef(0);
  const startRotation = useRef(new THREE.Euler());
  const targetRotation = useRef(new THREE.Euler());
  const previousActiveId = useRef(activeGlobeId);

  const animationSpeed = 0.02;

  const markerPositions = cardItems.map((item, index) => {
    const position = geographicToCartesian(
      item.markerLAT,
      item.markerLONG,
      110
    );
    return { id: index, position, lat: item.markerLAT, lng: item.markerLONG };
  });

  // Check for markers at the same location
  const getMarkersAtSameLocation = (currentIndex) => {
    const currentMarker = markerPositions[currentIndex];
    if (!currentMarker) return [];

    return markerPositions.filter(
      (marker, index) =>
        index !== currentIndex &&
        Math.abs(marker.lat - currentMarker.lat) < 0.001 && // Very small tolerance for "same" location
        Math.abs(marker.lng - currentMarker.lng) < 0.001
    );
  };

  useFrame(() => {
    if (!groupRef.current) return;

    // Check if we need to start a new animation
    if (activeGlobeId !== previousActiveId.current && activeGlobeId !== null) {
      isAnimating.current = true;
      animationProgress.current = 0;
      startRotation.current.copy(groupRef.current.rotation);

      // Find the active marker
      const activeMarker = markerPositions[activeGlobeId];
      if (activeMarker) {
        // Calculate rotation needed to bring marker to front center with optimal viewing angle
        // Convert lat/lng to rotation angles and add hemisphere-aware offsets for better pin visibility

        // Longitude rotation (Y-axis) - brings the pin to the front horizontally
        let targetRotationY = THREE.MathUtils.degToRad(-activeMarker.lng);

        // Latitude rotation (X-axis) - tilts the globe to show the pin at a good angle
        let targetRotationX = THREE.MathUtils.degToRad(-activeMarker.lat);

        // Hemisphere-aware viewing angle offsets
        const isNorthernHemisphere = activeMarker.lat > 0;
        const isSouthernHemisphere = activeMarker.lat < 0;
        const isEasternHemisphere = activeMarker.lng > 0;

        // X-axis offset (vertical tilt) - depends on hemisphere
        let viewingOffsetX;
        if (isNorthernHemisphere) {
          // For northern hemisphere, tilt down to show the pin better
          viewingOffsetX = THREE.MathUtils.degToRad(20);
        } else if (isSouthernHemisphere) {
          // For southern hemisphere, tilt up to show the pin better
          viewingOffsetX = THREE.MathUtils.degToRad(-20);
        } else {
          // For equatorial regions, slight downward tilt
          viewingOffsetX = THREE.MathUtils.degToRad(10);
        }

        // Y-axis offset (horizontal rotation) - slight adjustment for depth
        let viewingOffsetY;
        if (isEasternHemisphere) {
          // Eastern hemisphere - rotate slightly west for better angle
          viewingOffsetY = THREE.MathUtils.degToRad(-5);
        } else {
          // Western hemisphere - rotate slightly east for better angle
          viewingOffsetY = THREE.MathUtils.degToRad(5);
        }

        // Apply the hemisphere-aware offsets
        targetRotationX += viewingOffsetX;
        targetRotationY += viewingOffsetY;

        // Handle edge cases for poles to prevent over-rotation
        targetRotationX = THREE.MathUtils.clamp(
          targetRotationX,
          -Math.PI / 2 + 0.3,
          Math.PI / 2 - 0.3
        );

        targetRotation.current.set(targetRotationX, targetRotationY, 0);
      }

      previousActiveId.current = activeGlobeId;
    }

    // Animate globe rotation with smooth interpolation on both axes
    if (isAnimating.current) {
      animationProgress.current += animationSpeed;
      const easedProgress = easeInOutCubic(
        Math.min(animationProgress.current, 1)
      );

      // Smooth interpolation between start and target rotation on both X and Y axes
      const currentRotation = new THREE.Euler().copy(startRotation.current);

      // Animate X-axis rotation (latitude/vertical positioning)
      currentRotation.x = THREE.MathUtils.lerp(
        startRotation.current.x,
        targetRotation.current.x,
        easedProgress
      );

      // Animate Y-axis rotation (longitude/horizontal positioning)
      currentRotation.y = THREE.MathUtils.lerp(
        startRotation.current.y,
        targetRotation.current.y,
        easedProgress
      );

      groupRef.current.rotation.copy(currentRotation);

      // End animation when complete
      if (animationProgress.current >= 1) {
        isAnimating.current = false;
        animationProgress.current = 0;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      {...props}
      dispose={null}
      scale={[0.012, 0.012, 0.012]}
    >
      <primitive object={fbx} />
      {markerPositions.map((marker) => (
        <group key={marker.id} position={new THREE.Vector3(...marker.position)}>
          <Marker
            index={marker.id}
            isActive={marker.id === activeGlobeId}
            chunkyLlamaObject={chunkyLlamaFbx}
            greyLlamaObject={greyLlamaFbx}
            hasCollisions={getMarkersAtSameLocation(marker.id).length > 0}
          />
        </group>
      ))}
    </group>
  );
};

const Marker = ({
  index,
  isActive,
  chunkyLlamaObject,
  greyLlamaObject,
  hasCollisions,
}) => {
  const ref = useRef<THREE.Group>(null);
  const center = new THREE.Vector3(0, 0, 0);

  useFrame(() => {
    if (ref.current) {
      // Always face outward from the center
      ref.current.lookAt(center);
      ref.current.rotation.z += Math.PI / 2;

      // Handle collision positioning - move active marker forward when there are collisions
      if (hasCollisions) {
        if (isActive) {
          // Move active marker slightly forward (towards camera) to make it visible
          const forwardOffset = 0.15;
          const direction = ref.current.position.clone().normalize();
          ref.current.position.copy(
            direction.multiplyScalar(110 + forwardOffset)
          );
        } else {
          // Move inactive markers slightly back when there's an active collision
          const backwardOffset = -0.05;
          const direction = ref.current.position.clone().normalize();
          ref.current.position.copy(
            direction.multiplyScalar(110 + backwardOffset)
          );
        }
      } else {
        // Reset to original position when no collisions
        const direction = ref.current.position.clone().normalize();
        ref.current.position.copy(direction.multiplyScalar(110));
      }
    }
  });

  // Calculate scale based on active state and collisions
  const getMarkerScale = () => {
    if (hasCollisions && isActive) {
      // Make active marker larger when there are collisions
      return [0.13, 0.13, 0.13];
    } else if (isActive) {
      // Standard active marker scale
      return [0.12, 0.12, 0.12];
    } else {
      // Standard inactive marker scale
      return [0.1, 0.1, 0.1];
    }
  };

  return (
    <group ref={ref}>
      <primitive
        object={isActive ? chunkyLlamaObject.clone() : greyLlamaObject.clone()}
        scale={getMarkerScale()}
      />
    </group>
  );
};

const Globe = ({ activeGlobeId, cardItems }) => {
  const containerRef = useRef(null);
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, 0, 4]);
  const [canvasSize, setCanvasSize] = useState({
    width: '100%',
    height: '700px',
  });

  useEffect(() => {
    const updateControls = () => {
      if (window.innerWidth <= 425) {
        setCameraPosition([0, 0, 5]);
      } else {
        setCameraPosition([0, 0, 4]);
      }
    };

    const updateSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const height = window.innerWidth <= 600 ? '500px' : '700px';
        setCanvasSize({ width: container.clientWidth, height });
      }
    };

    updateControls();
    updateSize();

    window.addEventListener('resize', updateControls);
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateControls);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '700px' }}>
      <Canvas
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
          borderRadius: '1rem',
        }}
        camera={{
          position: cameraPosition,
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={2.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 5, 5]} intensity={0.8} />
        <directionalLight position={[5, -5, 5]} intensity={0.8} />
        <Model
          position={[0, 0, 0]}
          activeGlobeId={activeGlobeId}
          cardItems={cardItems}
        />
      </Canvas>
    </div>
  );
};

export default Globe;
