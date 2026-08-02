"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("@/components/engine/Globe").then((mod) => mod.Globe), {
  ssr: false,
});

export const GlobalPresence = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const globeWrapperRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance reveal for the globe
      if (globeWrapperRef.current) {
        gsap.fromTo(
          globeWrapperRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="global"
      ref={containerRef}
      className="w-full bg-black text-white py-32 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.global.title}
          </h2>
          <div className="text-xl font-medium text-white/70 mb-8">
            {t.global.subtitle}
          </div>
          <p className="text-gray-400 leading-relaxed text-lg">
            {t.global.text}
          </p>
        </div>
        
        <div className="flex-1 relative w-full aspect-[4/3] bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden">
          {/* 3D Globe Wrapper */}
          <div ref={globeWrapperRef} className="absolute inset-0 w-full h-full opacity-0">
            <Globe />
          </div>
        </div>
      </div>
    </section>
  );
};
