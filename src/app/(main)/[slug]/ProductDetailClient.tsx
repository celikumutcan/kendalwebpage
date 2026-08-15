"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { Product, getProductImageUrl, products, getSlugByProductId } from "@/data/products";
import { getAssetPath } from "@/utils/basePath";

interface ProductDetailClientProps {
  product: Product;
  brandName?: "k2" | "vanti" | "global";
  pdfFormFile?: string | null;
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

export function ProductDetailClient({ product, brandName, pdfFormFile }: ProductDetailClientProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const name = product.name[language] || product.name.tr;
  const attributes = product.attributes[language] || product.attributes.tr;
  const imageUrl = getProductImageUrl(product.image);

  const isK2 = brandName === "k2";
  const isVanti = brandName === "vanti";
  const isGlobal = brandName === "global";
  const isLight = isK2 || isVanti || isGlobal;

  let displayName = name;
  if (isGlobal) {
    const words = name.trim().split(' ');
    displayName = words.filter((w: string) => {
      const upper = w.toUpperCase();
      if (upper.match(/^\d+W$/i)) return false;
      if (upper.match(/^\d{3,5}K$/i)) return false;
      if (['SARI', 'BEYAZ', 'ARARENK', 'GÜNIŞIĞI', 'MAVİ', 'YEŞİL', 'KIRMIZI', 'AMBER', 'GÜN', 'IŞIĞI', 'CCT'].includes(upper)) return false;
      if (upper.match(/^(E14|E27|GU10|G9|R7S)$/i)) return false;
      if (upper.match(/^\d+[\*xX]\d+$/)) return false;
      return true;
    }).join(' ');
  }

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

  const SectionDivider = () => (
    <div className="w-full flex items-center justify-center opacity-90 -my-5 lg:-my-7">
      <div className={`w-full max-w-[200px] md:max-w-md h-[2px] bg-gradient-to-r ${isLight ? 'from-transparent to-zinc-400' : 'from-transparent to-white/35'}`}></div>
      <div className={`w-2 h-2 rounded-full mx-5 ${isLight ? 'bg-zinc-400' : 'bg-white/40'}`}></div>
      <div className={`w-full max-w-[200px] md:max-w-md h-[2px] bg-gradient-to-l ${isLight ? 'from-transparent to-zinc-400' : 'from-transparent to-white/35'}`}></div>
    </div>
  );

  const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <div className="flex items-center gap-3 py-3 mb-8 justify-center">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isLight ? `${themePillBg} ${themeText}` : "bg-white/[0.06] border border-white/10 text-white"}`}>
        {icon}
      </div>
      <h3 className={`text-xl lg:text-2xl font-bold tracking-tight ${isLight ? "text-zinc-800" : "text-white"}`}>
        {title}
      </h3>
    </div>
  );

  return (
    <div className={`relative min-h-screen pb-24 overflow-hidden selection:bg-white/30 ${isLight ? "pt-24 bg-[#f4f5f7] text-zinc-900" : "pt-32 md:pt-40 bg-[#030303] text-white"}`}>
      
      {/* 1. CINEMATIC VIGNETTE & GRAIN NOISE */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{ boxShadow: isLight ? 'inset 0 0 150px rgba(0,0,0,0.03)' : 'inset 0 0 200px rgba(0,0,0,0.8)' }} />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[2]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* 2. OVER-THE-TOP PREMIUM DECORATIVE BACKGROUNDS (GPU ACCELERATED) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* === K2 BRAND (DYNAMIC, LAVA, SPORTY) === */}
        {isK2 && (
          <>
            {/* Massive Lava Ambient Glows */}
            <div className="absolute -left-[20%] top-[-10%] w-[1200px] h-[1200px] rounded-full bg-orange-600/15 blur-[160px] animate-[pulse_10s_ease-in-out_infinite]" />
            <div className="absolute right-[-10%] top-[30%] w-[1000px] h-[1000px] rounded-full bg-red-600/10 blur-[150px] animate-[pulse_14s_ease-in-out_infinite_reverse]" />
            <div className="absolute left-[30%] bottom-[-20%] w-[800px] h-[800px] rounded-full bg-amber-500/15 blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
            
            {/* Cinematic Spotlight from Top */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[500px] bg-gradient-to-b from-orange-300/30 via-orange-400/5 to-transparent blur-3xl opacity-60" />

            {/* Floating Embers / Particles */}
            <div className="absolute left-[15%] top-[25%] w-2 h-2 rounded-full bg-orange-400 blur-[1px] animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute right-[25%] top-[45%] w-3 h-3 rounded-full bg-red-400 blur-[2px] animate-[ping_6s_cubic-bezier(0,0,0.2,1)_infinite_reverse]" />
            <div className="absolute left-[45%] bottom-[35%] w-1.5 h-1.5 rounded-full bg-yellow-400 blur-[1px] animate-[ping_5s_cubic-bezier(0,0,0.2,1)_infinite]" />
            
            {/* Angled Dynamic Speed Lines */}
            <div className="absolute -left-[10%] top-[10%] w-[400px] h-[800px] border-l-[120px] border-orange-500/5 -rotate-45 blur-[10px]" />
            <div className="absolute right-[5%] top-[50%] w-[300px] h-[1000px] border-r-[80px] border-red-500/5 rotate-45 blur-[8px]" />
          </>
        )}

        {/* === VANTI BRAND (AERO, WIND TUNNEL, ICE) === */}
        {isVanti && (
          <>
            {/* Massive Ambient Breezes */}
            <div className="absolute -left-[10%] top-[-10%] w-[1200px] h-[1200px] rounded-full bg-blue-500/15 blur-[160px] animate-[pulse_12s_ease-in-out_infinite]" />
            <div className="absolute right-[-20%] top-[20%] w-[1400px] h-[1400px] rounded-full bg-cyan-400/10 blur-[150px] animate-[pulse_15s_ease-in-out_infinite_reverse]" />
            
            {/* Cinematic Spotlight */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1000px] h-[600px] bg-gradient-to-b from-cyan-200/30 via-blue-300/5 to-transparent blur-3xl opacity-60" />
            
            {/* Wind Tunnel Sweeps (Curved SVGs or Gradients) */}
            <div className="absolute top-[20%] left-[-20%] right-[-20%] h-[300px] bg-gradient-to-r from-transparent via-blue-400/5 to-transparent -rotate-6 blur-[40px] rounded-[100%]" />
            <div className="absolute top-[60%] left-[-20%] right-[-20%] h-[400px] bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent rotate-3 blur-[50px] rounded-[100%]" />
            
            {/* Spinning Concentric Fan Rings - Ultra Premium */}
            <div className="absolute -left-[10%] top-[10%] w-[800px] h-[800px] rounded-full border-[1px] border-blue-400/20 shadow-[0_0_100px_rgba(59,130,246,0.1)] animate-[spin_40s_linear_infinite]" />
            <div className="absolute -left-[5%] top-[15%] w-[700px] h-[700px] rounded-full border-[2px] border-dashed border-cyan-400/15 animate-[spin_30s_linear_infinite_reverse]" />
            <div className="absolute left-[0%] top-[20%] w-[600px] h-[600px] rounded-full border-[4px] border-dotted border-blue-300/10 animate-[spin_20s_linear_infinite]" />
          </>
        )}

        {/* === GLOBAL BRAND (SOLAR, WARM, ELEGANT, DYNAMIC) === */}
        {isGlobal && (
          <>
            {/* Massive Soft Yellow Ambient Glows */}
            <div className="absolute -left-[10%] top-[-10%] w-[1000px] h-[1000px] rounded-full bg-[#FFDA51]/15 blur-[150px] animate-[pulse_10s_ease-in-out_infinite]" />
            <div className="absolute right-[-10%] top-[30%] w-[1200px] h-[1200px] rounded-full bg-yellow-400/10 blur-[150px] animate-[pulse_14s_ease-in-out_infinite_reverse]" />
            <div className="absolute left-[20%] bottom-[-20%] w-[800px] h-[800px] rounded-full bg-amber-300/15 blur-[120px] animate-[pulse_12s_ease-in-out_infinite]" />
            
            {/* Elegant Golden Spotlight (Top down) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[500px] bg-gradient-to-b from-yellow-300/20 via-amber-200/5 to-transparent blur-3xl opacity-60" />
            
            {/* Faint Grid Texture for depth */}
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(#FFDA51 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Morphing Liquid Sun & Expanding Solar Flares */}
            <div className="absolute -right-[10%] top-[5%] w-[800px] h-[800px] bg-gradient-to-tr from-[#FFDA51]/20 to-amber-200/5 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-[spin_25s_linear_infinite] blur-[40px]" />
            <div className="absolute -right-[5%] top-[10%] w-[700px] h-[700px] bg-gradient-to-bl from-amber-400/15 to-yellow-100/10 rounded-[60%_40%_30%_70%/50%_60%_40%_50%] animate-[spin_35s_linear_infinite_reverse] blur-[30px]" />
            <div className="absolute right-[0%] top-[15%] w-[600px] h-[600px] border-[2px] border-amber-300/30 rounded-[50%_50%_30%_70%/60%_40%_60%_40%] animate-[spin_45s_linear_infinite] blur-[1px] shadow-[0_0_50px_rgba(251,191,36,0.2)]" />
            
            {/* Elegant Sun Ripples */}
            <div className="absolute -right-[5%] top-[10%] w-[800px] h-[800px] rounded-full border-[1px] border-amber-200/20 animate-[ping_10s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute -right-[5%] top-[10%] w-[800px] h-[800px] rounded-full border-[1.5px] border-yellow-300/10 animate-[ping_14s_cubic-bezier(0,0,0.2,1)_infinite_4s]" />
            
            {/* Floating Light Particles / Embers */}
            <div className="absolute left-[20%] top-[35%] w-2 h-2 rounded-full bg-yellow-300 blur-[1px] animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute right-[35%] top-[55%] w-3 h-3 rounded-full bg-amber-400 blur-[2px] animate-[ping_6s_cubic-bezier(0,0,0.2,1)_infinite_reverse]" />
            <div className="absolute left-[55%] bottom-[25%] w-2.5 h-2.5 rounded-full bg-[#FFDA51] blur-[1.5px] animate-[ping_5s_cubic-bezier(0,0,0.2,1)_infinite]" />

            {/* Subtle Diagonal Accent Lines */}
            <div className="absolute left-[15%] top-[-10%] w-[400px] h-[600px] bg-gradient-to-br from-yellow-200/10 to-transparent -rotate-12 blur-[40px] rounded-[100%]" />
            <div className="absolute right-[5%] bottom-[10%] w-[500px] h-[500px] bg-gradient-to-bl from-amber-300/10 to-transparent rotate-12 blur-[50px] rounded-[100%]" />
          </>
        )}

        {/* === KENDAL (CYBERPUNK, DEEP SPACE, NEON) === */}
        {!isLight && (
          <>
            {/* Deep Space Nebula Glows */}
            <div className="absolute -left-[20%] top-[-10%] w-[1400px] h-[1400px] rounded-full bg-blue-600/15 blur-[180px] animate-[pulse_15s_ease-in-out_infinite]" />
            <div className="absolute right-[-20%] top-[30%] w-[1200px] h-[1200px] rounded-full bg-[var(--brand-red)]/15 blur-[180px] animate-[pulse_12s_ease-in-out_infinite_reverse]" />
            
            {/* Holographic Center Stage Spotlight */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[-10%] w-[1000px] h-[800px] bg-gradient-to-b from-indigo-500/20 via-purple-500/5 to-transparent blur-3xl opacity-50" />
            
            {/* High-Tech Perspective Grid Floor */}
            <div className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-20" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 40px', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'bottom' }} />
            
            {/* Glowing Neon Laser Lines */}
            <div className="absolute left-[15%] top-[-10%] w-[2px] h-[120%] bg-gradient-to-b from-transparent via-blue-400/40 to-transparent shadow-[0_0_20px_rgba(96,165,250,0.8)]" />
            <div className="absolute right-[15%] top-[-10%] w-[2px] h-[120%] bg-gradient-to-b from-transparent via-[var(--brand-red)]/40 to-transparent shadow-[0_0_20px_rgba(220,38,38,0.8)]" />
            
            {/* Floating Dust / Stars */}
            <div className="absolute left-[30%] top-[20%] w-1 h-1 rounded-full bg-white shadow-[0_0_10px_white] animate-[ping_3s_ease-in-out_infinite]" />
            <div className="absolute right-[30%] top-[40%] w-1.5 h-1.5 rounded-full bg-blue-300 shadow-[0_0_15px_#93c5fd] animate-[ping_5s_ease-in-out_infinite_reverse]" />
          </>
        )}
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">

        {/* Header Section: Back Button + Title */}
        <div className="flex flex-col md:flex-row items-center justify-center relative mb-8 md:mb-10 gap-6 md:gap-0">

          {/* Elegant Back Button */}
          <button
            onClick={() => router.back()}
            className={`group flex items-center gap-2.5 w-fit rounded-full pl-2 pr-4 py-2 transition-all duration-300 md:absolute md:left-0 z-20 ${isLight ? 'text-zinc-500 hover:text-zinc-900 bg-white/70 hover:bg-white border border-zinc-200/80 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)]' : 'text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10'}`}
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="font-semibold tracking-wide text-xs uppercase">
              {language === 'en' ? 'Go Back' : 'Geri Dön'}
            </span>
          </button>

          <div className="flex flex-col items-center gap-3">
            {/* Kicker */}
            <span className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full ${isLight ? `${themePillBg} ${themeText}` : "bg-white/[0.06] border border-white/10 text-white/70"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isLight ? themeColor : "bg-white"}`} />
              {product.model}
            </span>

            {/* Title with Gradient Fill */}
            <h1
              itemProp="name"
              className={`text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] max-w-4xl text-center px-4 relative z-20
              ${isLight
                ? 'bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-600'
                : 'bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]'}`}
            >
              {displayName}
            </h1>
          </div>

        </div>

        <article itemScope itemType="https://schema.org/Product" className="flex flex-col items-center w-full max-w-5xl mx-auto gap-10 lg:gap-14">

          {/* 3. 3D PEDESTAL & PREMIUM IMAGE SHOWCASE */}
          <div className="w-full flex justify-center relative perspective-[1000px] mt-0 mb-4 group/showcase">

            {/* The Floating Glow Behind Product */}
            <div className={`absolute inset-0 top-1/2 -translate-y-1/2 w-full max-w-3xl mx-auto h-[80%] blur-[110px] rounded-full pointer-events-none z-0 transition-opacity duration-700 ${isLight ? 'bg-white/60' : 'bg-white/[0.07]'}`} />

            {/* The 3D Pedestal Floor (Reflective surface beneath the product) */}
            <div className="absolute bottom-[-6%] left-1/2 -translate-x-1/2 w-[70%] max-w-[520px] h-[80px] rounded-[100%] blur-md z-0 opacity-70"
                 style={{
                   background: isLight ? 'radial-gradient(ellipse at center, rgba(0,0,0,0.12) 0%, transparent 70%)' : 'radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, transparent 70%)',
                   transform: 'rotateX(75deg)'
                 }}
            />

            {/* The Glassmorphism Box */}
            <div className={`relative w-full max-w-[320px] md:max-w-md flex items-center justify-center p-8 md:p-10 z-10 rounded-[2.5rem] transition-all duration-500 group-hover/showcase:-translate-y-1.5
              ${isLight
                ? 'bg-white/60 backdrop-blur-2xl border border-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.15)]'
                : 'bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_40px_100px_-20px_rgba(0,0,0,0.9)]'
              }`}
            >
              {/* Subtle top sheen */}
              <div className={`absolute inset-x-0 top-0 h-1/2 rounded-t-[2.5rem] pointer-events-none bg-gradient-to-b ${isLight ? 'from-white/70 to-transparent' : 'from-white/[0.06] to-transparent'}`} />

              {/* Corner accent brackets */}
              <div className={`absolute top-5 left-5 w-5 h-5 border-t-2 border-l-2 rounded-tl-lg opacity-40 ${isLight ? 'border-zinc-400' : 'border-white/30'}`} />
              <div className={`absolute bottom-5 right-5 w-5 h-5 border-b-2 border-r-2 rounded-br-lg opacity-40 ${isLight ? 'border-zinc-400' : 'border-white/30'}`} />

              <img
                itemProp="image"
                src={imageUrl}
                alt={name}
                className={`w-full h-auto object-contain relative z-20 transition-transform duration-500 group-hover/showcase:scale-[1.03] ${isLight ? 'mix-blend-multiply drop-shadow-xl' : 'drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]'}`}
              />
            </div>
          </div>

          {/* Ürün Bilgi Formu (PDF) */}
          {pdfFormFile && (
            <a
              href={getAssetPath('/urun-bilgi-formlari/' + encodeURIComponent(pdfFormFile))}
              download={pdfFormFile}
              className={`group -mt-6 inline-flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border shadow-sm hover:-translate-y-0.5 ${isLight ? "bg-white text-zinc-800 border-zinc-200 hover:border-zinc-300 hover:shadow-md" : "bg-white/[0.04] text-white border-white/10 hover:bg-white/[0.08] hover:border-white/20"}`}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isLight ? themePillBg : "bg-white/10"}`}>
                <svg className={`w-4 h-4 ${isLight ? themeText : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H8a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              <span>{language === "tr" ? "Ürün Bilgi Formu İndir" : "Download Product Info Sheet"}</span>
              <svg className="w-4 h-4 opacity-40 -translate-x-1 group-hover:opacity-90 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}

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

                if (isGlobal) {
                  return (
                    <div
                      key={match.variant.id + "-" + label}
                      className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-bold border ${
                        isLight ? "bg-white text-zinc-800 border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-default" : "bg-white/[0.06] text-white border-white/20 shadow-[0_2px_8px_rgba(255,255,255,0.04)] cursor-default"
                        }`}
                    >
                      {showColorDot && <span className={`w-3.5 h-3.5 rounded-full ${match.dotColor} border border-black/10 shadow-sm flex-shrink-0`} />}
                      <span>{label}</span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={match.variant.id + "-" + label}
                    href={variantUrl}
                    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${isSelected
                      ? (isLight ? `${themeColor} text-white border-transparent ${themeGlow} scale-[1.03]` : "bg-white text-black border-transparent shadow-[0_0_25px_rgba(255,255,255,0.15)] scale-[1.03]")
                      : (isLight ? "bg-white/70 text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-white hover:-translate-y-0.5" : "bg-white/[0.03] text-zinc-400 border-white/10 hover:border-white/25 hover:text-white hover:-translate-y-0.5")
                      }`}
                  >
                    {showColorDot && <span className={`w-3 h-3 rounded-full ${match.dotColor} border border-black/10 shadow-sm flex-shrink-0`} />}
                    <span>{label}</span>
                    {isSelected && (
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </Link>
                );
              };

              return (
                <div className="w-full flex flex-col gap-10 items-center text-center">
                  {/* Renk Seçenekleri */}
                  {uniqueColors.length > 1 && (
                    <div className="flex flex-col items-center">
                      <SectionHeader
                        title={language === "tr" ? "Renk Seçenekleri" : "Color Options"}
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        }
                      />
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
                      <SectionHeader
                        title={language === "tr" ? "Watt Seçenekleri" : "Wattage Options"}
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        }
                      />
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
                      <SectionHeader
                        title={language === "tr" ? "Duy Seçenekleri" : "Socket Options"}
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                        }
                      />
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

            const featureLabels = ["Özellik", "Feature", "Açıklama", "Description", "Fonksiyonlar", "Functions"];

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
              <div className="flex flex-col gap-10 lg:gap-14 w-full">
                <SectionDivider />

                {/* Technical Specs - Bento Box Grid */}
                <div className="w-full pb-3">
                  <SectionHeader
                    title={language === "tr" ? "Teknik Detaylar" : "Technical Details"}
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    }
                  />

                  {specAttrs.length > 0 ? (() => {
                    const opts = product.variantOptions || { light: null, casing: null, watt: null, socket: null };
                    const preparedSpecs = specAttrs.map((attr) => {
                      let decodedValue = String(attr.value).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
                      const labelLower = attr.label.toLowerCase();
                      if ((labelLower.includes("duy") || labelLower.includes("socket")) && opts.socket) {
                        decodedValue = opts.socket;
                      }
                      if ((labelLower.includes("güç") || labelLower.includes("guc") || labelLower.includes("watt")) && opts.watt) {
                        decodedValue = opts.watt;
                      }
                      return { attr, decodedValue };
                    });

                    // Uzun cümle içeren değerler (örn. "Kullanım Alanları") dar kartlara sığmıyor,
                    // bu yüzden geniş, tam satır kartlarda ayrı gösteriliyor.
                    const compactSpecs = preparedSpecs.filter((s) => s.decodedValue.length <= 40);
                    const longSpecs = preparedSpecs.filter((s) => s.decodedValue.length > 40);

                    return (
                      <div className="flex flex-col gap-4">
                        {compactSpecs.length > 0 && (
                          <dl className="flex flex-wrap justify-center gap-3 lg:gap-4">
                            {compactSpecs.map(({ attr, decodedValue }, index) => (
                              <div key={index} className={`group relative flex-1 min-w-[150px] max-w-[260px] flex flex-col items-center justify-center text-center gap-2 p-5 rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${isLight ? "bg-white border-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_30px_-12px_rgba(0,0,0,0.12)]" : "bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12]"}`}>
                                <span className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full transition-all duration-300 group-hover:w-14 ${isLight ? themeColor : "bg-white/25"}`} />
                                <dt className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
                                  {attr.label}
                                </dt>
                                <dd className={`m-0 text-[15px] md:text-base font-semibold leading-snug tracking-normal ${isLight ? "text-zinc-800" : "text-white"}`}>
                                  {decodedValue}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        )}

                        {longSpecs.length > 0 && (
                          <dl className="flex flex-col gap-3 max-w-2xl mx-auto w-full">
                            {longSpecs.map(({ attr, decodedValue }, index) => (
                              <div key={index} className={`flex flex-col gap-1.5 p-5 rounded-2xl border text-left ${isLight ? "bg-white border-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)]" : "bg-white/[0.03] border-white/[0.07]"}`}>
                                <dt className={`text-center text-[10px] md:text-xs font-bold uppercase tracking-widest ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
                                  {attr.label}
                                </dt>
                                <dd className={`m-0 text-sm md:text-[15px] font-medium leading-relaxed ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>
                                  {decodedValue}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        )}
                      </div>
                    );
                  })() : (
                    <div className={`p-8 rounded-3xl border border-dashed flex items-center justify-center max-w-2xl mx-auto ${isLight ? "bg-white/50 border-zinc-200 text-zinc-400" : "bg-white/5 border-white/10 text-zinc-500"}`}>
                      <span className="font-medium text-sm">
                        {language === "tr" ? "Bu ürüne ait detaylı teknik veri bulunmamaktadır." : "No detailed technical data available."}
                      </span>
                    </div>
                  )}
                </div>

                {/* Sözel Özellikler (Highlights) */}
                {featuresList.length > 0 && (
                  <>
                    <SectionDivider />
                    <div className="w-full">
                      <SectionHeader
                        title={language === "tr" ? "Öne Çıkan Özellikler" : "Key Features"}
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      />

                    <ul className="flex flex-wrap justify-center gap-4 lg:gap-6">
                      {featuresList.map((feat, idx) => (
                        <li key={idx} className={`flex-1 min-w-[280px] max-w-sm flex items-start gap-4 p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${isLight ? "bg-white border-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_30px_-12px_rgba(0,0,0,0.12)]" : "bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12]"}`}>
                          <div className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isLight ? themePillBg : "bg-white/[0.06] border border-white/10"}`}>
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
                  </>
                )}
              </div>
            );
          })()}
          {/* Vanti Video Section */}
          {videoId && (
            <>
              <SectionDivider />
              <div className="w-full max-w-3xl mx-auto">
                <SectionHeader
                  title={language === "tr" ? "Kurulum Videosu" : "Installation Video"}
                  icon={
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  }
                />

                <div className="w-full relative group">
                  <div className={`absolute -inset-2 md:-inset-4 ${isLight ? 'bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100' : 'bg-gradient-to-r from-[var(--brand-red)] via-orange-500 to-[var(--brand-red)]'} rounded-[2.5rem] md:rounded-[3rem] opacity-20 blur-2xl transition-opacity duration-700 group-hover:opacity-40 pointer-events-none`} />

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
            </>
          )}

        </article>
      </div>
    </div>
  );
}
