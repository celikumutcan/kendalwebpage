"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { SpotLight, useDepthBuffer } from "@react-three/drei";
import * as THREE from "three";

interface MovingSpotProps {
  vec?: THREE.Vector3;
  color: string;
  position: [number, number, number];
  scrollOffset?: number;
  angle?: number;
  active?: boolean;
  baseIntensity?: number;
  depthBuffer?: THREE.Texture;
}

function MovingSpot({
  vec = new THREE.Vector3(),
  color,
  position,
  scrollOffset = 0,
  angle = 0.3,
  active = true,
  baseIntensity = 40,
}: MovingSpotProps) {
  const light = useRef<THREE.SpotLight>(null);
  const viewport = useThree((state) => state.viewport);
  const intensity = useRef(0);

  useFrame((state) => {
    if (!light.current) return;

    const scrollY = window.scrollY;

    light.current.target.position.lerp(
      vec.set(
        (state.mouse.x * viewport.width) / 2 + Math.sin(state.clock.elapsedTime * 0.5 + scrollOffset),
        (state.mouse.y * viewport.height) / 2 + (scrollY * -0.015),
        0
      ),
      0.02
    );
    light.current.target.updateMatrixWorld();

    const target = active ? baseIntensity : 0;
    intensity.current += (target - intensity.current) * 0.05;
    light.current.intensity = intensity.current;
  });

  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={0.2}
      distance={25}
      angle={angle}
      attenuation={6}
      anglePower={5}
      intensity={0}
      color={color}
      position={position}
    />
  );
}

function Peak({ position, height, radius, rotation = 0 }: { position: [number, number, number]; height: number; radius: number; rotation?: number }) {
  return (
    <mesh position={position} rotation={[0, rotation, 0]} castShadow receiveShadow>
      <coneGeometry args={[radius, height, 4]} />
      <meshStandardMaterial color="#3a3a42" roughness={0.85} metalness={0.1} flatShading />
    </mesh>
  );
}

function Mountain() {
  return (
    <group position={[0, -2.2, -4]}>
      <Peak position={[-2.6, 0.2, -1.2]} height={3.2} radius={2} rotation={0.4} />
      <Peak position={[0, 1.1, 0]} height={5.4} radius={2.6} rotation={0.1} />
      <Peak position={[2.7, -0.1, -1.4]} height={2.8} radius={1.8} rotation={-0.5} />
    </group>
  );
}

function Lights({ stage }: { stage: number }) {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  return (
    <>
      <ambientLight intensity={0.18} />

      <MovingSpot depthBuffer={depthBuffer} color="#ffffff" position={[4, 6, 2]} scrollOffset={0} angle={0.25} active={stage >= 1} />
      <MovingSpot depthBuffer={depthBuffer} color="#ff5500" position={[-4, 6, 2]} scrollOffset={Math.PI} angle={0.3} active={stage >= 2} />
      <MovingSpot depthBuffer={depthBuffer} color="#ff9900" position={[0, 8, -2]} scrollOffset={Math.PI / 2} angle={0.4} active={stage >= 3} />

      <Mountain />

      <mesh receiveShadow position={[0, -2, -5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100, 1, 1]} />
        <meshStandardMaterial color="#050506" roughness={0.9} />
      </mesh>
    </>
  );
}

export function K2Scene({ onReady }: { onReady?: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 450),
      setTimeout(() => setStage(2), 1000),
      setTimeout(() => setStage(3), 1550),
      setTimeout(() => onReady?.(), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onReady]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-screen bg-[#020203]">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 45 }}>
        <fog attach="fog" args={["#020203", 5, 25]} />
        <Lights stage={stage} />
      </Canvas>
    </div>
  );
}
