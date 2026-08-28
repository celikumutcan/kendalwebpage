"use client";

import Image from "next/image";
import { getAssetPath } from "@/lib/basePath";

interface CategoryCardProps {
  alt: string;
  displayName: string;
  sampleImage: string;
  index?: number;
  brandName: string;
  onClick: () => void;
}

export function CategoryCard({ alt, displayName, sampleImage, index = 0, brandName, onClick }: CategoryCardProps) {
  const isK2 = brandName === "k2";
  const isVanti = brandName === "vanti";

  const ringClass = isK2 ? "group-hover:ring-orange-400/70" : isVanti ? "group-hover:ring-blue-400/70" : "group-hover:ring-amber-300/70";
  const arrowClass = isK2 ? "text-orange-500" : isVanti ? "text-blue-600" : "text-amber-600";

  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className={`animate-in fade-in slide-in-from-bottom-3 fill-mode-both group relative flex flex-col overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-zinc-100 ${ringClass} shadow-sm hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out text-left`}
    >
      <div className="relative aspect-[4/3] bg-zinc-50 overflow-hidden">
        <Image
          src={getAssetPath('/images/' + sampleImage)}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain object-center p-8 transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-zinc-100">
        <h3 className="font-bold text-zinc-900 leading-snug text-base truncate">
          {displayName}
        </h3>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 ${arrowClass}`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </button>
  );
}
