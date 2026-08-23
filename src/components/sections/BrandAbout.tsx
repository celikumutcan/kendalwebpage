"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface BrandAboutProps {
  brandName: string; // 'k2' or 'vanti'
}

export const BrandAbout = ({ brandName }: BrandAboutProps) => {
  const { t } = useLanguage();
  const isK2 = brandName === "k2";
  
  // Use 'any' to bypass strict TS checking for dynamically accessed nested keys
  const brandInfo = (t as any).brand_info?.[brandName] || {
    title: isK2 ? "K2 Hakkında" : brandName === "vanti" ? "Vanti Hakkında" : "Global Hakkında",
    description: brandName === "global" 
      ? "Kendal Elektrik güvencesiyle üretilen Global markası, geniş ürün yelpazesiyle yaşam alanlarınız ve endüstriyel projeleriniz için yüksek kaliteli, yenilikçi ve güvenilir aydınlatma çözümleri sunmaktadır." 
      : "Marka bilgisi yükleniyor..."
  };

  let accentColor = "text-[var(--brand-red, #E60000)]";
  let bgAccent = "bg-[var(--brand-red, #E60000)]";
  
  if (brandName === "vanti") {
    accentColor = "text-[#2563EB]";
    bgAccent = "bg-[#2563EB]";
  } else if (brandName === "global") {
    accentColor = "text-[#FFDA51]"; 
    bgAccent = "bg-[#FFDA51]";
  }

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
