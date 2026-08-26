"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const WARM_WHITE = "#FFE5B4";
const OFF_COLOR = new THREE.Color(0.05, 0.05, 0.05);

let globalScrollProgress = 0;

function ScrollManager() {
  useEffect(() => {
    const handleScroll = () => {
      const introOffset = 1500;
      const scrollY = window.scrollY;
      
      if (scrollY <= introOffset) {
        globalScrollProgress = 0;
      } else {
        const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight - introOffset);
        globalScrollProgress = Math.min(1, Math.max(0, (scrollY - introOffset) / maxScroll));
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return null;
}

function MainChandelier() {
  const bulbRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const ringRef = useRef<THREE.Group>(null);
  const powerRef = useRef(0);

  useFrame((state) => {
    const targetPower = globalScrollProgress === 0 ? 0 : 1;
    powerRef.current += (targetPower - powerRef.current) * 0.05;
    const power = powerRef.current;

    if (bulbRef.current) {
      const mat = bulbRef.current.material as THREE.MeshBasicMaterial;
      mat.color.copy(OFF_COLOR).lerp(new THREE.Color(WARM_WHITE), power);
    }
    if (lightRef.current) {
      lightRef.current.intensity = power * 15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      
      ringRef.current.position.y = 2 + (globalScrollProgress * 5);
    }
  });

  return (
    <group ref={ringRef} position={[0, 2, 0]}>
      <mesh ref={bulbRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color={OFF_COLOR} />
      </mesh>
      <pointLight ref={lightRef} color={WARM_WHITE} distance={50} decay={2} intensity={0} />

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <torusGeometry args={[3.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 10, 8]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
}

function SceneBackground() {
  const bgRef = useRef<THREE.Mesh>(null);
  const powerRef = useRef(0);

  useFrame(() => {
    const targetPower = globalScrollProgress === 0 ? 0 : 1;
    powerRef.current += (targetPower - powerRef.current) * 0.05;
    
    if (bgRef.current) {
      const mat = bgRef.current.material as THREE.MeshBasicMaterial;
      mat.color.copy(new THREE.Color("#000000")).lerp(new THREE.Color("#f8f9fa"), powerRef.current);
    }
  });

  return (
    <mesh ref={bgRef} position={[0, 0, -20]} scale={[100, 100, 1]}>
      <planeGeometry />
      <meshBasicMaterial color="#000000" />
    </mesh>
  );
}

export function GlobalScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-screen overflow-hidden">
      <ScrollManager />
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 50 }}>
        <SceneBackground />
        <ambientLight intensity={0.5} />
        <MainChandelier />
      </Canvas>
    </div>
  );
}
