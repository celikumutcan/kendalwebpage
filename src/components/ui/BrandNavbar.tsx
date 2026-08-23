"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/lib/basePath";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface BrandNavbarProps {
  brandName: string; // 'k2' or 'vanti'
}

export const BrandNavbar = ({ brandName }: BrandNavbarProps) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isK2 = brandName === "k2";
  const logoSrc = isK2 
    ? getAssetPath("/images/brands/k2-logo.svg") 
    : brandName === "vanti"
      ? getAssetPath("/images/brands/vanti-logo.svg")
      : getAssetPath("/images/brands/global-logo.svg");

  const brandColor = isK2 ? "#FF6600" : brandName === "vanti" ? "#2563EB" : "#FFDA51"; // Orange for K2, Blue for Vanti, Yellow for Global

  const homeHref = process.env.NODE_ENV === "production" ? `/brand/${brandName}` : "/";
  const urunlerHref = process.env.NODE_ENV === "production" ? `/brand/${brandName}/urunler` : "/urunler";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 flex items-center justify-between bg-white/90 backdrop-blur-md text-zinc-900 border-b border-zinc-200 transition-colors duration-300 shadow-sm">
        <Link href={homeHref} className="relative flex items-center hover:opacity-80 transition-opacity z-50">
          <Image 
            src={logoSrc} 
            alt={`${brandName} Logo`} 
            width={160} 
            height={50} 
            priority 
            className="h-10 md:h-14 w-auto object-contain" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm flex-1 justify-center h-full">
          <Link href={homeHref} className="hover:text-zinc-500 transition-colors font-medium">{(t as any).brand_pages?.navbar?.home || "Ana Sayfa"}</Link>
          <Link href={urunlerHref} className="hover:text-zinc-500 transition-colors font-medium">{(t as any).brand_pages?.navbar?.products || "Ürünler"}</Link>
          <Link href={`${homeHref}#iletisim`} className="hover:text-zinc-500 transition-colors font-medium">{(t as any).brand_pages?.navbar?.contact || "İletişim"}</Link>
        </div>

        <div className="relative flex items-center gap-2 sm:gap-4 ml-auto lg:ml-0 z-50">
          <LanguageSwitcher />

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden p-2 -mr-2 text-zinc-600 hover:text-zinc-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 top-[72px] md:top-[88px] bg-black/95 backdrop-blur-xl z-40 transition-all duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 gap-6 pt-8 text-center text-xl">
          <Link href={homeHref} className="text-white hover:text-white/70" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).brand_pages?.navbar?.home || "Ana Sayfa"}</Link>
          <Link href={urunlerHref} className="text-white hover:text-white/70" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).brand_pages?.navbar?.products || "Ürünler"}</Link>
          <Link href={`${homeHref}#iletisim`} className="text-white hover:text-white/70" onClick={() => setIsMobileMenuOpen(false)}>{(t as any).brand_pages?.navbar?.contact || "İletişim"}</Link>
          
        </div>
      </div>
    </>
  );
};
