'use client';

import React, { useRef } from 'react';
import { gsap } from '@/lib/gsapConfig';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

export const ProductGallery = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const categories = Object.values(t.products.categories);

  return (
    <section
      id="products"
      ref={containerRef}
      className="w-full py-24 md:py-32 px-6 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-[var(--global-text)] tracking-tight mb-4">
              {t.products.title}
            </h2>
            <p className="text-[var(--global-text)] opacity-60 font-medium tracking-widest uppercase text-sm md:text-base">
              {t.products.brands}
            </p>
          </div>
          <div className="w-16 h-[2px] bg-[var(--accent-current)] hidden md:block opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="group relative h-72 md:h-80 rounded-3xl bg-[var(--global-text)] bg-opacity-[0.03] border border-[var(--global-text)] border-opacity-5 overflow-hidden flex flex-col justify-end p-8 hover:bg-opacity-[0.05] hover:border-opacity-10 transition-all duration-500 cursor-pointer"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[var(--accent-current)] opacity-0 group-hover:opacity-[0.15] blur-[80px] transition-opacity duration-700 pointer-events-none" />

              <div className="absolute top-6 left-8 text-5xl font-black text-[var(--global-text)] opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-20">
                0{idx + 1}
              </div>

              <div className="relative z-10 w-full">
                <h3 className="text-2xl font-bold text-[var(--global-text)] mb-4 group-hover:translate-x-2 transition-transform duration-300">
                  {category}
                </h3>
                <div className="w-0 h-[2px] bg-[var(--accent-current)] group-hover:w-16 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
