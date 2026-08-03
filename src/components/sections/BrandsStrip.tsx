"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import Image from "next/image";

const BRANDS = [
  { name: "K2 LED", logo: "/images/brands/k2-led.jpg" },
  { name: "K2 Plus", logo: "/images/brands/k2-plus.jpg" },
  { name: "Vanti", logo: "/images/brands/vanti.jpg" },
  { name: "Global", logo: "/images/brands/global.png" },
];

export const BrandsStrip = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // True infinite horizontal marquee
      // By using w-max and duplicating the set 4 times,
      // moving exactly -50% shifts by exactly 2 full sets.
      // Since sets 1-2 are identical to 3-4, the loop is perfectly seamless.
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
    <section ref={containerRef} className="w-full bg-white py-24 overflow-hidden border-y border-gray-200 relative">
      {/* Title indicating these are sub-brands */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h3 className="text-gray-400 text-sm md:text-base font-semibold tracking-[0.2em] uppercase">
          Alt Markalarımız
        </h3>
        <div className="w-12 h-px bg-[var(--brand-red)] mx-auto mt-2 opacity-50" />
      </div>

      {/* w-max is CRITICAL for the seamless GSAP loop to calculate exact pixel width */}
      <div className="flex w-max mt-6" ref={trackRef}>
        {/* Render 4 times so -50% shift perfectly aligns with the start */}
        {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 flex items-center justify-center mx-8 opacity-80 hover:opacity-100 transition-all duration-300"
          >
            <div className="relative w-40 h-16 md:w-48 md:h-20 bg-gray-50 rounded-xl p-3 flex items-center justify-center border border-gray-200 hover:border-gray-300 transition-colors shadow-sm hover:shadow-md">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                sizes="(max-width: 768px) 160px, 192px"
                className="object-contain p-2"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};



