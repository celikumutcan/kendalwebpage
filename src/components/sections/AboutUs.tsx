'use client';

import React, { useRef } from 'react';
import { gsap } from '@/lib/gsapConfig';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

export const AboutUs = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const wireRef = useRef<HTMLDivElement>(null);
  const beatsRef = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, filter: 'blur(10px) brightness(0)', y: 30 },
        {
          opacity: 1,
          filter: 'blur(0px) brightness(1)',
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
        },
      );

      gsap.to(wireRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 60%',
          end: 'bottom 70%',
          scrub: true,
        },
      });

      beatsRef.current.forEach((beat) => {
        if (!beat) return;

        const dot = beat.querySelector('.timeline-dot');
        const content = beat.querySelector('.timeline-content');

        // Was filter: brightness()/grayscale() scrubbed on every scroll frame.
        // filter is paint-heavy (no cheap compositor fast-path like transform/
        // opacity), and with scrub:true it recomputed continuously for as long
        // as this beat was in range, causing stutter independent of scroll
        // speed. opacity gives the same "dims until scrolled into place" read
        // at a fraction of the per-frame cost.
        gsap.fromTo(
          [dot, content],
          { opacity: 0.3 },
          {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: beat,
              start: 'top 70%',
              end: 'top 50%',
              scrub: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const beats = (t as any).about?.beats || [];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full py-24 md:py-32 px-6 bg-black text-white overflow-hidden"
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[700px] h-[500px] bg-[var(--brand-red)] opacity-[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="absolute top-1/2 -translate-y-1/2 -right-[10%] w-[1600px] h-[600px] bg-cyan-400/30 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div ref={textRef} className="flex flex-col justify-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium tracking-widest text-white/80 mb-6 w-max">
            {t.about.title}
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            {(t as any).about?.text1}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
            {(t as any).about?.text2}
          </p>
        </div>

        <div
          ref={timelineRef}
          className="flex flex-col space-y-12 pl-8 md:pl-12 relative mt-8 lg:mt-0"
        >
          <div className="absolute top-2 bottom-2 left-0 w-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={wireRef}
              className="absolute top-0 left-0 w-full h-full bg-[var(--brand-red)] origin-top shadow-[0_0_15px_var(--brand-red)]"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {beats.map((beat: any, idx: number) => (
            <div
              key={idx}
              ref={(el) => {
                beatsRef.current[idx] = el;
              }}
              className="relative group cursor-default"
            >
              <div className="timeline-dot absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 bg-black border-2 border-[var(--brand-red)] rounded-full transition-transform duration-500 group-hover:scale-125 group-hover:bg-[var(--brand-red)] group-hover:shadow-[0_0_15px_var(--brand-red)]" />

              <div className="timeline-content">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-[var(--brand-red)]">
                  {beat.title}
                </h3>
                <p className="text-gray-400 leading-relaxed font-medium">
                  {beat.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
