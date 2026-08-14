"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { Product, getProductImageUrl, products, getSlugByProductId } from "@/data/products";

interface ProductDetailClientProps {
  product: Product;
  brandName?: "k2" | "vanti" | "global";
}

const VANTI_VIDEOS: Record<string, string> = {
  "KCF271": "4OztFcGyGwQ",
  "KCF272L": "MHKlz9hlICs",
  "KCF272ST": "6LXjmS5rIIA",
  "KCF272": "rfhARix9Sxk",
  "KCF276K": "fIa_DqQUTw4",
  "KCF276": "q8hgLksbSyM",
  "KCF273": "PdILKXirxbo",
  "KCF278": "L7lYf_aqNgs",
  "KCF279": "Qq1gsLUXjv0",
  "KCF473": "16yMkTg7xhk",
  "KCF281": "1Go55UTa7cw",
  "KCF283": "6-V_VxyO1rA",
  "KCF284": "seizCrmSe94",
  "KCF285": "Rkp7jKK--6o",
  "KCF288": "qEEGqMZmeeY",
  "KCF290": "q9yFUANQ_eU",
  "KCF295": "J4z5qYJlPdM",
  "KCF303": "pS72bT__0hY",
  "KCF321": "yF6iRNek5b4"
};

export function ProductDetailClient({ product, brandName }: ProductDetailClientProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const name = product.name[language] || product.name.tr;
  const attributes = product.attributes[language] || product.attributes.tr;
  const imageUrl = getProductImageUrl(product.image);

  const isK2 = brandName === "k2";
  const isVanti = brandName === "vanti";
  const isGlobal = brandName === "global";
  const isLight = isK2 || isVanti;

  const videoMatchKey = Object.keys(VANTI_VIDEOS).find(key => product.model.includes(key) || name.includes(key));
  const videoId = videoMatchKey ? VANTI_VIDEOS[videoMatchKey] : null;

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
  const getBaseName = (name: string) => {
    const words = (name || "").trim().split(' ');
    const firstWordUpper = words[0]?.toUpperCase();
    if (firstWordUpper === "K2" || firstWordUpper === "GLOBAL" || firstWordUpper === "VANTİ" || firstWordUpper === "VANTI") {
      return words.filter((w: string) => !w.match(/^\d+W$/i) && !w.match(/^(E14|E27|GU10|G9|R7S)$/i) && !['SARI', 'BEYAZ', 'ARARENK', 'GÜNIŞIĞI', 'MAVİ', 'YEŞİL', 'KIRMIZI', 'AMBER', 'GÜN IŞIĞI'].includes(w.toUpperCase())).join(' ');
    }
    return words[0];
  };

  const baseModel = getBaseName(product.name.tr);
  const variations = Object.values(products).filter(p => {
    return getBaseName(p.name.tr) === baseModel;
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
          <h1 itemProp="name" className={`text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight max-w-4xl text-center px-4 ${isLight ? "text-zinc-900" : "text-white"}`}>
            {name}
          </h1>

        </div>

        <article itemScope itemType="https://schema.org/Product" className="flex flex-col items-center w-full max-w-5xl mx-auto gap-10 lg:gap-14">

          {/* Premium Image Showcase */}
          <div className="w-full flex justify-center">
            <div className={`relative w-full max-w-[320px] md:max-w-md flex items-center justify-center ${isLight ? "" : "bg-white rounded-[2.5rem] p-4 md:p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]"}`}>
              <img
                itemProp="image"
                src={imageUrl}
                alt={name}
                className={`w-full h-auto object-contain relative z-10 transition-transform duration-700 ${isLight ? "mix-blend-multiply" : ""}`}
              />
            </div>
          </div>

          {/* Product Info & Specifications */}
          {variations.length > 1 && (
            <div className="w-full max-w-3xl flex flex-col items-center">
              {/* Variations */}
              {(() => {
              const variantData = variations.map(variant => {
                const opts = variant.variantOptions || { light: null, casing: null, watt: null, socket: null };
                let colorTemp = opts.light || opts.casing;
                if (!colorTemp) {
                  colorTemp = "Standart";
                }

                if (colorTemp === "Günışığı" || colorTemp === "Gün işığı") colorTemp = "Günışığı (3200K)";
                else if (colorTemp === "Beyaz") colorTemp = "Beyaz (6500K)";
                else if (colorTemp === "Ararenk") colorTemp = "Ararenk (4000K)";

                const detectedCasing = opts.casing || "";
                const watt = opts.watt || "";
                const socket = opts.socket || "";

                let dotColor = 'bg-zinc-200';
                const ctUpper = colorTemp.toUpperCase();
                if (ctUpper.includes("2700K")) dotColor = 'bg-[#FFA957]';
                else if (ctUpper.includes("3000K") || ctUpper.includes("GÜNIŞIĞI") || ctUpper.includes("GUNISIGI") || ctUpper.includes("GÜN IŞIĞI")) dotColor = 'bg-[#FFB46B]';
                else if (ctUpper.includes("4000K") || ctUpper.includes("ARARENK")) dotColor = 'bg-[#FFEDC2]';
                else if (ctUpper.includes("6500K")) dotColor = 'bg-[#E4F1FE]';
                else if (ctUpper.includes("BEYAZ")) dotColor = 'bg-white border-zinc-200';
                else if (ctUpper.includes("KROM")) dotColor = 'bg-slate-300';
                else if (ctUpper.includes("SATEN") || ctUpper.includes("SILVER") || ctUpper.includes("GÜMÜŞ") || ctUpper.includes("GUMUS")) dotColor = 'bg-stone-300';
                else if (ctUpper.includes("SİYAH") || ctUpper.includes("SIYAH")) dotColor = 'bg-zinc-900';
                else if (ctUpper.includes("GOLD") || ctUpper.includes("ALTIN")) dotColor = 'bg-yellow-400';
                else if (ctUpper.includes("BAKIR")) dotColor = 'bg-orange-600';
                else if (ctUpper.includes("ESKİTME") || ctUpper.includes("ESKITME")) dotColor = 'bg-yellow-700';
                else if (ctUpper.includes("MAVİ") || ctUpper.includes("MAVI")) dotColor = 'bg-blue-500';
                else if (ctUpper.includes("YEŞİL") || ctUpper.includes("YESIL") || ctUpper.includes("YEŞIL")) dotColor = 'bg-green-500';
                else if (ctUpper.includes("KIRMIZI")) dotColor = 'bg-red-500';
                else if (ctUpper.includes("PEMBE")) dotColor = 'bg-pink-500';
                else if (ctUpper.includes("TURUNCU")) dotColor = 'bg-orange-500';

                return { variant, colorTemp, dotColor, watt, socket, detectedCasing };
              });

              const currentVariantData = variantData.find(v => v.variant.id === product.id) || variantData[0];

              const uniqueWatts = Array.from(new Set(variantData.map(v => v.watt).filter(w => w)));
              const uniqueSockets = Array.from(new Set(variantData.filter(v => !currentVariantData.watt || v.watt === currentVariantData.watt).map(v => v.socket).filter(s => s)));
              const uniqueColors = Array.from(new Set(variantData.filter(v => (!currentVariantData.watt || v.watt === currentVariantData.watt) && (!currentVariantData.socket || v.socket === currentVariantData.socket)).map(v => v.colorTemp).filter(c => c && c !== "Standart")));

              const getBestVariantMatch = (targetAttr: 'watt' | 'socket' | 'colorTemp', value: string) => {
                const candidates = variantData.filter(v => v[targetAttr] === value);
                if (candidates.length === 0) return null;

                candidates.sort((a, b) => {
                  let aScore = 0;
                  let bScore = 0;
                  if (targetAttr !== 'watt') {
                    if (a.watt === currentVariantData.watt) aScore++;
                    if (b.watt === currentVariantData.watt) bScore++;
                  }
                  if (targetAttr !== 'socket') {
                    if (a.socket === currentVariantData.socket) aScore++;
                    if (b.socket === currentVariantData.socket) bScore++;
                  }
                  if (targetAttr !== 'colorTemp') {
                    if (a.colorTemp === currentVariantData.colorTemp) aScore++;
                    if (b.colorTemp === currentVariantData.colorTemp) bScore++;
                  }
                  return bScore - aScore;
                });
                return candidates[0];
              };

              const renderVariantLink = (match: any, label: string, showColorDot: boolean) => {
                const isSelected = match.variant.id === product.id;
                const categoryName = match.variant.category?.tr?.[0];
                const categorySlug = categoryName ? slugify(categoryName) : (isK2 ? "aydinlatma" : "vantilator");
                const variantSlug = getSlugByProductId(match.variant.id) || match.variant.id;
                const variantUrl = isLight && process.env.NODE_ENV === "production"
                  ? `/brand/${brandName}/urunler/${categorySlug}/${variantSlug}`
                  : `/urunler/${categorySlug}/${variantSlug}`;

                return (
                  <Link
                    key={match.variant.id + "-" + label}
                    href={variantUrl}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border ${isSelected
                      ? (isLight ? `${themeColor} text-white border-transparent ${themeGlow} scale-[1.02]` : "bg-white text-black border-transparent shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-[1.02]")
                      : (isLight ? "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:scale-[1.02]" : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white")
                      }`}
                  >
                    {showColorDot && <span className={`w-3 h-3 rounded-full ${match.dotColor} border border-black/10 shadow-sm flex-shrink-0`} />}
                    <span>{label}</span>
                  </Link>
                );
              };

              return (
                <div className="w-full flex flex-col gap-10 items-center text-center">
                  {/* Renk Seçenekleri */}
                  {uniqueColors.length > 1 && (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center mb-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isLight ? themePillBg : "bg-zinc-800"}`}>
                          <svg className={`w-4 h-4 ${isLight ? themeText : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        </div>
                        <h3 className={`text-lg font-bold tracking-tight ${isLight ? "text-zinc-800" : "text-white"}`}>
                          {language === "tr" ? "Renk Seçenekleri" : "Color Options"}
                        </h3>
                      </div>
                      <div className="flex flex-wrap justify-center gap-3">
                        {uniqueColors.map(color => {
                          const match = getBestVariantMatch('colorTemp', color);
                          if (!match) return null;
                          return renderVariantLink(match, color, true);
                        })}
                      </div>
                    </div>
                  )}

                  {/* Watt Seçenekleri */}
                  {uniqueWatts.length > 1 && (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center mb-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isLight ? themePillBg : "bg-zinc-800"}`}>
                          <svg className={`w-4 h-4 ${isLight ? themeText : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className={`text-lg font-bold tracking-tight ${isLight ? "text-zinc-800" : "text-white"}`}>
                          {language === "tr" ? "Watt Seçenekleri" : "Wattage Options"}
                        </h3>
                      </div>
                      <div className="flex flex-wrap justify-center gap-3">
                        {uniqueWatts.map(watt => {
                          const match = getBestVariantMatch('watt', watt);
                          if (!match) return null;
                          return renderVariantLink(match, watt, false);
                        })}
                      </div>
                    </div>
                  )}

                  {/* Duy Seçenekleri */}
                  {uniqueSockets.length > 1 && (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center mb-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isLight ? themePillBg : "bg-zinc-800"}`}>
                          <svg className={`w-4 h-4 ${isLight ? themeText : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                        </div>
                        <h3 className={`text-lg font-bold tracking-tight ${isLight ? "text-zinc-800" : "text-white"}`}>
                          {language === "tr" ? "Duy Seçenekleri" : "Socket Options"}
                        </h3>
                      </div>
                      <div className="flex flex-wrap justify-center gap-3">
                        {uniqueSockets.map(socket => {
                          const match = getBestVariantMatch('socket', socket);
                          if (!match) return null;
                          return renderVariantLink(match, socket, false);
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
            </div>
          )}

          {/* Split Attributes into Specs and Features */}
          {(() => {
            const allAttrs = attributes || [];
            const rawSpecs = allAttrs.filter(attr => attr.value && attr.value.trim() !== "" && attr.value !== "N/A" && attr.label !== "Renk" && attr.label !== "Color");

            const featureLabels = ["Özellik", "Feature", "Açıklama", "Description"];

            const featureAttrs = rawSpecs.filter(attr => featureLabels.includes(attr.label));
            const specAttrs = rawSpecs.filter(attr => !featureLabels.includes(attr.label));

            // Dynamically split features by ' / ' and flatten
            const featuresList = featureAttrs.flatMap(attr =>
              String(attr.value)
                .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
                .split(' / ')
                .map(s => s.trim())
                .filter(s => s)
            );

            return (
              <div className="flex flex-col gap-8 lg:gap-12 w-full">

                {/* Technical Specs - Bento Box Grid */}
                <div className="w-full">
                  <div className="flex items-center mb-8 justify-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isLight ? themePillBg : "bg-zinc-800"}`}>
                      <svg className={`w-4 h-4 ${isLight ? themeText : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className={`text-xl lg:text-2xl font-bold tracking-tight ${isLight ? "text-zinc-800" : "text-white"}`}>
                      {language === "tr" ? "Teknik Detaylar" : "Technical Details"}
                    </h3>
                  </div>

                  {specAttrs.length > 0 ? (
                    <dl className="flex flex-wrap justify-center gap-4 lg:gap-6">
                      {specAttrs.map((attr, index) => {
                        let decodedValue = String(attr.value).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

                        // Dinamik varyant ezmesi
                        const opts = product.variantOptions || { light: null, casing: null, watt: null, socket: null };
                        const labelLower = attr.label.toLowerCase();
                        if ((labelLower.includes("duy") || labelLower.includes("socket")) && opts.socket) {
                          decodedValue = opts.socket;
                        }
                        if ((labelLower.includes("güç") || labelLower.includes("guc") || labelLower.includes("watt")) && opts.watt) {
                          decodedValue = opts.watt;
                        }

                        return (
                          <div key={index} className={`flex-1 min-w-[150px] max-w-[250px] flex flex-col items-center justify-center text-center p-5 rounded-3xl border transition-transform duration-300 hover:-translate-y-2 ${isLight ? "bg-white border-zinc-100 shadow-sm hover:shadow-md" : "bg-white/5 border-white/10 hover:bg-white/10"}`}>
                            <dt className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
                              {attr.label}
                            </dt>
                            <dd className={`text-base md:text-lg font-black tracking-tight m-0 ${isLight ? "text-zinc-900" : "text-white"}`}>
                              {decodedValue}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  ) : (
                    <div className={`p-8 rounded-3xl border border-dashed flex items-center justify-center max-w-2xl mx-auto ${isLight ? "bg-white/50 border-zinc-200 text-zinc-400" : "bg-white/5 border-white/10 text-zinc-500"}`}>
                      <span className="font-medium text-sm">
                        {language === "tr" ? "Bu ürüne ait detaylı teknik veri bulunmamaktadır." : "No detailed technical data available."}
                      </span>
                    </div>
                  )}
                </div>

                {/* Sözel Özellikler (Highlights) */}
                {featuresList.length > 0 && (
                  <div className="w-full">
                    <div className="flex items-center mb-8 justify-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isLight ? themePillBg : "bg-zinc-800"}`}>
                        <svg className={`w-4 h-4 ${isLight ? themeText : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className={`text-xl lg:text-2xl font-bold tracking-tight ${isLight ? "text-zinc-800" : "text-white"}`}>
                        {language === "tr" ? "Öne Çıkan Özellikler" : "Key Features"}
                      </h3>
                    </div>

                    <ul className="flex flex-wrap justify-center gap-4 lg:gap-6">
                      {featuresList.map((feat, idx) => (
                        <li key={idx} className={`flex-1 min-w-[280px] max-w-sm flex items-start gap-4 p-6 rounded-3xl border transition-all duration-300 ${isLight ? "bg-white border-zinc-100 shadow-sm hover:shadow-md" : "bg-white/5 border-white/5 hover:bg-white/10"}`}>
                          <div className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isLight ? themePillBg : "bg-white/10"}`}>
                            <svg className={`w-4 h-4 ${isLight ? themeText : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className={`text-base md:text-lg font-medium leading-relaxed ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })()}
          {/* Vanti Video Section */}
          {videoId && (
            <div className="w-full max-w-5xl mx-auto pt-8">
              <div className="flex items-center mb-8 justify-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isLight ? themePillBg : "bg-zinc-800"}`}>
                  <svg className={`w-4 h-4 ${isLight ? themeText : "text-white"}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <h3 className={`text-xl lg:text-2xl font-bold tracking-tight ${isLight ? "text-zinc-800" : "text-white"}`}>
                  {language === "tr" ? "Kurulum Videosu" : "Installation Video"}
                </h3>
              </div>

              <div className="w-full relative group">
                <div className={`absolute -inset-2 md:-inset-4 ${isLight ? 'bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100' : 'bg-gradient-to-r from-[var(--brand-red)] via-orange-500 to-[var(--brand-red)]'} rounded-[2.5rem] md:rounded-[3rem] opacity-30 blur-2xl transition-opacity duration-700 animate-pulse pointer-events-none`} />
                
                <div className="w-full aspect-video rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.1)] relative z-10 bg-black cursor-pointer group/video" onClick={() => setIsVideoPlaying(true)}>
                  {!isVideoPlaying ? (
                    <>
                      <img 
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105 opacity-80 group-hover/video:opacity-100"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-24 h-24 ${isLight ? 'bg-blue-600' : 'bg-[var(--brand-red)]'} rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.6)] transform transition-transform duration-300 group-hover/video:scale-110`}>
                          <svg className="w-10 h-10 text-white translate-x-[3px]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <iframe
                      className="w-full h-full object-cover"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
                      title="Kurulum Videosu"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          )}

        </article>
      </div>
    </div>
  );
}
