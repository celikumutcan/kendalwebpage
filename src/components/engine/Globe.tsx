"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Line } from "@react-three/drei";
import * as THREE from "three";
import { useLightTemperature } from "@/lib/LightTemperatureProvider";
import { getAssetPath } from "@/utils/basePath";

// Helper to convert lat/long to 3D sphere coordinates
const latLongToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

const LOCATIONS = [
  { id: "turkey", lat: 39.9, lon: 32.8 },   // Turkey (Head Office)
  { id: "azerbaijan", lat: 40.4, lon: 49.9 },
  { id: "georgia", lat: 41.7, lon: 44.8 },
  { id: "moldova", lat: 47.0, lon: 28.8 },
  { id: "romania", lat: 44.4, lon: 26.1 },
  { id: "bulgaria", lat: 42.7, lon: 23.3 },
  { id: "albania", lat: 41.3, lon: 19.8 },
  { id: "malta", lat: 35.9, lon: 14.5 },
  { id: "iraq", lat: 33.3, lon: 44.4 },
];

const ARCS = LOCATIONS.slice(1).map(loc => {
  const start = latLongToVector3(LOCATIONS[0].lat, LOCATIONS[0].lon, 2.05);
  const end = latLongToVector3(loc.lat, loc.lon, 2.05);
  
  const mid = start.clone().lerp(end, 0.5);
  const dist = start.distanceTo(end);
  mid.normalize().multiplyScalar(2.05 + dist * 0.3);

  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  return curve.getPoints(50);
});

// Separate component for animated arcs
const AnimatedArc = ({ points, targetColor }: { points: THREE.Vector3[], targetColor: THREE.Color }) => {
  const lineRef = useRef<any>(null);
  
  useFrame((state, delta) => {
    if (lineRef.current?.material) {
      lineRef.current.material.dashOffset -= delta;
    }
  });

  return (
    <Line 
      ref={lineRef}
      points={points}
      color={targetColor}
      lineWidth={2}
      transparent
      opacity={0.8}
      dashed={true}
      dashSize={0.5}
      dashScale={2}
      dashOffset={0}
      blending={THREE.AdditiveBlending}
    />
  );
};

const GlobeScene = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { getProgress } = useLightTemperature();
  
  const [earthTexture, bumpTexture, specularTexture] = useTexture([
    getAssetPath("/textures/earth-dark.jpg"),
    getAssetPath("/textures/earth-topology.png"),
    getAssetPath("/textures/earth-water.png")
  ]);

  useMemo(() => {
    if (earthTexture) {
      earthTexture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [earthTexture]);

  const colorA = useMemo(() => new THREE.Color("#9cb4d8"), []);
  const colorB = useMemo(() => new THREE.Color("#e8b07d"), []);
  const targetColor = useMemo(() => new THREE.Color("#9cb4d8"), []); // Initial color

  useFrame((state, delta) => {
    const p = getProgress();
    targetColor.lerpColors(colorA, colorB, p * 0.8 + 0.1);

    // Fly out of the Earth effect
    // scrollProgress 0 -> camera is inside (z = 0.5)
    // scrollProgress 1 -> camera is outside (z = 5.5)
    const targetZ = THREE.MathUtils.lerp(0.1, 5.5, scrollProgress);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1);

    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.traverse((child: any) => {
        // Exclude the earth mesh standard material
        if (child.isMesh && child.material && child.material.type !== "MeshStandardMaterial") {
           // Only update color if it's not the red HQ pin
           if (child.material.color && child.material.color.getHexString() !== "e3000f") {
             child.material.color.copy(targetColor);
           }
        }
        // For lines from drei (Line2 uses LineMaterial)
        if (child.isLine2 && child.material && child.material.color) {
           child.material.color.copy(targetColor);
        }
      });
    }
  });

  return (
    <group ref={groupRef} rotation={[0.4, -2.1, 0]}>
      {/* Textured Earth Base */}
      <mesh>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial 
          map={earthTexture} 
          bumpMap={bumpTexture}
          bumpScale={0.02}
          roughnessMap={specularTexture}
          roughness={0.6}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Atmospheric Rim Glow */}
      <mesh>
        <sphereGeometry args={[2.12, 48, 48]} />
        <meshBasicMaterial color={targetColor} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </mesh>

      {/* Energy Arcs */}
      {ARCS.map((points, idx) => (
        <AnimatedArc key={`arc-${idx}`} points={points} targetColor={targetColor} />
      ))}

      {/* Pins and Glowing Nodes */}
      {LOCATIONS.map((loc, idx) => {
        const pos = latLongToVector3(loc.lat, loc.lon, 2.06); // Slightly raised
        const isHQ = idx === 0;
        const pinColor = isHQ ? new THREE.Color("#E3000F") : targetColor; // Brand red for HQ
        
        return (
          <group key={`pin-${idx}`} position={pos}>
            <mesh>
              <sphereGeometry args={[isHQ ? 0.08 : 0.04, 16, 16]} />
              <meshBasicMaterial color={pinColor} />
            </mesh>
            <mesh>
              <sphereGeometry args={[isHQ ? 0.3 : 0.15, 16, 16]} />
              <meshBasicMaterial color={pinColor} transparent opacity={isHQ ? 0.8 : 0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export const Globe = ({ scrollProgress = 1 }: { scrollProgress?: number }) => {
  return (
    <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 0.1], fov: 45 }} performance={{ min: 0.5 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={3.5} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={1.0} color="#b0c4de" />
        
        <Suspense fallback={null}>
          <GlobeScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
};
