"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import Image from "next/image";
import { getAssetPath } from "@/utils/basePath";

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (document.readyState !== 'complete' && currentProgress > 90) {
        currentProgress = 90 + (Math.random() * 5);
      }

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }

      setProgress(Math.min(100, Math.round(currentProgress)));
    }, 150);

    const handleLoad = () => {
      setProgress(100);
    };

    if (document.readyState === 'complete') {
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

        // 1. The laser flash (intense white)
        tl.to(laserRef.current, {
          backgroundColor: "#ffffff",
          boxShadow: "0 0 40px 10px rgba(255,255,255,1), 0 0 80px 20px rgba(255,255,255,0.8)",
          height: "4px",
          duration: 0.15,
          ease: "power4.out"
        })
        // 2. Hide text quickly
        .to(textContainerRef.current, {
          opacity: 0,
          scale: 1.2,
          duration: 0.2,
          ease: "power2.in"
        }, "<")
        // 3. The Curtain Reveal (Split screen)
        .to(topPanelRef.current, {
          y: "-100%",
          duration: 1.2,
          ease: "expo.inOut"
        }, "+=0.1")
        .to(bottomPanelRef.current, {
          y: "100%",
          duration: 1.2,
          ease: "expo.inOut"
        }, "<")
        // 4. Fade laser out as doors open
        .to(laserRef.current, {
          opacity: 0,
          scaleY: 0,
          duration: 0.4,
          ease: "power2.out"
        }, "-=1.0")
        // 5. Hide container
        .to(containerRef.current, {
          autoAlpha: 0,
          duration: 0.1,
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Top Black Panel */}
      <div 
        ref={topPanelRef} 
        className="absolute top-0 left-0 w-full h-[50vh] bg-[#020202] z-10 origin-top shadow-[0_10px_30px_rgba(0,0,0,0.8)] pointer-events-auto" 
      />
      
      {/* Bottom Black Panel */}
      <div 
        ref={bottomPanelRef} 
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#020202] z-10 origin-bottom shadow-[0_-10px_30px_rgba(0,0,0,0.8)] pointer-events-auto" 
      />

      {/* The Laser Line (between panels) */}
      <div 
        ref={laserRef}
        className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 z-20 transition-all duration-300 origin-left"
        style={{
          width: `${progress}%`,
          backgroundColor: "var(--brand-red)",
          boxShadow: `0 0 ${10 + (progress * 0.2)}px ${2 + (progress * 0.05)}px rgba(227, 0, 15, ${0.5 + (progress * 0.005)})`
        }}
      />

      {/* Progress Text & Logo */}
      <div 
        ref={textContainerRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-6 text-white pointer-events-none mix-blend-exclusion w-full px-4"
      >
        {/* Enormous Logo */}
        <div className="relative w-28 h-28 md:w-40 md:h-40 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <Image
            src={getAssetPath("/kendal-icon.png")}
            alt="Kendal Elektrik Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Glowing Progress Number */}
        <div className="text-6xl md:text-8xl font-black tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mt-2">
          {progress.toString().padStart(3, "0")}
        </div>
        
        {/* Brand Name */}
        <div className="text-sm md:text-xl uppercase tracking-[0.4em] md:tracking-[0.8em] opacity-90 font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] whitespace-nowrap">
          Kendal Elektrik
        </div>
      </div>
    </div>
  );
};
