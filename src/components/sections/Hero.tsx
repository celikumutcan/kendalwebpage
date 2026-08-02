"use client";

import React, { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import dynamic from "next/dynamic";

// Dynamically import LightCore so it doesn't block SSR/First Paint
const LightCore = dynamic(
  () => import("@/components/engine/LightCore").then((mod) => mod.LightCore),
  { ssr: false }
);

// Hero section: From Darkness to Light
export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ScrollTrigger for the hero section to control the LightCore aperture
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // Reveal text after scroll starts opening the aperture
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top -10%", // start revealing slightly after scroll
            end: "top -50%",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] w-full bg-black text-white"
    >
      {/* Markanın kırmızı rengini içeren şık ve dinamik arka plan aydınlatmaları */}
      <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(227,0,15,0.4)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[70%] rounded-full bg-[radial-gradient(circle_at_center,rgba(179,0,12,0.3)_0%,transparent_70%)] blur-3xl" />
      </div>
      {/* Fixed container for the WebGL and content so it stays on screen while scrolling the 200vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* R3F WebGL Layer */}
        <LightCore scrollProgress={scrollProgress} />
        
        {/* Overlay Content */}
        {/* Added backdrop blur for readability against the glowing aperture */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.5)_0%,_transparent_70%)] pointer-events-none" />
        
        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-center text-center opacity-0 pointer-events-none bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-16 border border-white/10"
        >
          <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs tracking-widest backdrop-blur-sm text-white">
            {t.hero.badge}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white">
            {t.hero.title_part1} <br />
            <span className="text-white">
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
