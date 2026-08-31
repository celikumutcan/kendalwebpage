'use client';

import { Sparkles } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const SUMMIT_GOLD = new THREE.Color('#ffb35c');
const SUN_OFF = new THREE.Color(0.03, 0.03, 0.05);

// Driven by scroll position past the hero — the summit stays dark until the
// visitor descends into the page, then first light climbs over the ridge.
let k2DawnProgress = 0;

function ScrollManager() {
  useEffect(() => {
    const handleScroll = () => {
      const introOffset = 500;
      const scrollY = window.scrollY;

      if (scrollY <= introOffset) {
        k2DawnProgress = 0;
      } else {
        const climbDistance = 1600;
        k2DawnProgress = Math.min(
          1,
          Math.max(0, (scrollY - introOffset) / climbDistance),
        );
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return null;
}

function Sunrise() {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const powerRef = useRef(0);

  useFrame(() => {
    powerRef.current += (k2DawnProgress - powerRef.current) * 0.035;
    const p = powerRef.current;
    const y = -1.6 + p * 4.6;

    if (sunRef.current) {
      const mat = sunRef.current.material as THREE.MeshBasicMaterial;
      mat.color.copy(SUN_OFF).lerp(SUMMIT_GOLD, p);
      sunRef.current.position.y = y;
      sunRef.current.scale.setScalar(0.45 + p * 0.55);
    }
    if (glowLightRef.current) {
      glowLightRef.current.position.y = y;
      glowLightRef.current.intensity = p * 45;
    }
    if (rimLightRef.current) {
      rimLightRef.current.intensity = 0.12 + p * 1.8;
      rimLightRef.current.position.y = y * 0.6 + 1.5;
    }
  });

  return (
    <>
      <mesh ref={sunRef} position={[3.4, -1.6, -6.5]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={SUN_OFF} />
      </mesh>
      <pointLight
        ref={glowLightRef}
        color="#ffb35c"
        position={[3.4, -1.6, -6.5]}
        distance={32}
        decay={2}
        intensity={0}
      />
      <directionalLight
        ref={rimLightRef}
        color="#ffcf9c"
        position={[3.4, 2, -3]}
        intensity={0.12}
      />
    </>
  );
}

function Peak({
  position,
  height,
  radius,
  rotation = 0,
  color = '#23232b',
  snowCap = true,
}: {
  position: [number, number, number];
  height: number;
  radius: number;
  rotation?: number;
  color?: string;
  snowCap?: boolean;
}) {
  return (
    <group>
      <mesh
        position={position}
        rotation={[0, rotation, 0]}
        castShadow
        receiveShadow
      >
        <coneGeometry args={[radius, height, 5]} />
        <meshStandardMaterial
          color={color}
          roughness={0.88}
          metalness={0.08}
          flatShading
        />
      </mesh>
      {snowCap && (
        <mesh
          position={[position[0], position[1] + height * 0.34, position[2]]}
          rotation={[0, rotation, 0]}
          castShadow
        >
          <coneGeometry args={[radius * 0.42, height * 0.42, 5]} />
          <meshStandardMaterial
            color="#eef3f8"
            roughness={0.55}
            metalness={0.05}
            flatShading
          />
        </mesh>
      )}
    </group>
  );
}

function MountainRange() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseXRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const target = mouseXRef.current * 0.12;
      groupRef.current.rotation.y +=
        (target - groupRef.current.rotation.y) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2.4, -4]}>
      {/* distant range */}
      <Peak
        position={[-6.2, -0.7, -6]}
        height={2.4}
        radius={2.1}
        rotation={0.6}
        color="#242428"
        snowCap={false}
      />
      <Peak
        position={[5.8, -0.9, -6.4]}
        height={2.1}
        radius={1.9}
        rotation={-0.35}
        color="#242428"
        snowCap={false}
      />

      {/* K2 summit */}
      <Peak
        position={[0, 1.3, 0]}
        height={5.8}
        radius={2.7}
        rotation={0.12}
        color="#1c1c1f"
      />

      {/* flanking peaks */}
      <Peak
        position={[-2.8, 0.1, -1.4]}
        height={3.4}
        radius={2}
        rotation={0.42}
        color="#19191c"
      />
      <Peak
        position={[2.9, -0.2, -1.6]}
        height={2.9}
        radius={1.8}
        rotation={-0.5}
        color="#19191c"
      />
    </group>
  );
}

function K2Environment() {
  return (
    <>
      <fog attach="fog" args={['#3a3a40', 6, 24]} />
      <ambientLight intensity={0.45} color="#9b9691" />

      <Sparkles
        count={90}
        scale={[24, 10, 14]}
        size={1.3}
        speed={0.12}
        opacity={0.25}
        color="#ffe4c2"
        position={[0, 4, -3]}
      />

      <MountainRange />
      <Sunrise />

      <mesh
        receiveShadow
        position={[0, -2.2, -5]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[100, 100, 1, 1]} />
        <meshStandardMaterial color="#1c1c1f" roughness={0.95} />
      </mesh>
    </>
  );
}

export function K2Scene({ onReady }: { onReady?: () => void }) {
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () =>
      setIsTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-screen bg-[#3a3a40]">
      <ScrollManager />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 45 }}
        frameloop={isTabVisible ? 'always' : 'never'}
        onCreated={() => {
          requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()));
        }}
      >
        <K2Environment />
      </Canvas>
    </div>
  );
}
