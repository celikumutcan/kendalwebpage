"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLightTemperature } from "@/lib/LightTemperatureProvider";

// Custom shader material for the pulsing light core and aperture effect
const coreShader = {
  uniforms: {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uColor: { value: new THREE.Color("#d8e4ff") },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uScroll;
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
      // Center coordinates
      vec2 uv = vUv - 0.5;
      float dist = length(uv);

      // Pulse effect based on time
      float pulse = sin(uTime * 2.0) * 0.05 + 0.95;
      
      // The radius of the light core expands based on scroll (aperture effect)
      // Base radius is small, grows huge on scroll
      float baseRadius = 0.02 * pulse;
      float radius = mix(baseRadius, 1.5, uScroll);
      
      // Glow calculation
      float glow = exp(-dist * (mix(40.0, 2.0, uScroll))) * 1.5;
      
      // Sharp core
      float core = smoothstep(radius, radius - 0.01, dist);

      vec3 finalColor = uColor * (core + glow);
      
      gl_FragColor = vec4(finalColor, min(core + glow, 1.0));
    }
  `,
};

// The inner component that has access to R3F hooks
const LightCoreScene = ({ scrollProgress }: { scrollProgress: number }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { getProgress } = useLightTemperature();
  const colorCool = useMemo(() => new THREE.Color("#d8e4ff"), []);
  const colorWarm = useMemo(() => new THREE.Color("#ffb347"), []);
  const targetColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate scroll progress for the shader
      materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScroll.value,
        scrollProgress,
        0.1
      );
      
      // Interpolate color based on global temperature progress
      targetColor.lerpColors(colorCool, colorWarm, getProgress());
      materialRef.current.uniforms.uColor.value.lerp(targetColor, 0.1);
    }
  });

  const uniforms = useMemo(() => THREE.UniformsUtils.clone(coreShader.uniforms), []);

  return (
    <mesh>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={coreShader.vertexShader}
        fragmentShader={coreShader.fragmentShader}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};

// The main LightCore component, wrapping the canvas
export const LightCore = ({ scrollProgress = 0 }: { scrollProgress?: number }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <LightCoreScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
