'use client';

import { Environment, Float, Sparkles } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// A modern, high-end fan rotor design
function AeroBlades() {
  const pedestalRef = useRef<THREE.Group>(null);
  const bladeRef = useRef<THREE.Group>(null);
  const velocityRef = useRef(0);
  const lastScrollRef = useRef(0);
  const mouseXRef = useRef(0);

  useEffect(() => {
    lastScrollRef.current = window.scrollY || 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const scrollY = window.scrollY || 0;
    const scrollDelta = scrollY - lastScrollRef.current;
    lastScrollRef.current = scrollY;

    velocityRef.current += scrollDelta * 0.0015;
    velocityRef.current = THREE.MathUtils.clamp(
      velocityRef.current,
      -0.05,
      0.05,
    );
    velocityRef.current *= 0.9 ** (delta * 60);

    if (bladeRef.current) {
      bladeRef.current.rotation.z -= velocityRef.current;
      bladeRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }

    if (pedestalRef.current) {
      const sweep = Math.sin(state.clock.elapsedTime * 0.25) * 0.25;
      const target = sweep + mouseXRef.current * 0.2;
      pedestalRef.current.rotation.y +=
        (target - pedestalRef.current.rotation.y) * 0.03;
    }
  });

  const numBlades = 5;
  const blades = Array.from({ length: numBlades }).map((_, i) => {
    const angle = (i / numBlades) * Math.PI * 2;
    return (
      <group key={i} rotation={[0, 0, angle]}>
        <mesh position={[0, 3.5, 0]} rotation={[0, 0.4, 0]}>
          <boxGeometry args={[1.2, 6, 0.05]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
      </group>
    );
  });

  return (
    <group ref={pedestalRef} position={[0, 0, -8]} scale={1.5}>
      <group ref={bladeRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.5, 32]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.26]}>
          <cylinderGeometry args={[1.2, 1.2, 0.05, 32]} />
          <meshStandardMaterial
            color="#e2e8f0"
            roughness={0.5}
            metalness={0.8}
          />
        </mesh>

        {blades}
      </group>
    </group>
  );
}

// Drifting "wind" shapes to give a sense of airflow
function AirCurrents() {
  return (
    <>
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={1}
        position={[-5, 3, -2]}
      >
        <mesh>
          <torusGeometry args={[3, 0.05, 16, 100, Math.PI]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      </Float>

      <Float
        speed={1.5}
        rotationIntensity={0.8}
        floatIntensity={1.5}
        position={[6, -2, -3]}
      >
        <mesh>
          <torusGeometry args={[4, 0.02, 16, 100, Math.PI / 1.5]} />
          <meshBasicMaterial color="#7dd3fc" transparent opacity={0.4} />
        </mesh>
      </Float>
    </>
  );
}

function BreezeEnvironment() {
  return (
    <>
      <fog attach="fog" args={['#bae6fd', 10, 30]} />

      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.8}
        color="#ffffff"
      />
      <directionalLight
        position={[-10, -10, 5]}
        intensity={0.3}
        color="#7dd3fc"
      />

      <AeroBlades />

      <AirCurrents />

      <Sparkles
        count={200}
        scale={20}
        size={4}
        speed={0.4}
        opacity={0.3}
        color="#ffffff"
        position={[0, 0, -2]}
      />

      <mesh position={[0, 0, -15]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#bae6fd" roughness={1} />
      </mesh>

      <Environment resolution={256}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh position={[0, 5, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshBasicMaterial color="#bae6fd" />
          </mesh>
        </group>
      </Environment>
    </>
  );
}

export function VantiScene({ onReady }: { onReady?: () => void }) {
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () =>
      setIsTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-screen bg-sky-50">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        frameloop={isTabVisible ? 'always' : 'never'}
        onCreated={() => {
          requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()));
        }}
      >
        <BreezeEnvironment />
      </Canvas>
    </div>
  );
}
