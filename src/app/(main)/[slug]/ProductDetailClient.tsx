"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/app/i18n/LanguageProvider";
import { Product, getProductImageUrl } from "@/data/products";

interface ProductDetailClientProps {
  product: Product;
  brandName?: "k2" | "vanti";
}

export function ProductDetailClient({ product, brandName }: ProductDetailClientProps) {
  const { language } = useLanguage();
  const name = product.name[language] || product.name.tr;
  const attributes = product.attributes[language] || product.attributes.tr;
  const imageUrl = getProductImageUrl(product.image);

  const isLight = !!brandName;
  const isK2 = brandName === "k2";

  return (
    <div className={`relative min-h-screen pt-32 pb-24 px-6 overflow-hidden ${isLight ? "bg-zinc-50 text-zinc-900" : "bg-[#050505] text-white"}`}>
      {/* Vibrant Spotlight Effects */}
      {!isLight && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -left-[10%] top-0 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full" />
          <div className="absolute -right-[10%] bottom-0 w-[600px] h-[600px] bg-[var(--brand-red)]/20 blur-[120px] rounded-full" />
        </div>
      )}

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Image Section */}
          <div className={`relative aspect-square w-full rounded-3xl overflow-hidden flex items-center justify-center p-8 group ${isLight ? "bg-white border border-zinc-200 shadow-xl" : "bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl"}`}>
            <Image
              src={imageUrl}
              alt={name}
              fill
              priority
              className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle inner glow for image container */}
            {!isLight && <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_50px_rgba(255,255,255,0.02)] pointer-events-none" />}
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-start py-4">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight ${isLight ? "text-zinc-900" : "text-white"}`}>
              {name}
            </h1>
            
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-10 self-start ${isLight ? (isK2 ? "bg-orange-100 text-orange-600 border border-orange-200" : "bg-blue-100 text-blue-600 border border-blue-200") : "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]"}`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Model: {product.model}
            </div>

            <div className={`rounded-2xl border overflow-hidden ${isLight ? "bg-white border-zinc-200 shadow-xl" : "bg-white/5 border-white/10 backdrop-blur-md shadow-2xl"}`}>
              <div className={`px-6 py-5 border-b flex items-center ${isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/5 border-white/10"}`}>
                <svg className={`w-5 h-5 mr-3 ${isLight ? "text-zinc-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className={`text-lg font-bold tracking-wide ${isLight ? "text-zinc-900" : "text-white"}`}>
                  {language === "tr" ? "Teknik Özellikler" : "Technical Specifications"}
                </h2>
              </div>
              
              <div className={`divide-y ${isLight ? "divide-zinc-100" : "divide-white/5"}`}>
                {attributes && attributes.length > 0 ? (
                  attributes.map((attr, index) => (
                    <div key={index} className={`flex flex-col sm:flex-row sm:items-start px-6 py-4 transition-colors duration-300 gap-1 sm:gap-6 ${isLight ? "hover:bg-zinc-50" : "hover:bg-white/5"}`}>
                      <span className={`text-sm font-medium sm:w-1/3 shrink-0 pr-4 ${isLight ? "text-zinc-500" : "text-gray-400"}`}>
                        {attr.label}
                      </span>
                      <span className={`text-sm font-medium sm:w-2/3 whitespace-pre-wrap break-words ${isLight ? "text-zinc-900" : "text-gray-100"}`}>
                        {attr.value}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className={`px-6 py-10 text-sm text-center font-medium ${isLight ? "text-zinc-500" : "text-gray-500"}`}>
                    {language === "tr" ? "Özellik bulunamadı." : "No specifications found."}
                  </div>
                )}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
