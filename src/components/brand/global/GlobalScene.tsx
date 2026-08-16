"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A glowing light source that moves along the edges and paints the back wall with vibrant color
function MovingColorLight({ color, startPos, speed, radiusX, radiusY, timeOffset }: any) {
  const lightRef = useRef<THREE.PointLight>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (lightRef.current && meshRef.current) {
      const t = state.clock.elapsedTime * speed + timeOffset;
      const scrollY = window.scrollY;
      
      // Move in a large elliptical path around the edges
      const x = Math.sin(t) * radiusX;
      const y = Math.cos(t * 0.8) * radiusY - (scrollY * 0.005);
      
      lightRef.current.position.set(x, y, startPos[2]);
      meshRef.current.position.set(x, y, startPos[2]);
    }
  });

  return (
    <group>
      {/* Intense light painting the wall */}
      <pointLight ref={lightRef} color={color} intensity={50} distance={15} decay={2} position={startPos} />
      
      {/* The glowing core (makes it look like a physical light source floating) */}
      <mesh ref={meshRef} position={startPos}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function VibrantLightShow() {
  return (
    <>
      {/* Very low ambient light so the colorful lights pop brilliantly against the white wall */}
      <ambientLight intensity={0.1} />

      {/* The massive white architectural wall that catches the light */}
      <mesh receiveShadow position={[0, 0, -3]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Colorful Lights moving around the edges! */}
      
      {/* Top Left - Deep Magenta */}
      <MovingColorLight color="#ff00aa" startPos={[-8, 6, -1.5]} speed={0.4} radiusX={10} radiusY={6} timeOffset={0} />
      
      {/* Top Right - Cyan */}
      <MovingColorLight color="#00f2fe" startPos={[8, 5, -1.5]} speed={0.3} radiusX={9} radiusY={7} timeOffset={Math.PI} />
      
      {/* Bottom Left - Global Gold */}
      <MovingColorLight color="#FFDA51" startPos={[-7, -5, -1.5]} speed={0.5} radiusX={8} radiusY={8} timeOffset={Math.PI / 2} />
      
      {/* Bottom Right - Electric Blue */}
      <MovingColorLight color="#0055ff" startPos={[7, -6, -1.5]} speed={0.35} radiusX={11} radiusY={5} timeOffset={Math.PI * 1.5} />
    </>
  );
}

export function GlobalScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-screen bg-zinc-50">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 45 }}>
        <VibrantLightShow />
      </Canvas>
    </div>
  );
}
