"use client";

import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/lib/basePath";
import { Product } from "@/data/products";
import { getProductCardUrl } from "./helpers";

function stripVariantTokens(name: string): string {
  const words = name.trim().split(' ');
  return words.filter((w) => {
    const upper = w.toUpperCase();
    if (upper.match(/^\d+W$/i)) return false;
    if (upper.match(/^\d{3,5}K$/i)) return false;
    if (['SARI', 'BEYAZ', 'ARARENK', 'GÜNIŞIĞI', 'MAVİ', 'YEŞİL', 'KIRMIZI', 'AMBER', 'GÜN', 'IŞIĞI', 'CCT'].includes(upper)) return false;
    if (upper.match(/^(E14|E27|GU10|G9|R7S)$/i)) return false;
    if (upper.match(/^\d+[*xX]\d+$/)) return false;
    return true;
  }).join(' ');
}

interface ProductCardTexts {
  model: string;
  view: string;
}

interface CompareTexts {
  add: string;
  added: string;
  max_reached: string;
}

interface ProductCardProps {
  product: Product;
  language: string;
  brandName: string;
  isBrandRoute: boolean;
  isK2: boolean;
  isGlobal: boolean;
  showcaseTexts: ProductCardTexts;
  canCompare: boolean;
  isCompared: boolean;
  isCompareMaxed: boolean;
  compareTexts: CompareTexts;
  onToggleCompare: (product: Product) => void;
}

export function ProductCard({
  product,
  language,
  brandName,
  isBrandRoute,
  isK2,
  isGlobal,
  showcaseTexts,
  canCompare,
  isCompared,
  isCompareMaxed,
  compareTexts,
  onToggleCompare,
}: ProductCardProps) {
  const productUrl = getProductCardUrl(product, brandName, isBrandRoute);

  let displayName = product.name[language as keyof typeof product.name] || product.name.tr;
  if (isGlobal) {
    displayName = stripVariantTokens(displayName);
  }

  return (
    <Link
      href={productUrl}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-zinc-100/80 flex flex-col relative"
    >
      <div className="relative aspect-square p-6 bg-white flex items-center justify-center border-b border-zinc-50 overflow-hidden">
        {canCompare && (
          <button
            type="button"
            title={isCompareMaxed ? compareTexts.max_reached : compareTexts.add}
            disabled={isCompareMaxed}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleCompare(product); }}
            className={`absolute top-3 left-3 z-20 flex items-center gap-1.5 pl-1.5 pr-2.5 py-1.5 rounded-full text-[11px] font-bold border shadow-sm transition-all duration-200 ${
              isCompared
                ? (isK2 ? "bg-orange-500 border-orange-500 text-white" : brandName === "vanti" ? "bg-blue-600 border-blue-600 text-white" : "bg-[#FFDA51] border-[#FFDA51] text-zinc-900")
                : isCompareMaxed
                  ? "bg-white/80 border-zinc-200 text-zinc-300 cursor-not-allowed"
                  : "bg-white/90 backdrop-blur-sm border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"
            }`}
          >
            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 ${isCompared ? "bg-white/25 border-white/60" : "border-zinc-300"}`}>
              {isCompared && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            {isCompared ? compareTexts.added : compareTexts.add}
          </button>
        )}
        <Image
          src={getAssetPath('/images/' + product.image)}
          alt={displayName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="text-xs font-medium text-zinc-400 mb-1">{showcaseTexts.model} {product.model}</div>
          <h4 className="font-bold text-sm md:text-base mb-2 line-clamp-2 text-zinc-800" title={displayName}>
            {displayName}
          </h4>
        </div>

        <div className={`text-xs font-bold mt-4 flex items-center ${isK2 ? "text-orange-500" : "text-blue-500"}`}>
          {showcaseTexts.view}
          <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
