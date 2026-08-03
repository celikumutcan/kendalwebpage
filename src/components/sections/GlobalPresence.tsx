"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import dynamic from "next/dynamic";
import { useState } from "react";

const Globe = dynamic(() => import("@/components/engine/Globe").then((mod) => mod.Globe), {
  ssr: false,
});

export const GlobalPresence = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Track scroll progress for the globe zoom
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // Text reveal animation
      gsap.fromTo(
        ".global-reveal",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 10%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="global"
      ref={containerRef}
      className="w-full bg-transparent h-[200vh] relative"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Background Globe that will zoom out */}
        <div className="absolute inset-0 z-0 opacity-80">
          <Globe scrollProgress={scrollProgress} />
        </div>

        {/* Architectural Spotlight Concept */}
        <div 
          className="absolute top-[-20vh] left-1/2 -translate-x-1/2 w-[150vw] h-[150vh] pointer-events-none opacity-20 mix-blend-overlay z-10" 
          style={{ background: 'conic-gradient(from 150deg at 50% 0%, transparent 0deg, rgba(255,255,255,1) 30deg, transparent 60deg)' }} 
        />

        {/* Dark overlay that fades out slightly to make text readable */}
        <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />

        {/* Text Content */}
        <div ref={textRef} className="relative z-20 max-w-4xl mx-auto flex flex-col items-center text-center px-6">
          <h2 className="global-reveal text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-[var(--global-text)] tracking-tight drop-shadow-2xl">
            {t.global.title}
          </h2>
          <div className="global-reveal w-24 h-1 bg-[var(--brand-red)] mb-8 rounded-full shadow-[0_0_15px_rgba(227,0,15,0.6)]" />
          <div className="global-reveal text-xl md:text-3xl font-medium text-[var(--global-text)] opacity-90 mb-8 leading-relaxed drop-shadow-lg">
            {t.global.subtitle}
          </div>
          <p className="global-reveal text-[var(--global-text)] opacity-80 leading-relaxed text-lg md:text-xl font-light max-w-3xl drop-shadow-md">
            {t.global.text}
          </p>
        </div>
      </div>
    </section>
  );
};


