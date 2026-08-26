"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface BrandProductsHeaderProps {
  brandName: string;
}

export const BrandProductsHeader = ({ brandName }: BrandProductsHeaderProps) => {
  const { t } = useLanguage();
  const isK2 = brandName === "k2";
  const isVanti = brandName === "vanti";

  const headerTexts = (t as any).brand_pages?.products_page || {
    title: "Tüm Ürünlerimiz",
    k2_desc: "K2 LED SYSTEMS güvencesiyle sunduğumuz tüm aydınlatma ürünlerini aşağıdan inceleyebilirsiniz.",
    vanti_desc: "VANTİ ile yaşam alanlarınıza değer katan tüm ürünlerimiz.",
    global_desc: "Global markasıyla Türkiye geneline sunduğumuz kaliteli ürünlerimizi aşağıdan inceleyebilirsiniz."
  };

  const title = headerTexts.title;
  const description = isK2 ? headerTexts.k2_desc : isVanti ? headerTexts.vanti_desc : headerTexts.global_desc;

  const accentClass = isK2 
    ? "bg-gradient-to-r from-orange-400 to-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.4)]" 
    : isVanti 
      ? "bg-gradient-to-r from-blue-400 to-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
      : "bg-gradient-to-r from-yellow-300 to-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.4)]";

  const titleGradient = isK2
    ? "from-zinc-900 to-zinc-600"
    : isVanti
      ? "from-zinc-900 to-zinc-600"
      : "from-zinc-900 to-zinc-600"; // Can be customized per brand later if needed

  return (
    <div className="flex flex-col items-center text-center mb-6 mt-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className={`h-1.5 w-16 md:w-20 rounded-full mb-6 ${accentClass}`} />
      <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent pb-2 pt-4 leading-tight`}>
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-base md:text-lg text-zinc-500/90 font-medium leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
