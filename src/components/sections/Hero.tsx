'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { getAssetPath } from '@/lib/basePath';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

const LightCoreFallback = () => (
  <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_50%)] animate-pulse pointer-events-none" />
);

const LightCore = dynamic(
  () => import('@/components/engine/LightCore').then((mod) => mod.LightCore),
  {
    ssr: false,
    loading: LightCoreFallback,
  },
);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const scrollProgressRef = useRef<number>(0);
  const [mountEngine, setMountEngine] = useState(false);

  useEffect(() => {
    // İlk boyama tamamlanana kadar ağır Three.js paketinin
    // indirilip çalıştırılmasını erteler; hydration ile yarışmaz.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setMountEngine(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scrollProgressRef.current = Math.round(self.progress * 100) / 100;
        },
      });

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top -5%',
            end: 'top -30%',
            scrub: 0.5,
          },
        },
      );
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
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-24">
        {mountEngine ? (
          <LightCore scrollProgressRef={scrollProgressRef} />
        ) : (
          <LightCoreFallback />
        )}

        <div className="absolute bottom-0 left-0 w-full h-40 md:h-56 z-[1] bg-gradient-to-b from-transparent to-black pointer-events-none" />

        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-center text-center opacity-0 pointer-events-none p-8 md:p-16"
        >
          <div className="mb-4 inline-block rounded-full border border-white/25 bg-black/25 px-5 py-2 text-base md:text-lg font-semibold tracking-widest backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.25)] [filter:drop-shadow(0_1px_4px_rgba(0,0,0,0.5))]">
            {t.hero.badge}
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-tight [filter:drop-shadow(0_0_10px_rgba(0,0,0,0.55))_drop-shadow(0_4px_20px_rgba(0,0,0,0.7))]">
            {t.hero.title_part1} <br />
            <span className="">{t.hero.title_part2}</span>
          </h1>
          <p className="mt-6 max-w-lg text-xl sm:text-2xl md:text-3xl text-white font-medium [filter:drop-shadow(0_0_6px_rgba(0,0,0,0.5))_drop-shadow(0_2px_6px_rgba(0,0,0,0.7))]">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 relative w-72 h-32 md:w-[32rem] md:h-44 transition-transform hover:scale-105 duration-500">
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
