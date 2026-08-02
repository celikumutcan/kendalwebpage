"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLightTemperature } from "@/lib/LightTemperatureProvider";

// Helper to convert lat/long to 3D sphere coordinates
const latLongToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

// Locations for pins: Turkey (HQ), Europe, Asia, Africa approx
const LOCATIONS = [
  { lat: 39.9, lon: 32.8 },   // Turkey (Ankara roughly)
  { lat: 51.5, lon: 10.0 },   // Europe
  { lat: 34.0, lon: 100.0 },  // Asia
  { lat: 0.0, lon: 20.0 },    // Africa
];

const GlobeScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { progress } = useLightTemperature();
  
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);
  const [bumpTexture, setBumpTexture] = useState<THREE.Texture | null>(null);
  const [specularTexture, setSpecularTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    
    loader.load("/textures/earth-dark.jpg", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setEarthTexture(tex);
    });
    
    loader.load("/textures/earth-topology.png", (tex) => {
      setBumpTexture(tex);
    });

    loader.load("/textures/earth-water.png", (tex) => {
      setSpecularTexture(tex);
    });
  }, []);

  // Interpolate cool to warm color for rim glow and pins based on scroll progress
  const targetColor = useMemo(() => {
    return new THREE.Color().lerpColors(
      new THREE.Color("#d8e4ff"), // cool
      new THREE.Color("#ffb347"), // warm
      progress
    );
  }, [progress]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Textured Earth Base */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        {earthTexture ? (
          <meshStandardMaterial 
            map={earthTexture} 
            bumpMap={bumpTexture}
            bumpScale={0.015}
            roughnessMap={specularTexture}
            roughness={0.7}
            metalness={0.1}
          />
        ) : (
          <meshStandardMaterial color="#0a1628" />
        )}
      </mesh>

      {/* Atmospheric Rim Glow */}
      <mesh>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshBasicMaterial color={targetColor} transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </mesh>

      {/* Pins */}
      {LOCATIONS.map((loc, idx) => {
        const pos = latLongToVector3(loc.lat, loc.lon, 2.05); // slightly above surface
        return (
          <group key={idx} position={pos}>
            {/* Core pin */}
            <mesh>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color={targetColor} />
            </mesh>
            {/* Glow halo */}
            <mesh>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshBasicMaterial color={targetColor} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export const Globe = () => {
  return (
    <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        {/* Cinematic lighting setup */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#d8e4ff" />
        
        <GlobeScene />
      </Canvas>
    </div>
  );
};
