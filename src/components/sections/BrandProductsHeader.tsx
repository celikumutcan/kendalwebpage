"use client";

import React from "react";
import { useLanguage } from "@/app/i18n/LanguageProvider";

interface BrandProductsHeaderProps {
  brandName: string;
}

export const BrandProductsHeader = ({ brandName }: BrandProductsHeaderProps) => {
  const { t } = useLanguage();
  const isK2 = brandName === "k2";

  const headerTexts = (t as any).brand_pages?.products_page || {
    title: "Tüm Ürünlerimiz",
    k2_desc: "K2 LED SYSTEMS güvencesiyle sunduğumuz tüm aydınlatma ürünlerini aşağıdan inceleyebilirsiniz.",
    vanti_desc: "VANTİ ile yaşam alanlarınıza değer katan tüm ürünlerimiz."
  };

  const title = headerTexts.title;
  const desc = isK2 ? headerTexts.k2_desc : headerTexts.vanti_desc;

  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {title}
      </h1>
      <p className="text-zinc-500 max-w-2xl mx-auto">
        {desc}
      </p>
    </div>
  );
};
