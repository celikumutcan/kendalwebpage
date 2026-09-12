'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { getAssetPath } from '@/lib/basePath';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

const MOBILE_QUERY = '(max-width: 767px)';

/** Hero section component with scroll-triggered lighting and text reveal animations. */
export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sideContentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const lastAppliedProgress = useRef(-1);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia(MOBILE_QUERY).matches) {
        if (overlayRef.current) overlayRef.current.style.opacity = '0';
        gsap.fromTo(
          [contentRef.current, sideContentRef.current],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
            stagger: 0.1,
          },
        );
        return;
      }

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

          const lightProgress = Math.min(1, progress / 0.5);
          const holeSize = lightProgress * 150;
          const edgeSize = holeSize + 11;

          if (overlayRef.current) {
            const maskString = `radial-gradient(circle at 27% 41%, transparent ${holeSize}%, black ${edgeSize}%)`;
            overlayRef.current.style.webkitMaskImage = maskString;
            overlayRef.current.style.maskImage = maskString;
          }

          const textProgress = Math.min(1, Math.max(0, (progress - 0.1) / 0.5));
          const yOffset = ((1 - textProgress) * 30).toFixed(1);
          if (contentRef.current) {
            contentRef.current.style.opacity = textProgress.toFixed(3);
            contentRef.current.style.transform = `translateY(${yOffset}px)`;
          }
          if (sideContentRef.current) {
            sideContentRef.current.style.opacity = textProgress.toFixed(3);
            sideContentRef.current.style.transform = `translateY(${yOffset}px)`;
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
      className="hero-cv-exclude relative h-auto md:h-[150vh] w-full bg-black overflow-x-hidden md:overflow-visible"
    >
      <div className="relative md:sticky md:top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start pt-20 md:pt-[12vh] [@media(max-height:820px)]:md:pt-[8vh]">
        <Image
          src={getAssetPath('/images/istanbul-k2-desk.jpg')}
          alt="Kendal Elektrik Desk"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center absolute inset-0 z-0 scale-[1.20] origin-bottom md:scale-100 md:origin-center"
        />

        <div
          ref={overlayRef}
          className="absolute inset-0 z-[3]"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            WebkitMaskImage:
              'radial-gradient(circle at 27% 41%, transparent 0%, black 11%)',
            maskImage:
              'radial-gradient(circle at 27% 41%, transparent 0%, black 11%)',
          }}
        />

        <div className="absolute z-10 w-[90vw] md:w-auto max-w-[400px] left-1/2 md:left-auto top-[28%] md:top-auto -translate-x-1/2 md:translate-x-0 right-auto md:right-12 lg:right-24 bottom-auto md:bottom-[15%]">
          <div
            ref={sideContentRef}
            className="flex flex-col items-center md:items-end text-center md:text-right opacity-0 pointer-events-none"
          >
            <div className="mb-4 inline-block rounded-full border border-white/25 bg-black/60 px-6 py-2 text-sm md:text-base font-semibold tracking-widest backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.9)]">
              {t.hero.badge}
            </div>
            <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium tracking-wide [text-shadow:_0_2px_15px_rgba(0,0,0,1),_0_1px_5px_rgba(0,0,0,1)] bg-black/40 md:bg-black/10 backdrop-blur-md md:backdrop-blur-[4px] p-3 rounded-2xl border border-white/5">
              {t.hero.subtitle}
            </p>
          </div>
        </div>

        <div className="absolute z-10 left-1/2 top-[18%] md:top-[38%] transform -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-auto md:max-w-[900px]">
          <div
            ref={contentRef}
            className="relative flex flex-col items-center text-center opacity-0 pointer-events-none py-6 px-8 md:py-8 md:px-12 w-full"
          >
            <div className="absolute inset-0 bg-black/50 md:bg-black/20 backdrop-blur-xl md:backdrop-blur-[12px] rounded-[3rem] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] -z-10" />

            <h1 className="text-[clamp(1.8rem,-3.1rem_+_25.5vw,3rem)] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight text-white [text-shadow:_0_4px_30px_rgba(0,0,0,0.9),_0_2px_10px_rgba(0,0,0,1)]">
              {t.hero.title_part1} <br />
              <span className="">{t.hero.title_part2}</span>
            </h1>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-40 md:h-56 z-[5] bg-gradient-to-b from-transparent to-black pointer-events-none" />
      </div>
    </section>
  );
};
