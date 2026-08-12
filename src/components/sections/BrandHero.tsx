"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/app/i18n/LanguageProvider";

interface BrandHeroProps {
  brandName: string;
}

export const BrandHero = ({ brandName }: BrandHeroProps) => {
  const { t } = useLanguage();
  const isK2 = brandName === "k2";

  const heroTexts = (t as any).brand_pages?.hero || {
    k2_title: "Profesyonel Aydınlatma Çözümleri",
    vanti_title: "Ferah ve Serin Yaşam Alanları",
    global_title: "Global Çözümler",
  };

  const brandInfo = (t as any).brand_info?.[brandName] || {
    description: brandName === "global" 
      ? "Kendal Elektrik güvencesiyle üretilen Global markası, geniş ürün yelpazesiyle yaşam alanlarınız ve endüstriyel projeleriniz için yüksek kaliteli, yenilikçi ve güvenilir aydınlatma çözümleri sunmaktadır." 
      : brandName === "k2" 
      ? "İsmini, dağcıların zirvesine ulaşması en zor ve prestijli dağlardan biri olan K2'den alan markamız, 'Aydınlatmanın Zirvesi' olma vizyonuyla hareket etmektedir. Kendal Elektrik'in profesyonel LED aydınlatma sistemleri, enerji verimliliği odaklı çözümleri ve dekoratif ürünlerini içeren geniş yelpazesini temsil eden K2; endüstriyel ve mimari ihtiyaçlar için en zorlu koşullarda bile üst düzey kalite ve dayanıklılık sunar."
      : "Vanti, yaşam alanlarınıza serinlik ve ferahlık getiren, yenilikçi teknolojiyle üretilmiş yüksek performanslı vantilatör modelleriyle öne çıkmaktadır."
  };

  let title = heroTexts.k2_title;
  let bgGradient = "from-orange-700 via-orange-600 to-amber-500";

  if (brandName === "vanti") {
    title = heroTexts.vanti_title;
    bgGradient = "from-blue-700 via-blue-600 to-cyan-500";
  } else if (brandName === "global") {
    title = heroTexts.global_title;
    bgGradient = "from-[#e6c449] via-[#FFDA51] to-[#FFDA51]";
  }

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      <div className={`absolute inset-0 z-0 bg-gradient-to-br ${bgGradient}`}>
        <div className="absolute inset-0 bg-black/10" />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-10">
        <h1 className={`text-4xl md:text-6xl font-extrabold mb-8 tracking-tight drop-shadow-xl ${brandName === 'global' ? 'text-zinc-900' : 'text-white'}`}>
          {title}
        </h1>
        <p className={`text-lg md:text-xl mb-10 max-w-4xl mx-auto leading-relaxed ${brandName === 'global' ? 'text-zinc-800 font-medium' : 'text-white/90 font-light'}`}>
          {brandInfo.description}
        </p>
      </div>
    </section>
  );
};
