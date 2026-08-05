"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsDataTR, newsDataEN } from "@/data/news";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { useLanguage } from "@/app/i18n/LanguageProvider";

export function NewsDetailClient({ id }: { id: string }) {
  const { language, t } = useLanguage();
  
  const newsData = language === 'en' ? newsDataEN : newsDataTR;
  const news = newsData.find((n) => n.id === id);

  if (!news) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/haberler" className="inline-flex items-center text-gray-400 hover:text-[var(--brand-red)] transition-colors text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {language === 'en' ? "Back to All News" : "Tüm Haberlere Dön"}
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 text-center">
          <div className="inline-block px-3 py-1 rounded-full border border-[var(--brand-red)]/30 bg-[var(--brand-red)]/10 text-xs font-semibold tracking-wider text-[var(--brand-red)] mb-6 uppercase">
            {(t as any).nav?.news || (language === 'en' ? "Corporate News" : "Kurumsal Haberler")}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {news.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span>{news.date}</span>
          </div>
        </header>

        {/* Dynamic Image Slider Component (Client Side) */}
        <ImageSlider images={news.images} />

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed mt-12 text-justify">
          {news.content.map((paragraph, idx) => {
            if (paragraph.startsWith("[IMAGE]")) {
              const src = paragraph.replace("[IMAGE]", "").trim();
              return (
                <div key={idx} className="my-8 flex justify-center">
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg max-w-sm w-full">
                    <img src={src} alt="News Illustration" className="w-full h-auto object-contain bg-white/5" />
                  </div>
                </div>
              );
            }
            return (
              <p key={idx} className={idx === 0 ? "text-xl text-white font-medium mb-8" : "mb-6"}>
                {paragraph}
              </p>
            );
          })}
        </article>

      </div>
    </div>
  );
}
