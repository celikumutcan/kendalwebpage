"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import Image from "next/image";
import { getAssetPath } from "@/utils/basePath";

const BRANDS = [
  { name: "K2 LED", logo: getAssetPath("/images/brands/k2-led.jpg") },
  { name: "K2 Plus", logo: getAssetPath("/images/brands/k2-plus.jpg") },
  { name: "Vanti", logo: getAssetPath("/images/brands/vanti.jpg") },
  { name: "Global", logo: getAssetPath("/images/brands/global.png") },
];

export const BrandsStrip = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 25, // Slower for less CPU
          ease: "linear",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white py-20 overflow-hidden border-y border-gray-200 relative">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h3 className="text-gray-400 text-sm md:text-base font-semibold tracking-[0.2em] uppercase">
          Alt Markalarımız
        </h3>
        <div className="w-12 h-px bg-[var(--brand-red)] mx-auto mt-2 opacity-50" />
      </div>

      <div className="flex w-max mt-4" ref={trackRef}>
        {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 flex items-center justify-center mx-6 opacity-80 hover:opacity-100 transition-opacity duration-300"
          >
            <div className="relative w-48 h-24 md:w-64 md:h-32 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-200 hover:border-gray-300 transition-colors shadow-sm hover:shadow-md">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-contain p-4 md:p-6"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};