"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { newsDataTR, newsDataEN } from "@/data/news";
import { useLanguage } from "@/app/i18n/LanguageProvider";

export default function HaberlerListesiPage() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-block px-3 py-1 rounded-full border border-[var(--brand-red)]/30 bg-[var(--brand-red)]/10 text-xs font-semibold tracking-wider text-[var(--brand-red)] mb-4 uppercase">
            {language === 'en' ? "Media" : "Medya"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--global-text)]">
            {(t as any).nav?.news || (language === 'en' ? "Corporate News" : "Kurumsal Haberler")}
          </h1>
          <p className="text-[var(--global-text)] opacity-60 text-lg">
            {language === 'en' 
              ? "The latest developments and news from the Kendal Electric world." 
              : "Kendal Elektrik dünyasından en güncel gelişmeler ve haberler."}
          </p>
        </header>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...(language === 'en' ? newsDataEN : newsDataTR)].sort((a, b) => parseInt(b.id) - parseInt(a.id)).map((news) => (
            <Link href={`/haberler/${news.id}`} key={news.id} className="group block">
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[var(--brand-red)]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,0,0,0.1)] hover:-translate-y-1 h-full flex flex-col">

                {/* Thumbnail */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={news.images[0] || "/images/references/turkiye/ref-01.jpg"} // fallback if no image
                    alt={news.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{news.date}</span>
                  </div>
                  <h2 className="text-xl font-bold leading-tight mb-4 group-hover:text-[var(--brand-red)] transition-colors line-clamp-3">
                    {news.title}
                  </h2>

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-sm font-medium text-[var(--brand-red)] opacity-80 group-hover:opacity-100 transition-opacity">
                    {language === 'en' ? "Read News" : "Haberi Oku"}
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {(language === 'en' ? newsDataEN : newsDataTR).length === 0 && (
          <div className="text-center py-24 text-gray-500">
            {language === 'en' ? "No news added yet." : "Henüz eklenmiş bir haber bulunmuyor."}
          </div>
        )}

      </div>
    </div>
  );
}
