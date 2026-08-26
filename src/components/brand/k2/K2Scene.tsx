"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { SpotLight, useDepthBuffer } from "@react-three/drei";
import * as THREE from "three";

function MovingSpot({ vec = new THREE.Vector3(), color, position, scrollOffset = 0, angle = 0.3 }: any) {
  const light = useRef<any>(null);
  const viewport = useThree((state) => state.viewport);
  
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
      intensity={40}
      color={color}
      position={position}
      opacity={1}
    />
  );
}

function Lights() {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  return (
    <>
      <ambientLight intensity={0.05} />
      
      <MovingSpot depthBuffer={depthBuffer} color="#ffffff" position={[4, 6, 2]} scrollOffset={0} angle={0.25} />
      <MovingSpot depthBuffer={depthBuffer} color="#ff5500" position={[-4, 6, 2]} scrollOffset={Math.PI} angle={0.3} />
      <MovingSpot depthBuffer={depthBuffer} color="#ff9900" position={[0, 8, -2]} scrollOffset={Math.PI / 2} angle={0.4} />

      <mesh receiveShadow position={[0, -2, -5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100, 1, 1]} />
        <meshStandardMaterial color="#050506" roughness={0.9} />
      </mesh>
    </>
  );
}

export function K2Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-screen bg-[#020203]">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 45 }}>
        <fog attach="fog" args={["#020203", 5, 25]} />
        <Lights />
      </Canvas>
    </div>
  );
}
