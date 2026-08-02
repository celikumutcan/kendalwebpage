"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export const About = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const beatsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Cast since we added beats to JSON but TS type might not know it
  const beats = ((t as any).about?.beats as { title: string; text: string }[]) || [];

  useIsomorphicLayoutEffect(() => {
    if (!beats || beats.length === 0) return;

    const ctx = gsap.context(() => {
      // Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: `+=${beats.length * 100}%`,
          pin: true,
          scrub: 1,
        },
      });

      // Animate each beat
      beats.forEach((_, i) => {
        const beatEl = beatsRef.current[i];
        if (beatEl) {
          // Fade in
          tl.to(beatEl, { opacity: 1, y: 0, duration: 1 }, i * 2);
          // Fade out slightly before next beat unless it's the last one
          if (i < beats.length - 1) {
            tl.to(beatEl, { opacity: 0, y: -50, duration: 1 }, i * 2 + 1.5);
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [beats]);

  return (
    <section id="about" ref={containerRef} className="relative w-full bg-black text-white">
      <div ref={pinWrapperRef} className="h-screen w-full flex items-center justify-center overflow-hidden relative">
        {/* Intro text fading out early */}
        <div className="absolute top-24 left-0 w-full text-center z-10 px-6 opacity-40">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 text-white/90">
            {t.about.title}
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-400">
            {t.about.text1}
          </p>
        </div>

        {beats.map((beat, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={i}
              ref={(el) => { beatsRef.current[i] = el; }}
              className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-12 px-8 max-w-7xl mx-auto opacity-0 translate-y-12 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Text Side */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {beat.title}
                </h3>
                <p className="text-xl md:text-2xl text-gray-300">
                  {beat.text}
                </p>
              </div>

              {/* Visual Side */}
              <div className="flex-1 w-full flex items-center justify-center">
                <div className="w-full max-w-sm aspect-square rounded-full border border-white/10 bg-white/5 flex items-center justify-center relative overflow-hidden">
                   {/* Abstract background for visual */}
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
                   <span className="text-6xl md:text-8xl font-black text-[var(--brand-red)] opacity-80 drop-shadow-[0_0_15px_rgba(227,0,15,0.3)]">0{i + 1}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
