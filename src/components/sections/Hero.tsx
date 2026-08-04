"use client";

import React, { useRef, useState, useEffect } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import dynamic from "next/dynamic";

const LightCore = dynamic(
  () => import("@/components/engine/LightCore").then((mod) => mod.LightCore),
  { ssr: false }
);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Throttled scroll progress tracking
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = Math.round(self.progress * 100) / 100;
          setScrollProgress(progress);
        },
      });

      // Reduced scrub sensitivity for better performance
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top -5%",
            end: "top -30%",
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] w-full bg-transparent"
    >
      <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none opacity-30 overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(227,0,15,0.3)_0%,transparent_60%)]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[70%] rounded-full bg-[radial-gradient(circle_at_center,rgba(179,0,12,0.2)_0%,transparent_60%)]" />
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <LightCore scrollProgress={scrollProgress} />

        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.4)_0%,_transparent_70%)] pointer-events-none" />

        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-center text-center opacity-0 pointer-events-none bg-transparent/30 backdrop-blur-md rounded-3xl p-8 md:p-16 border border-white/10"
        >
          <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs tracking-widest backdrop-blur-sm">
            {t.hero.badge}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter">
            {t.hero.title_part1} <br />
            <span className="">
              {t.hero.title_part2}
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-gray-300">
            {t.hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};