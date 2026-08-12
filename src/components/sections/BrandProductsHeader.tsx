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
    vanti_desc: "VANTİ ile yaşam alanlarınıza değer katan tüm ürünlerimiz.",
    global_desc: "Global markasıyla dünyanın dört bir yanına sunduğumuz kaliteli ürünlerimizi aşağıdan inceleyebilirsiniz."
  };

  const title = headerTexts.title;

  return (
    <div className="text-center mb-0">
      <h1 className="text-4xl md:text-5xl font-bold">
        {title}
      </h1>
    </div>
  );
};
