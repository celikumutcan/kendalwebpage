"use client";

import React from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";

interface BrandAboutProps {
  brandName: string; // 'k2' or 'vanti'
}

export const BrandAbout = ({ brandName }: BrandAboutProps) => {
  const { t } = useLanguage();
  const isK2 = brandName === "k2";
  
  // Use 'any' to bypass strict TS checking for dynamically accessed nested keys
  const brandInfo = (t as any).brand_info?.[brandName] || {
    title: isK2 ? "K2 Hakkında" : "Vanti Hakkında",
    description: "Marka bilgisi yükleniyor..."
  };

  const accentColor = isK2 ? "text-[var(--brand-red, #E60000)]" : "text-[#2563EB]";
  const bgAccent = isK2 ? "bg-[var(--brand-red, #E60000)]" : "bg-[#2563EB]";

  return (
    <section className="py-20 px-6 bg-white w-full">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-3xl md:text-5xl font-bold mb-8 ${accentColor}`}>
          {brandInfo.title}
        </h2>
        <div className={`w-24 h-1.5 mx-auto mb-10 rounded-full ${bgAccent}`}></div>
        <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-light">
          {brandInfo.description}
        </p>
      </div>
    </section>
  );
};
