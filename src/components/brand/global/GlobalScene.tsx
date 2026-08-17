"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Full "off -> full power" sweep completes within this many scroll pixels, so the
// change reads clearly within the first screen or two instead of being smeared
// thin across the whole page height.
const DIMMER_SCROLL_RANGE = 700;

const GOLD = "#FFDA51"; // Global brand color
const DIM_BULB = new THREE.Color(0.05, 0.05, 0.06);
const HOT_BULB = new THREE.Color(1.6, 1.25, 0.4); // pushed past 1 for an overexposed glow with additive blending

const MOTE_COUNT = 70;
const CEILING_Y = 4.3;
const CORD_LENGTH = 1.3;
const BEAM_HEIGHT = 8;

// Custom shader for the light beam: a soft cone of light that fades along its length
// and is driven entirely by a scroll-controlled "power" uniform (0 = off, 1 = full power).
const beamShader = {
  uniforms: {
    uPower: { value: 0 },
    uColor: { value: new THREE.Color(GOLD) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uPower;
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      // vUv.y is 1 right under the fixture and 0 at the far end of the beam
      float fade = pow(vUv.y, 1.8);
      gl_FragColor = vec4(uColor, fade * uPower * 0.5);
    }
  `,
};

function useBeamGeometry() {
  return useMemo(() => {
    // A frustum (not a true cone) so the beam starts narrow at the fixture and widens as it falls
    const geometry = new THREE.CylinderGeometry(0.15, 2.8, BEAM_HEIGHT, 24, 1, true);
    geometry.translate(0, -BEAM_HEIGHT / 2, 0); // narrow end sits at local y = 0, next to the bulb
    return geometry;
  }, []);
}

function useMotePositions() {
  return useMemo(() => {
    const positions = new Float32Array(MOTE_COUNT * 3);
    for (let i = 0; i < MOTE_COUNT; i++) {
      const depth = Math.random(); // 0 near the bulb, 1 at the far end of the beam
      const y = -depth * BEAM_HEIGHT * 0.9 - 0.2;
      const maxRadius = 0.2 + depth * 2.3;
      const r = Math.random() * maxRadius;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    return positions;
  }, []);
}

function LightFixture() {
  const swayRef = useRef<THREE.Group>(null);
  const bulbRef = useRef<THREE.Mesh>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const beamMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const motesRef = useRef<THREE.Points>(null);
  const motesMaterialRef = useRef<THREE.PointsMaterial>(null);

  const maxScrollRef = useRef(1);
  const powerRef = useRef(0);
  const mouseXRef = useRef(0);

  const beamGeometry = useBeamGeometry();
  const motePositions = useMotePositions();
  const beamUniforms = useMemo(() => THREE.UniformsUtils.clone(beamShader.uniforms), []);

  useEffect(() => {
    const updateMaxScroll = () => {
      maxScrollRef.current = Math.max(1, document.body.scrollHeight - window.innerHeight);
    };
    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", updateMaxScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    // Scroll works like a dimmer knob: power eases toward the scroll fraction and
    // reverses just as smoothly scrolling back up.
    const scrollY = window.scrollY || 0;
    const dimmerRange = Math.min(DIMMER_SCROLL_RANGE, maxScrollRef.current);
    const targetPower = Math.min(1, Math.max(0, scrollY / dimmerRange));
    powerRef.current += (targetPower - powerRef.current) * 0.12;
    const power = powerRef.current;

    // The lamp sways gently on its own, plus a nudge that follows the cursor like it's
    // hanging from a cord that got pushed.
    if (swayRef.current) {
      const idle = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
      const mouseNudge = mouseXRef.current * 0.16;
      swayRef.current.rotation.z += ((idle + mouseNudge) - swayRef.current.rotation.z) * 0.05;
    }

    if (bulbRef.current) {
      const mat = bulbRef.current.material as THREE.MeshBasicMaterial;
      mat.color.copy(DIM_BULB).lerp(HOT_BULB, power);
    }

    if (pointLightRef.current) {
      pointLightRef.current.intensity = power * 9;
    }

    if (beamMaterialRef.current) {
      beamMaterialRef.current.uniforms.uPower.value = power;
    }

    if (motesRef.current) {
      motesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    if (motesMaterialRef.current) {
      motesMaterialRef.current.opacity = power * 0.7;
    }
  });

  return (
    <>
      {/* Backdrop wall that catches the point light so the whole scene visibly brightens */}
      <mesh position={[0, CEILING_Y - 4, -6]}>
        <planeGeometry args={[40, 26]} />
        <meshStandardMaterial color="#0b0b0d" roughness={1} />
      </mesh>
      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 6, 4]} intensity={0.25} color="#ffffff" />

      {/* Everything below hangs from the ceiling anchor and swings together as one pendant */}
      <group ref={swayRef} position={[0, CEILING_Y, 0]}>
        <mesh position={[0, -CORD_LENGTH / 2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, CORD_LENGTH, 8]} />
          <meshStandardMaterial color="#3f3f46" roughness={0.6} />
        </mesh>

        <mesh position={[0, -CORD_LENGTH, 0]}>
          <cylinderGeometry args={[0.22, 0.5, 0.65, 28]} />
          <meshStandardMaterial color="#18181b" roughness={0.35} metalness={0.6} />
        </mesh>

        <mesh ref={bulbRef} position={[0, -CORD_LENGTH - 0.42, 0]}>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshBasicMaterial color={DIM_BULB} />
        </mesh>

        <pointLight
          ref={pointLightRef}
          position={[0, -CORD_LENGTH - 0.42, 0]}
          color={GOLD}
          distance={13}
          decay={2}
          intensity={0}
        />

        <mesh position={[0, -CORD_LENGTH - 0.5, 0]} geometry={beamGeometry}>
          <shaderMaterial
            ref={beamMaterialRef}
            uniforms={beamUniforms}
            vertexShader={beamShader.vertexShader}
            fragmentShader={beamShader.fragmentShader}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <points ref={motesRef} position={[0, -CORD_LENGTH - 0.5, 0]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[motePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            ref={motesMaterialRef}
            size={0.045}
            color={GOLD}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </>
  );
}

export function GlobalScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 45 }}>
        <LightFixture />
      </Canvas>
    </div>
  );
}
