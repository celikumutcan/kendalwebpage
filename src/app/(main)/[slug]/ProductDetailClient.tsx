"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { Product, getProductImageUrl, products, getSlugByProductId } from "@/data/products";

interface ProductDetailClientProps {
  product: Product;
  brandName?: "k2" | "vanti" | "global";
}

export function ProductDetailClient({ product, brandName }: ProductDetailClientProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const name = product.name[language] || product.name.tr;
  const attributes = product.attributes[language] || product.attributes.tr;
  const imageUrl = getProductImageUrl(product.image);

  const isLight = !!brandName;
  const isK2 = brandName === "k2";
  const isVanti = brandName === "vanti";
  const isGlobal = brandName === "global";

  // Dynamic Theme Colors
  let themeColor = "bg-white/20"; // default for dark
  let themeText = "text-white";
  let themeGlow = "shadow-[0_0_30px_rgba(255,255,255,0.1)]";
  let themePillBg = "bg-white/10";
  let badgeColor = "bg-zinc-800 text-zinc-300 border-zinc-700";
  let ambientGlow = "bg-white/10";

  if (isLight) {
    if (isK2) {
      themeColor = "bg-orange-500";
      themeText = "text-orange-500";
      themeGlow = "shadow-[0_0_40px_rgba(249,115,22,0.2)]";
      themePillBg = "bg-orange-50";
      badgeColor = "bg-orange-100 text-orange-700 border-orange-200";
      ambientGlow = "bg-orange-200";
    } else if (isVanti) {
      themeColor = "bg-blue-600";
      themeText = "text-blue-600";
      themeGlow = "shadow-[0_0_40px_rgba(37,99,235,0.2)]";
      themePillBg = "bg-blue-50";
      badgeColor = "bg-blue-100 text-blue-700 border-blue-200";
      ambientGlow = "bg-blue-200";
    } else if (isGlobal) {
      themeColor = "bg-[#FFDA51]";
      themeText = "text-amber-600";
      themeGlow = "shadow-[0_0_40px_rgba(255,218,81,0.3)]";
      themePillBg = "bg-amber-50";
      badgeColor = "bg-amber-100 text-amber-700 border-amber-200";
      ambientGlow = "bg-[#FFDA51]/30";
    }
  }

  // Calculate variations
  const baseModel = (product.name.tr || "").split(' ')[0];
  const variations = Object.values(products).filter(p => {
    return (p.name.tr || "").split(' ')[0] === baseModel;
  });

  const slugify = (text: string) => text.toLowerCase().replace(/ı/g, 'i').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <div className={`relative min-h-screen pb-24 overflow-hidden ${isLight ? "pt-24 bg-[#f8f9fa] text-zinc-900" : "pt-32 md:pt-40 bg-[#050505] text-white"}`}>
      
      {/* Background ambient light */}
      {isLight ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-start justify-center">
          <div className={`absolute top-[-10%] w-[1000px] h-[1000px] rounded-full blur-[150px] opacity-30 ${ambientGlow}`} />
        </div>
      ) : (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -left-[10%] top-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute -right-[10%] bottom-0 w-[600px] h-[600px] bg-[var(--brand-red)]/10 blur-[120px] rounded-full" />
        </div>
      )}

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        
        {/* Header Section: Back Button + Title */}
        <div className="flex flex-col md:flex-row items-center justify-center relative mb-12 md:mb-16 gap-6 md:gap-0">
          
          {/* Elegant Back Button */}
          <button 
            onClick={() => router.back()}
            className={`group flex items-center gap-3 w-fit transition-colors md:absolute md:left-0 ${isLight ? "text-zinc-500 hover:text-zinc-900" : "text-white/60 hover:text-white"}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isLight ? "bg-white shadow-sm border border-zinc-200 group-hover:bg-zinc-100" : "bg-white/5 border border-white/10 group-hover:bg-white/10"}`}>
              <svg className="w-5 h-5 -translate-x-0.5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="font-semibold tracking-wide text-sm">
              {language === "en" ? "Go Back" : "Geri Dön"}
            </span>
          </button>

          {/* Title */}
          <h1 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight max-w-4xl text-center px-4 ${isLight ? "text-zinc-900" : "text-white"}`}>
            {name}
          </h1>
          
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Premium Image Showcase */}
          <div className="w-full lg:w-1/2 flex justify-center">
            {/* Minimalist Image Container */}
            <div className={`relative w-full max-w-lg aspect-square flex items-center justify-center ${isLight ? "" : "bg-white rounded-[2.5rem] p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]"}`}>
              <Image
                src={imageUrl}
                alt={name}
                fill
                priority
                /* mix-blend-multiply removes the white bg cleanly on light themes */
                className={`object-contain relative z-10 transition-transform duration-700 ${isLight ? "mix-blend-multiply" : "p-8"}`}
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Info & Specifications */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4">

            {/* Variations */}
            {variations.length > 1 && (
              <div className="mb-14">
                <div className="flex items-center mb-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isLight ? themePillBg : "bg-zinc-800"}`}>
                    <svg className={`w-4 h-4 ${isLight ? themeText : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <h3 className={`text-lg font-bold tracking-tight ${isLight ? "text-zinc-800" : "text-white"}`}>
                    {language === "tr" ? "Mevcut Modeller" : "Available Models"}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {variations.map(variant => {
                    const isSelected = variant.id === product.id;
                    const categoryName = variant.category?.tr?.[0];
                    const categorySlug = categoryName ? slugify(categoryName) : (isK2 ? "aydinlatma" : "vantilator");
                    const variantSlug = getSlugByProductId(variant.id) || variant.id;

                    const variantUrl = isLight
                      ? `/brand/${brandName}/urunler/${categorySlug}/${variantSlug}`
                      : `/urunler/${categorySlug}/${variantSlug}`;

                    return (
                      <Link
                        key={variant.id}
                        href={variantUrl}
                        className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border ${isSelected
                          ? (isLight ? `${themeColor} text-white border-transparent ${themeGlow} scale-[1.02]` : "bg-white text-black border-transparent shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-[1.02]")
                          : (isLight ? "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:scale-[1.02]" : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white")
                          }`}
                      >
                        {variant.model}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Technical Specs - Bento Box Grid */}
            <div>
              <div className="flex items-center mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isLight ? themePillBg : "bg-zinc-800"}`}>
                  <svg className={`w-4 h-4 ${isLight ? themeText : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className={`text-lg font-bold tracking-tight ${isLight ? "text-zinc-800" : "text-white"}`}>
                  {language === "tr" ? "Teknik Detaylar" : "Technical Details"}
                </h3>
              </div>

              {attributes && attributes.filter(attr => attr.value && attr.value.trim() !== "" && attr.value !== "N/A").length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {attributes
                    .filter(attr => attr.value && attr.value.trim() !== "" && attr.value !== "N/A")
                    .map((attr, index) => {
                      const decodedValue = String(attr.value).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
                      return (
                        <div key={index} className={`flex flex-col items-center text-center p-5 rounded-3xl border transition-transform duration-300 hover:-translate-y-1 ${isLight ? "bg-white border-zinc-100 shadow-sm hover:shadow-md" : "bg-white/5 border-white/10 hover:bg-white/10"}`}>
                          <span className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
                            {attr.label}
                          </span>
                          <span className={`text-base font-black tracking-tight ${isLight ? "text-zinc-900" : "text-white"}`}>
                            {decodedValue}
                          </span>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className={`p-8 rounded-3xl border border-dashed flex items-center justify-center ${isLight ? "bg-white/50 border-zinc-200 text-zinc-400" : "bg-white/5 border-white/10 text-zinc-500"}`}>
                  <span className="font-medium text-sm">
                    {language === "tr" ? "Bu ürüne ait detaylı teknik veri bulunmamaktadır." : "No detailed technical data available."}
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
