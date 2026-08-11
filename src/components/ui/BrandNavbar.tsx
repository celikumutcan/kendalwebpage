"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/basePath";

interface BrandNavbarProps {
  brandName: string; // 'k2' or 'vanti'
}

export const BrandNavbar = ({ brandName }: BrandNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isK2 = brandName === "k2";
  const logoSrc = isK2 
    ? getAssetPath("/images/brands/k2-logo.svg") 
    : getAssetPath("/images/brands/vanti-logo.svg");

  const brandColor = isK2 ? "#FF6600" : "#2563EB"; // Orange for K2, Blue for Vanti

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 flex items-center justify-between bg-white/90 backdrop-blur-md text-zinc-900 border-b border-zinc-200 transition-colors duration-300 shadow-sm">
        <Link href="/" className="relative flex items-center hover:opacity-80 transition-opacity z-50">
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
          <Link href="/" className="hover:text-zinc-500 transition-colors font-medium">Ana Sayfa</Link>
          <a href="/urunler" className="hover:text-zinc-500 transition-colors font-medium">Ürünler</a>
          <Link href="#iletisim" className="hover:text-zinc-500 transition-colors font-medium">İletişim</Link>
        </div>

        <div className="relative flex items-center gap-2 sm:gap-4 ml-auto lg:ml-0 z-50">
          <a
            href="https://www.kendalelektrik.com.tr"
            className="hidden sm:inline-flex text-xs sm:text-sm font-medium border border-zinc-200 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-zinc-100 transition-all duration-300 whitespace-nowrap text-zinc-900"
          >
            Kendal Elektrik
          </a>
          
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
          <Link href="/" className="text-white hover:text-white/70" onClick={() => setIsMobileMenuOpen(false)}>Ana Sayfa</Link>
          <a href="/urunler" className="text-white hover:text-white/70" onClick={() => setIsMobileMenuOpen(false)}>Ürünler</a>
          <Link href="#iletisim" className="text-white hover:text-white/70" onClick={() => setIsMobileMenuOpen(false)}>İletişim</Link>
          
          <a
            href="https://www.kendalelektrik.com.tr"
            className="mt-8 text-sm font-medium border border-white/20 rounded-full px-6 py-3 hover:bg-white/10 transition-all duration-300 mx-auto text-white"
          >
            Kendal Elektrik
          </a>
        </div>
      </div>
    </>
  );
};
