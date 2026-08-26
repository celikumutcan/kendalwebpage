"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { newsDataTR } from "@/data/news-tr";
import { newsDataEN } from "@/data/news-en";
import { parseNewsDate } from "@/lib/newsDate";

export const NewsPreview = () => {
  const { language, t } = useLanguage();

  const newsArray = language === "en" ? newsDataEN : newsDataTR;

  const latestNews = [...newsArray].sort((a, b) => parseNewsDate(b.date) - parseNewsDate(a.date)).slice(0, 3);

  const title = (t as any).news?.preview_title || (language === "en" ? "Latest News" : "Son Haberler");
  const viewAllText = (t as any).news?.view_all || (language === "en" ? "View All News" : "Tüm Haberleri Gör");

  if (latestNews.length === 0) return null;

  return (
    <section className="w-full bg-transparent py-16 lg:py-24 relative overflow-hidden border-t border-[var(--global-text)]/5">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 dark:opacity-50">
        <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-emerald-600 to-green-900 blur-[120px] rounded-full bottom-0 left-0 -translate-x-1/4 translate-y-1/4 mix-blend-screen pointer-events-none" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--global-text)] tracking-tight">
              {title}
            </h2>
            <div className="w-12 h-1 bg-[var(--brand-red)] rounded-full mt-4"></div>
          </div>
          
          <Link 
            href="/haberler" 
            className="group flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors mt-6 md:mt-0 uppercase tracking-wider"
          >
            {viewAllText}
            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[var(--brand-red)] group-hover:bg-[var(--brand-red)] group-hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {latestNews.map((item) => (
            <Link key={item.id} href={`/haberler?id=${item.id}`} className="block group h-full">
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col hover:border-[var(--brand-red)]/50 hover:bg-white/10 transition-all duration-500 transform group-hover:-translate-y-1">
                <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-black/50">
                  {item.images && item.images.length > 0 ? (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      title={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/20 font-medium tracking-widest text-sm uppercase">Kendal Elektrik</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>
                
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[var(--brand-red)] text-xs font-semibold mb-4 tracking-wider uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    {item.date}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-white leading-snug mb-4 group-hover:text-[var(--brand-red)] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <div className="mt-auto">
                    <p className="text-xs md:text-sm text-white/50 line-clamp-2 leading-relaxed">
                      {item.content && item.content.length > 0 ? item.content[0] : ""}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
