"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import Image from "next/image";

const BRANDS = [
  { name: "K2 LED", logo: "/images/brands/k2-led.png" },
  { name: "K2 Plus", logo: "/images/brands/k2-plus.png" },
  { name: "Vanti", logo: "/images/brands/vanti.png" },
  { name: "Global", logo: "/images/brands/global.png" },
];

export const BrandsStrip = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite horizontal marquee
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 20,
          ease: "linear",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-black py-16 overflow-hidden border-y border-white/5 relative">
      {/* Title indicating these are sub-brands */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h3 className="text-white/60 text-sm md:text-base font-semibold tracking-[0.2em] uppercase">
          Alt Markalarımız
        </h3>
        <div className="w-12 h-px bg-[var(--brand-red)] mx-auto mt-2 opacity-50" />
      </div>

      <div className="flex w-[200%] md:w-[150%] lg:w-[100%] min-w-max mt-6" ref={trackRef}>
        {/* Render twice for infinite loop effect */}
        {[...BRANDS, ...BRANDS].map((brand, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 flex items-center justify-center w-[25vw] sm:w-[20vw] md:w-[15vw] mx-8 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
          >
            {/* Fallback to text if placeholder image fails */}
            <div className="relative w-full h-12 flex items-center justify-center font-bold text-2xl tracking-widest text-white/80">
              {brand.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
