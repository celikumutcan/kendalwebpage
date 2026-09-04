'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { LightCore } from '@/components/engine/LightCore';
import { getAssetPath } from '@/lib/basePath';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const lastAppliedProgress = useRef(-1);

  // `end` matches Hero's real sticky-pin distance (not the full h-[130vh]) so
  // scroll progress reaches 1 exactly as AboutUs takes over; the glow scale
  // remaps to finish opening by 70% of that range instead of reading as
  // cut off, and the text reveal rides the same progress so it never outruns
  // the glow ("the light illuminates the text").
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () =>
          `+=${(containerRef.current?.offsetHeight ?? 0) - window.innerHeight}`,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = Math.round(self.progress * 200) / 200;
          if (progress === lastAppliedProgress.current) return;
          lastAppliedProgress.current = progress;

          const scaleProgress = Math.min(1, progress / 0.7);
          const scale = 0.03 + scaleProgress * 1.57;
          glowRef.current?.style.setProperty('--lc-scale', scale.toFixed(3));

          const textProgress = Math.min(
            1,
            Math.max(0, (progress - 0.1) / 0.25),
          );
          if (contentRef.current) {
            contentRef.current.style.opacity = textProgress.toFixed(3);
            contentRef.current.style.transform = `translateY(${((1 - textProgress) * 30).toFixed(1)}px)`;
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-cv-exclude relative h-[130vh] w-full bg-transparent"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-24 [@media(max-height:820px)]:pt-14">
        <LightCore glowRef={glowRef} />

        <div className="absolute bottom-0 left-0 w-full h-40 md:h-56 z-[1] bg-gradient-to-b from-transparent to-black pointer-events-none" />

        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-center text-center opacity-0 pointer-events-none p-8 md:p-16 [@media(max-height:820px)]:p-6"
        >
          <div className="mb-4 inline-block rounded-full border border-white/25 bg-black/25 px-5 py-2 text-base md:text-lg font-semibold tracking-widest backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.25)] [filter:drop-shadow(0_1px_4px_rgba(0,0,0,0.5))] [@media(max-height:820px)]:mb-3">
            {t.hero.badge}
          </div>
          <h1 className="text-[clamp(2rem,-3.1rem_+_25.5vw,3.75rem)] sm:text-7xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-tight [filter:drop-shadow(0_0_10px_rgba(0,0,0,0.55))_drop-shadow(0_4px_20px_rgba(0,0,0,0.7))] [@media(max-height:820px)_and_(min-width:480px)]:text-8xl [@media(max-height:820px)_and_(min-width:480px)]:sm:text-9xl">
            {t.hero.title_part1} <br />
            <span className="">{t.hero.title_part2}</span>
          </h1>
          <p className="mt-6 max-w-lg text-xl sm:text-2xl md:text-xl text-white font-medium [filter:drop-shadow(0_0_6px_rgba(0,0,0,0.5))_drop-shadow(0_2px_6px_rgba(0,0,0,0.7))] [@media(max-height:820px)]:mt-5 [@media(max-height:820px)]:text-xl">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 relative w-72 h-32 md:w-[32rem] md:h-44 transition-transform hover:scale-105 duration-500 [@media(max-height:820px)]:mt-6 [@media(max-height:820px)]:h-24 [@media(max-height:820px)]:md:h-28">
            <Image
              src={getAssetPath('/images/brands/k2-logo.svg')}
              alt="K2 LED"
              fill
              sizes="(max-width: 768px) 288px, 512px"
              className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
