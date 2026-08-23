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
    global_desc: "Global markasıyla dünyanın dört bir yanına sunduğumuz kaliteli ürünlerimizi aşağıdan inceleyebilirsiniz."
  };

  const title = headerTexts.title;
  const description = isK2 ? headerTexts.k2_desc : isVanti ? headerTexts.vanti_desc : headerTexts.global_desc;

  const accentClass = isK2 ? "bg-orange-500" : isVanti ? "bg-blue-600" : "bg-[#FFDA51]";

  return (
    <div className="flex flex-col items-center text-center mb-4 mt-8">
      <div className={`h-1.5 w-16 rounded-full mb-6 ${accentClass}`} />
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900">
        {title}
      </h1>
      {description && (
        <p className="mt-5 max-w-2xl text-base md:text-lg text-zinc-500 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
