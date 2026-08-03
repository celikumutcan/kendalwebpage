"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import Image from "next/image";

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;

    // Smooth, somewhat realistic progress increment
    const interval = setInterval(() => {
      currentProgress += Math.random() * 12;

      // If the document is not fully loaded, hold the progress around 90%
      if (document.readyState !== 'complete' && currentProgress > 90) {
        currentProgress = 90 + (Math.random() * 5); // fluctuate slightly
      }

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }

      setProgress(Math.min(100, Math.round(currentProgress)));
    }, 150);

    // Force completion when window finishes loading all assets (images, fonts)
    const handleLoad = () => {
      setProgress(100);
    };

    if (document.readyState === 'complete') {
      // If already loaded on mount, quickly finish
      setTimeout(() => setProgress(100), 100);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (progress === 100) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete,
        });

        // Elegant fade out sequence without heavy blur for performance
        tl.to(textRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.5,
          ease: "power2.inOut",
        })
          .to(progressRef.current, {
            scaleX: 0,
            opacity: 0,
            duration: 0.8,
            ease: "power3.inOut",
          }, "-=0.4")
          .to(containerRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          }, "-=0.2");
      }, containerRef);
      return () => ctx.revert();
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
    >
      <div className="w-64 max-w-[80vw] flex flex-col items-center gap-12">

        {/* Brand Logo & Percentage */}
        <div ref={textRef} className="flex flex-col items-center gap-8 text-center">
          <div className="relative w-24 h-24 md:w-32 md:h-32 opacity-80 animate-pulse">
            <Image
              src="/kendal-icon.png"
              alt="Kendal Elektrik"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-white/90 tracking-[0.3em] md:tracking-[0.4em] uppercase font-light text-lg md:text-2xl flex items-center justify-center">
              KENDAL ELEKTRİK
            </div>
            <div className="text-white/50 font-mono text-base md:text-xl tracking-widest mt-2 font-medium">
              {progress.toString().padStart(3, "0")}%
            </div>
          </div>
        </div>

        {/* Minimalist Progress Line */}
        <div className="w-full h-[2px] bg-white/5 relative overflow-hidden rounded-full">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-[var(--brand-red)] transition-all duration-300 shadow-[0_0_15px_rgba(227,0,15,0.6)] rounded-full origin-left"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </div>
  );
};
