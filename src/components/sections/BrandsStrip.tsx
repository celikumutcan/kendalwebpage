"use client";

import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/utils/basePath";
import { useLanguage } from "@/app/i18n/LanguageProvider";

const BRANDS = [
  { name: "K2", logo: getAssetPath("/images/brands/k2-logo.svg") },
  { name: "Vanti", logo: getAssetPath("/images/brands/vanti-logo.svg") },
  { name: "Global", logo: getAssetPath("/images/brands/global-logo.svg") },
];

export const BrandsStrip = () => {
  const { t } = useLanguage();

  return (
    <section id="brands" className="w-full bg-white py-16 md:py-24 overflow-hidden border-y border-gray-200 relative flex flex-col items-center">
      <div className="mb-12 text-center pointer-events-none">
        <h3 className="text-gray-900 text-lg md:text-xl font-bold tracking-widest uppercase">
          {(t as any).brands_strip?.title || "Markalarımız"}
        </h3>
        <div className="w-16 h-1 bg-[var(--brand-red)] rounded-full mx-auto mt-4" />
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 px-6">
        {BRANDS.map((brand, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-105"
          >
            <div className="relative w-40 h-20 sm:w-48 sm:h-24 md:w-64 md:h-32 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-200 hover:border-gray-300 transition-colors shadow-sm hover:shadow-md">
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