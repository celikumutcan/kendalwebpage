"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/app/i18n/LanguageProvider";

interface BrandHeroProps {
  brandName: string;
}

export const BrandHero = ({ brandName }: BrandHeroProps) => {
  const { t, language } = useLanguage();
  const isK2 = brandName === "k2";

  const heroTexts = (t as any).brand_pages?.hero || {
    k2_title: "Profesyonel Aydınlatma Çözümleri",
    k2_desc: "K2 markası ile endüstriyel ve mimari aydınlatmada en yüksek kalite standartlarını sunuyoruz.",
    vanti_title: "Ferah ve Serin Yaşam Alanları",
    vanti_desc: "Vanti ile ev ve ofisleriniz için yenilikçi, modern ve güçlü vantilatör teknolojilerini keşfedin.",
    view_products: "Ürünleri İncele"
  };

  const title = isK2 ? heroTexts.k2_title : heroTexts.vanti_title;
  const desc = isK2 ? heroTexts.k2_desc : heroTexts.vanti_desc;

  // We need to keep the link in sync with the environment
  const productsHref = process.env.NODE_ENV === "production" ? `/brand/${brandName}/urunler` : "/urunler";

  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
      <div className={`absolute inset-0 z-0 bg-gradient-to-br ${isK2 ? "from-orange-700 via-orange-600 to-amber-500" : "from-blue-700 via-blue-600 to-cyan-500"}`}>
        <div className="absolute inset-0 bg-black/10" />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-xl text-white">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
          {desc}
        </p>
        <Link 
          href={productsHref}
          className={`inline-flex items-center px-8 py-4 rounded-full bg-white font-medium transition-transform hover:scale-105 shadow-2xl ${isK2 ? "text-orange-600" : "text-blue-600"}`}
        >
          {heroTexts.view_products}
        </Link>
      </div>
    </section>
  );
};
