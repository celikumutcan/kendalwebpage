"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { getAssetPath } from "@/utils/basePath";
import { ImageSlider } from "@/components/ui/ImageSlider";

export default function UretimPage() {
  const { language, t } = useLanguage();
  
  const pageData = (t as any).production_page || {
    title: "Üretim",
    content: "Kendal Elektrik, 2017 yılında faaliyete geçen 22.000 m² kapalı alana sahip modern üretim tesisinde..."
  };

  const images = Array.from({ length: 10 }, (_, i) => `/images/uretim/uretim-${i + 1}.webp`);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 overflow-hidden">
      {/* Vibrant Spotlight Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -left-[10%] top-0 w-[600px] h-[600px] bg-red-600/30 blur-[120px] rounded-full" />
        <div className="absolute -right-[10%] bottom-0 w-[600px] h-[600px] bg-orange-500/30 blur-[120px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Article Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--global-text)] opacity-90 tracking-tight">
            {pageData.title}
          </h1>
        </header>

        {/* Image Gallery Slider */}
        <ImageSlider 
          images={images} 
          altPrefix="Kendal Elektrik Üretim Tesisi Görsel"
          titlePrefix="Kendal Elektrik Üretim Aşaması"
        />

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed mt-12 text-justify">
          {Array.isArray(pageData.content) ? (
            pageData.content.map((paragraph: string, idx: number) => (
              <p key={idx} className={idx === 0 ? "text-xl text-white font-medium mb-8" : "mb-6"}>
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-xl text-white font-medium mb-8">
              {pageData.content}
            </p>
          )}
        </article>

      </div>
    </div>
  );
}
