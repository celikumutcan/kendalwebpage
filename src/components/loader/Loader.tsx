"use client";

import React, { useRef, useState } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circuitRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Simulate loading progress
      const tl = gsap.timeline({
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100));
        },
        onComplete: () => {
          // Aperture style exit
          gsap.to(containerRef.current, {
            scale: 1.5,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete,
          });
        },
      });

      // Animate SVG stroke
      if (circuitRef.current) {
        tl.to(circuitRef.current, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power1.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      {/* Subtle vignette pulse */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at center, rgba(216, 228, 255, ${progress * 0.003}) 0%, transparent 60%)`
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* LED Light Bulb SVG */}
        <svg width="120" height="120" viewBox="0 0 100 100" className={`mb-6 transition-all duration-700 ${progress >= 100 ? 'drop-shadow-[0_0_30px_rgba(255,255,255,1)] scale-110' : 'drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]'}`}>
          {/* Bulb Outline (Dim) */}
          <path
            d="M 35 70 C 35 80, 40 85, 45 85 L 55 85 C 60 85, 65 80, 65 70 C 75 60, 80 45, 75 30 C 70 15, 50 10, 50 10 C 50 10, 30 15, 25 30 C 20 45, 25 60, 35 70 Z"
            fill="transparent"
            stroke="#ffffff"
            strokeWidth="2"
            strokeOpacity="0.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Screw Base */}
          <path d="M 40 85 L 60 85 M 42 90 L 58 90 M 45 95 L 55 95" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round" />
          
          {/* Animated Filament (Bright) */}
          <path
            ref={circuitRef}
            d="M 45 85 L 45 60 L 35 45 L 50 30 L 65 45 L 55 60 L 55 85"
            fill="transparent"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="200"
            strokeDashoffset="200"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="text-white/80 font-mono text-lg tracking-widest" style={{ textShadow: `0 0 ${progress * 0.1}px rgba(255,255,255,0.5)` }}>
          {progress.toString().padStart(3, "0")}%
        </div>
      </div>
    </div>
  );
};
