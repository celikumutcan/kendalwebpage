"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Environment } from "@react-three/drei";
import * as THREE from "three";

// A modern, high-end fan rotor design
function AeroBlades() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Fan rotation is now completely tied to the user's scroll position!
      const scrollY = window.scrollY || 0;
      
      // Adjust the multiplier to control how fast it spins when scrolling
      // Using lerp for a smoother deceleration would be nice, but direct mapping is snappier
      groupRef.current.rotation.z = -(scrollY * 0.003);
      
      // Slight floating/wobble effect based on time to keep it alive even when stopped
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const numBlades = 5;
  const blades = Array.from({ length: numBlades }).map((_, i) => {
    const angle = (i / numBlades) * Math.PI * 2;
    return (
      <group key={i} rotation={[0, 0, angle]}>
        {/* Blade positioned outward from the hub, with a slight pitch (twist) to catch air */}
        <mesh position={[0, 3.5, 0]} rotation={[0, 0.4, 0]} castShadow receiveShadow>
          {/* A stretched, thin, elegant blade shape */}
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
    <group ref={groupRef} position={[0, 0, -8]} scale={1.5}>
      {/* The Central Hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.5, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.5} />
      </mesh>
      
      {/* The Inner Hub detailing */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.26]}>
        <cylinderGeometry args={[1.2, 1.2, 0.05, 32]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* The Blades */}
      {blades}
    </group>
  );
}

// Drifting "wind" shapes to give a sense of airflow
function AirCurrents() {
  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[-5, 3, -2]}>
        <mesh>
          <torusGeometry args={[3, 0.05, 16, 100, Math.PI]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5} position={[6, -2, -3]}>
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
      {/* Fresh, softer fog for even more text contrast */}
      <fog attach="fog" args={["#bae6fd", 10, 30]} />
      
      {/* Dimmed daylight to make text pop significantly */}
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight position={[10, 20, 10]} intensity={0.8} color="#ffffff" castShadow />
      <directionalLight position={[-10, -10, 5]} intensity={0.3} color="#7dd3fc" />

      {/* Aerodynamic Centerpiece */}
      <AeroBlades />
      
      {/* Wind lines */}
      <AirCurrents />

      {/* Airborne particles (dust motes / pollen) flowing in the wind */}
      <Sparkles 
        count={200} 
        scale={20} 
        size={4} 
        speed={0.4} 
        opacity={0.3} 
        color="#ffffff" 
        position={[0, 0, -2]} 
      />

      {/* Infinity Sky/Studio Background */}
      <mesh receiveShadow position={[0, 0, -15]}>
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

export function VantiScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-screen bg-gradient-to-br from-teal-100 to-sky-200">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 45 }}>
        <BreezeEnvironment />
      </Canvas>
    </div>
  );
}
