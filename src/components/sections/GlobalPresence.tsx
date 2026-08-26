"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
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
  const scrollProgressRef = useRef(0);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scrollProgressRef.current = Math.round(self.progress * 100) / 100;
        },
      });

      gsap.fromTo(
        ".global-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 15%",
            end: "center center",
            scrub: 0.8,
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
      className="w-full bg-transparent h-[150vh] relative"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-70">
          <Globe scrollProgressRef={scrollProgressRef} />
        </div>

        <div
          className="absolute top-[-20vh] left-1/2 -translate-x-1/2 w-[150vw] h-[150vh] pointer-events-none opacity-15 mix-blend-overlay z-10"
          style={{ background: 'conic-gradient(from 150deg at 50% 0%, transparent 0deg, rgba(255,255,255,1) 30deg, transparent 60deg)' }}
        />

        <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none" />

        <div ref={textRef} className="relative z-20 max-w-4xl mx-auto flex flex-col items-center text-center px-6">
          <h2 className="global-reveal text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-[var(--global-text)] tracking-tight drop-shadow-2xl">
            {t.global.title}
          </h2>
          <div className="global-reveal w-24 h-1 bg-[var(--brand-red)] mb-8 rounded-full shadow-[0_0_15px_rgba(227,0,15,0.5)]" />
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