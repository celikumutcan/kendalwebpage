"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export const ProductGallery = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const spotlightContainerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      const spotlight = spotlightContainerRef.current;
      if (wrapper && spotlight) {
        // Horizontal scroll
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${wrapper.scrollWidth}`,
          pin: true,
          scrub: true,
          animation: gsap.to(wrapper, {
            x: () => -(wrapper.scrollWidth - window.innerWidth),
            ease: "none",
          }),
        });

        // Spotlight sweeps across the screen (20% to 80%) as the user scrolls
        gsap.fromTo(spotlight, 
          { "--spotlight-x": "20%" },
          {
            "--spotlight-x": "80%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${wrapper.scrollWidth}`,
              scrub: true,
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const categories = Object.values(t.products.categories);

  return (
    <section
      id="products"
      ref={containerRef}
      className="relative w-full h-screen bg-transparent overflow-hidden"
    >
      {/* Title outside of the spotlight mask so it's always visible */}
      <div className="absolute top-24 md:top-32 left-8 md:left-24 z-20">
        <h2 className="text-4xl md:text-7xl font-bold text-[var(--global-text)] opacity-90 tracking-tight">
          {t.products.title}
        </h2>
        <p className="mt-4 text-[var(--global-text)] opacity-50 font-medium tracking-widest uppercase text-sm md:text-base">
          {t.products.brands}
        </p>
      </div>

      {/* Fixed Container that applies the Spotlight Mask */}
      <div 
        ref={spotlightContainerRef}
        className="absolute inset-0 z-10"
        style={{
          // @ts-ignore - CSS variables are valid in style but TS complains
          "--spotlight-x": "20%",
          maskImage: "radial-gradient(ellipse at var(--spotlight-x) 50%, black 0%, transparent 40vw)",
          WebkitMaskImage: "radial-gradient(ellipse at var(--spotlight-x) 50%, black 0%, transparent 40vw)",
        }}
      >
        {/* Horizontal scrolling content - Hidden until spotlight hits them! */}
        <div ref={scrollWrapperRef} className="h-full flex items-center w-max pt-20 px-[40vw]">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="w-[75vw] md:w-[45vw] h-[60vh] mx-[5vw] flex flex-col items-center justify-center shrink-0"
            >
              <div className="w-full h-full border-2 border-white/5 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center relative overflow-hidden group shadow-2xl">
                
                {/* Product Silhouette/Glow simulating illumination */}
                <div className="w-1/2 h-1/2 rounded-full bg-[var(--accent-current)] opacity-10 group-hover:opacity-30 transition-opacity duration-1000" />
                
                <span className="absolute text-[var(--global-text)] opacity-20 text-3xl md:text-5xl font-light tracking-widest">
                  {category}
                </span>
                
                {/* Product Name overlay */}
                <div className="absolute bottom-12 left-12">
                  <div className="text-4xl font-bold text-[var(--global-text)] opacity-90 drop-shadow-lg">
                    {category}
                  </div>
                  <div className="w-12 h-1 bg-[var(--accent-current)] mt-4 opacity-50" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
