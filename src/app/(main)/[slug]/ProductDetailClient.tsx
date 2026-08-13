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
                    {language === "tr" ? "Seçenekler" : "Options"}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {(() => {
                    // Pre-process all variations to determine if we need to append Watt/Socket
                    const hasLightColors = variations.some(v => {
                      const n = (v.name.tr || "").toUpperCase();
                      return n.match(/\b\d{4}K\b/) || n.includes("SARI") || n.includes("GÜN") || n.includes("GUN") || n.includes("ILIK") || n.includes("ARA");
                    });

                    const variantData = variations.map(variant => {
                      const name = (variant.name.tr || "").toUpperCase();
                      const nameUpper = name.toUpperCase();
                      let detectedCasing = "";
                      if (nameUpper.includes("KROM")) detectedCasing = "Krom Kasa";
                      else if (nameUpper.includes("ESKİTME") || nameUpper.includes("ESKITME")) detectedCasing = "Eskitme Kasa";
                      else if (nameUpper.includes("SILVER") || nameUpper.includes("GÜMÜŞ") || nameUpper.includes("GUMUS")) detectedCasing = "Silver Kasa";
                      else if (nameUpper.includes("SATEN")) detectedCasing = "Saten Kasa";
                      else if (nameUpper.includes("SİYAH") || nameUpper.includes("SIYAH")) detectedCasing = "Siyah Kasa";
                      else if (nameUpper.includes("GOLD") || nameUpper.includes("ALTIN")) detectedCasing = "Gold Kasa";
                      else if (nameUpper.includes("BAKIR")) detectedCasing = "Bakır Kasa";
                      else if (nameUpper.includes("BRONZ")) detectedCasing = "Bronz Kasa";
                      else if (nameUpper.includes("KAHVE")) detectedCasing = "Kahve Kasa";
                      else if (nameUpper.includes("MAVİ") || nameUpper.includes("MAVI")) detectedCasing = "Mavi Kasa/Dekor";
                      else if (nameUpper.includes("YEŞİL") || nameUpper.includes("YESIL")) detectedCasing = "Yeşil Kasa/Dekor";
                      else if (nameUpper.includes("KIRMIZI")) detectedCasing = "Kırmızı Kasa/Dekor";
                      else if (nameUpper.includes("PEMBE")) detectedCasing = "Pembe Kasa/Dekor";
                      else if (nameUpper.match(/BEYAZ.*BEYAZ/) || (nameUpper.includes("BEYAZ") && !variant.model.toUpperCase().includes("BEYAZ"))) detectedCasing = "Beyaz Kasa";

                      let colorTemp = variant.model;
                      let dotColor = 'bg-zinc-200';
                      
                      const match = name.match(/\b(\d{4})K\b/);
                      if (match) {
                        colorTemp = match[0];
                        if (colorTemp.includes('2700K')) { colorTemp = 'Sıcak Işık (2700K)'; dotColor = 'bg-[#FFA957]'; }
                        else if (colorTemp.includes('3000K')) { colorTemp = 'Günışığı (3000K)'; dotColor = 'bg-[#FFB46B]'; }
                        else if (colorTemp.includes('4000K')) { colorTemp = 'Ararenk (4000K)'; dotColor = 'bg-[#FFEDC2]'; }
                        else if (colorTemp.includes('6500K')) { colorTemp = 'Beyaz (6500K)'; dotColor = 'bg-[#E4F1FE]'; }
                      } else if (hasLightColors && (name.includes("SARI") || name.includes("GÜN") || name.includes("GUN"))) {
                        colorTemp = "Günışığı (3000K)";
                        dotColor = 'bg-[#FFB46B]';
                      } else if (hasLightColors && (name.includes("ILIK") || name.includes("ARA"))) {
                        colorTemp = "Ararenk (4000K)";
                        dotColor = 'bg-[#FFEDC2]';
                      } else if (hasLightColors && name.includes("BEYAZ")) {
                        colorTemp = "Beyaz (6500K)";
                        dotColor = 'bg-[#E4F1FE]';
                      } else {
                        if (detectedCasing) {
                          colorTemp = detectedCasing;
                          detectedCasing = ""; // Clear so it isn't appended twice
                        } else {
                          const words = name.trim().split(' ');
                          colorTemp = words[words.length - 1].replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ]/g, '');
                        }

                        const ctUpper = colorTemp.toUpperCase();
                        if (ctUpper.includes("BEYAZ")) dotColor = 'bg-white border-zinc-200';
                        else if (ctUpper.includes("KROM")) dotColor = 'bg-slate-300';
                        else if (ctUpper.includes("SATEN") || ctUpper.includes("SILVER")) dotColor = 'bg-stone-300';
                        else if (ctUpper.includes("SİYAH") || ctUpper.includes("SIYAH")) dotColor = 'bg-zinc-900';
                        else if (ctUpper.includes("GOLD") || ctUpper.includes("ALTIN")) dotColor = 'bg-yellow-400';
                        else if (ctUpper.includes("BAKIR")) dotColor = 'bg-orange-600';
                        else if (ctUpper.includes("ESKİTME") || ctUpper.includes("ESKITME")) dotColor = 'bg-yellow-700';
                      }

                      // Extract Wattage
                      let watt = "";
                      const wattMatch = name.match(/\b(\d+W)\b/i);
                      if (wattMatch) watt = wattMatch[1];
                      else {
                        const wattAttr = variant.attributes?.tr?.find(a => a.label === "Watt" || a.label === "Güç");
                        if (wattAttr && wattAttr.value && wattAttr.value !== "N/A") watt = wattAttr.value.toUpperCase();
                      }
                      watt = watt.replace(/\s+W$/, 'W');

                      // Extract Socket
                      let socket = "";
                      const socketMatch = name.match(/\b(E14|E27|GU10|GU\s*5\.3|G9|G4)\b/i);
                      if (socketMatch) socket = socketMatch[1].replace(/\s+/g, '');
                      else {
                        const socketAttr = variant.attributes?.tr?.find(a => a.label === "Duy");
                        if (socketAttr && socketAttr.value && socketAttr.value !== "N/A") socket = socketAttr.value.toUpperCase().replace(/\s+/g, '');
                      }

                      // Return final object

                      return { variant, colorTemp, dotColor, watt, socket, detectedCasing };
                    });

                    // Count colorTemp occurrences
                    const colorCounts: Record<string, number> = {};
                    variantData.forEach(d => {
                      colorCounts[d.colorTemp] = (colorCounts[d.colorTemp] || 0) + 1;
                    });

                    // Render variations with dynamic labels
                    return variantData.map(({ variant, colorTemp, dotColor, watt, socket, detectedCasing }) => {
                      const isSelected = variant.id === product.id;
                      const categoryName = variant.category?.tr?.[0];
                      const categorySlug = categoryName ? slugify(categoryName) : (isK2 ? "aydinlatma" : "vantilator");
                      const variantSlug = getSlugByProductId(variant.id) || variant.id;

                      const variantUrl = isLight && process.env.NODE_ENV === "production"
                        ? `/brand/${brandName}/urunler/${categorySlug}/${variantSlug}`
                        : `/urunler/${categorySlug}/${variantSlug}`;

                      // Build the final label dynamically
                      let finalLabel = colorTemp;
                      if (colorCounts[colorTemp] > 1) {
                        const parts = [];
                        if (watt) parts.push(watt);
                        if (detectedCasing) parts.push(detectedCasing);
                        if (socket) parts.push(socket);
                        parts.push(colorTemp);
                        finalLabel = parts.join(' - ');
                      }

                      return (
                        <Link
                          key={variant.id}
                          href={variantUrl}
                          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border ${isSelected
                            ? (isLight ? `${themeColor} text-white border-transparent ${themeGlow} scale-[1.02]` : "bg-white text-black border-transparent shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-[1.02]")
                            : (isLight ? "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:scale-[1.02]" : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white")
                            }`}
                        >
                          <span className={`w-3 h-3 rounded-full ${dotColor} border border-black/10 shadow-sm flex-shrink-0`} />
                          <span>{finalLabel}</span>
                        </Link>
                      );
                    });
                  })()}
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

              {attributes && attributes.filter(attr => attr.value && attr.value.trim() !== "" && attr.value !== "N/A" && attr.label !== "Renk" && attr.label !== "Color").length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {attributes
                    .filter(attr => attr.value && attr.value.trim() !== "" && attr.value !== "N/A" && attr.label !== "Renk" && attr.label !== "Color")
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
            
            {/* Vanti Video Section */}
            {videoId && (
              <div className="mt-16 w-full">
                <div className="flex items-center mb-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isLight ? themePillBg : "bg-zinc-800"}`}>
                    <svg className={`w-4 h-4 ${isLight ? themeText : "text-white"}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <h3 className={`text-lg font-bold tracking-tight ${isLight ? "text-zinc-800" : "text-white"}`}>
                    {language === "tr" ? "Kurulum Videosu" : "Installation Video"}
                  </h3>
                </div>

                <div className="w-full relative group">
                  <div className={`absolute -inset-2 md:-inset-4 ${isLight ? 'bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100' : 'bg-gradient-to-r from-[var(--brand-red)] via-orange-500 to-[var(--brand-red)]'} rounded-[2.5rem] md:rounded-[3rem] opacity-50 blur-2xl md:blur-3xl transition-opacity duration-700 animate-pulse pointer-events-none`} />
                  
                  <div className="w-full aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.1)] relative z-10 bg-black cursor-pointer group/video" onClick={() => setIsVideoPlaying(true)}>
                    {!isVideoPlaying ? (
                      <>
                        <img 
                          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                          alt="Video Thumbnail"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105 opacity-80 group-hover/video:opacity-100"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-20 h-20 ${isLight ? 'bg-blue-600' : 'bg-[var(--brand-red)]'} rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.6)] transform transition-transform duration-300 group-hover/video:scale-110`}>
                            <svg className="w-8 h-8 text-white translate-x-[2px]" fill="currentColor" viewBox="0 0 24 24">
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

          </div>
        </div>
      </div>
    </div>
  );
}
