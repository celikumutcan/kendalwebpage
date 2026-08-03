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
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-3xl text-center z-10 px-6">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
              {t.about.title}
            </h2>
            <p className="text-sm md:text-base text-white/90">
              {t.about.text1}
            </p>
          </div>
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
              <div className="flex-1 text-center md:text-left relative z-10 px-4 md:px-0">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                  <h3 className="text-3xl md:text-5xl lg:text-5xl font-extrabold mb-6 text-white leading-tight drop-shadow-md">
                    {beat.title}
                  </h3>
                  <p className="text-lg md:text-2xl text-white/90 font-light leading-relaxed drop-shadow-sm">
                    {beat.text}
                  </p>
                </div>
              </div>

              {/* Premium Visual Side */}
              <div className="flex-1 w-full flex items-center justify-center relative">
                {/* Glowing Aura behind */}
                <div className="absolute w-64 h-64 bg-[var(--brand-red)]/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
                
                {/* Glassmorphism Orb / Card */}
                <div className="w-full max-w-sm md:max-w-md aspect-square rounded-[2rem] md:rounded-[4rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-2xl transform transition-transform hover:scale-105 duration-700">
                   {/* Inner decorative borders */}
                   <div className="absolute inset-4 rounded-[1.5rem] md:rounded-[3.5rem] border border-[var(--brand-red)]/20" />
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(227,0,15,0.2)_0%,transparent_60%)]" />
                   
                   {/* Massive numbers */}
                   <span className="text-8xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 drop-shadow-[0_0_40px_rgba(227,0,15,0.5)]">
                     0{i + 1}
                   </span>
                   
                   {/* Aesthetic Line */}
                   <div className="w-24 h-[2px] mt-4 bg-gradient-to-r from-transparent via-[var(--brand-red)] to-transparent opacity-70" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
