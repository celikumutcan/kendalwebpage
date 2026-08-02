"use client";

import React, { useRef, useMemo, useState } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLightTemperature } from "@/lib/LightTemperatureProvider";

// WebGL Spotlight Shader
const SpotLightShader = {
  uniforms: {
    uTime: { value: 0 },
    uProgress: { value: 0 }, // 0 to 1 representing horizontal scroll progress
    uColor: { value: new THREE.Color("#ffb347") }, // Warm color from context
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
    uniform float uProgress;
    uniform vec3 uColor;
    varying vec2 vUv;

    // Helper to shift hue
    vec3 hueShift(vec3 color, float shift) {
      const vec3 k = vec3(0.57735, 0.57735, 0.57735);
      float cosAngle = cos(shift);
      return vec3(color * cosAngle + cross(k, color) * sin(shift) + k * dot(k, color) * (1.0 - cosAngle));
    }

    void main() {
      vec2 uv = vUv;
      
      // Moving spotlight based on scroll progress (uProgress maps to x position)
      float lightX = mix(0.2, 0.8, uProgress);
      vec2 lightPos = vec2(lightX, 0.5);
      
      float dist = distance(uv, lightPos);
      
      // Elliptical spotlight
      float glow = exp(-dist * 5.0) * 1.5; // Increased intensity
      
      // Add slight noise/flicker
      float flicker = sin(uTime * 10.0) * 0.05 + 0.95;
      
      // Subtle hue variation based on progress (which correlates to category index)
      float hueVariation = uProgress * 0.5; // Shift hue slightly as you scroll
      vec3 finalColor = hueShift(uColor, hueVariation) * glow * flicker;
      
      gl_FragColor = vec4(finalColor, glow);
    }
  `,
};

const SpotlightCanvas = ({ progress }: { progress: number }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { progress: globalProgress } = useLightTemperature();
  const colorCool = useMemo(() => new THREE.Color("#d8e4ff"), []);
  const colorWarm = useMemo(() => new THREE.Color("#ffb347"), []);
  const targetColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smooth interpolation for spotlight position
      materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uProgress.value,
        progress,
        0.1
      );

      // Interpolate color based on global temperature progress
      targetColor.lerpColors(colorCool, colorWarm, globalProgress);
      materialRef.current.uniforms.uColor.value.lerp(targetColor, 0.1);
    }
  });

  const uniforms = useMemo(() => THREE.UniformsUtils.clone(SpotLightShader.uniforms), []);

  return (
    <mesh>
      <planeGeometry args={[20, 10]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={SpotLightShader.vertexShader}
        fragmentShader={SpotLightShader.fragmentShader}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export const ProductGallery = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      if (wrapper) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${wrapper.scrollWidth}`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
          animation: gsap.to(wrapper, {
            x: () => -(wrapper.scrollWidth - window.innerWidth),
            ease: "none",
          }),
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const categories = Object.values(t.products.categories);

  return (
    <section
      id="products"
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] text-white overflow-hidden"
    >
      {/* Background WebGL Spotlight Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
          <SpotlightCanvas progress={progress} />
        </Canvas>
      </div>

      <div className="absolute top-24 left-12 z-20">
        <h2 className="text-4xl md:text-5xl font-bold">{t.products.title}</h2>
        <p className="mt-4 text-gray-400 font-medium">{t.products.brands}</p>
      </div>

      {/* Horizontal scrolling content */}
      <div ref={scrollWrapperRef} className="h-full flex items-center w-max pt-32 px-[20vw] z-10 relative">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="w-[60vw] md:w-[40vw] h-[60vh] mx-[10vw] flex flex-col items-center justify-center shrink-0"
          >
            <div className="w-full h-full border border-white/10 rounded-2xl bg-black/40 backdrop-blur-sm flex items-center justify-center relative overflow-hidden group">
              <span className="text-white/30 text-2xl group-hover:text-white transition-colors duration-500">
                {category} Model Placeholder
              </span>
              {/* Product Name overlay */}
              <div className="absolute bottom-8 left-8 text-2xl font-semibold opacity-80">
                {category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
