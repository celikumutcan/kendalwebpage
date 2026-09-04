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

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        // Hero is h-[130vh] with a sticky h-screen inner — it only stays
        // pinned (visually static on screen) for the "extra" 30vh, then
        // unsticks and scrolls away like normal content. `end: 'bottom top'`
        // spans the whole 130vh instead, so progress was still at ~0.2-0.3
        // by the time the pin ended — the glow/text animations, keyed off
        // that progress, were still mid-reveal as Hero scrolled out and
        // AboutUs took over, instead of ever finishing while actually
        // visible. Matching `end` to the real pin distance makes progress
        // 0→1 track what the user can actually see happen.
        end: () =>
          `+=${(containerRef.current?.offsetHeight ?? 0) - window.innerHeight}`,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // "Aperture" grow: tiny pulsing core at the top of Hero, opens up
          // into a wide glow by the time the user scrolls past it. Rounded
          // to reduce redundant style writes, same technique as
          // LightTemperatureProvider's CSS var updates.
          const progress = Math.round(self.progress * 200) / 200;
          if (progress === lastAppliedProgress.current) return;
          lastAppliedProgress.current = progress;

          // The glow should finish opening well before Hero hands off to the
          // next section — reaching full size right at the boundary reads as
          // an unfinished, cut-off transition. Remapping so it completes by
          // 70% through the (now correctly-scoped) pin duration leaves a
          // stretch of "fully lit" before AboutUs takes over.
          const scaleProgress = Math.min(1, progress / 0.7);
          const scale = 0.03 + scaleProgress * 1.57;
          glowRef.current?.style.setProperty('--lc-scale', scale.toFixed(3));

          // Text reveal is driven off the same progress instead of its own
          // separate scrollTrigger, so it can't outrun the glow — it only
          // starts appearing once the light has visibly grown ("the light
          // illuminates the text"), not before.
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
          <h1 className="text-6xl sm:text-7xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-tight [filter:drop-shadow(0_0_10px_rgba(0,0,0,0.55))_drop-shadow(0_4px_20px_rgba(0,0,0,0.7))] [@media(max-height:820px)]:text-8xl [@media(max-height:820px)]:sm:text-9xl">
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
