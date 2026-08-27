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

  const ringClass = isK2 ? "group-hover:ring-orange-400/60" : isVanti ? "group-hover:ring-blue-400/60" : "group-hover:ring-amber-300/60";
  const ctaClass = isK2 ? "bg-orange-600 group-hover:bg-orange-700" : isVanti ? "bg-blue-600 group-hover:bg-blue-700" : "bg-zinc-900 group-hover:bg-zinc-800";

  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className={`animate-in fade-in slide-in-from-bottom-3 fill-mode-both group relative overflow-hidden rounded-[1.5rem] bg-zinc-900 ring-1 ring-transparent ${ringClass} hover:-translate-y-1.5 shadow-sm hover:shadow-[0_25px_50px_-18px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out text-left flex flex-col justify-end h-[240px]`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5 z-10 transition-all duration-500 group-hover:via-black/45" />

      <Image
        src={getAssetPath('/images/' + sampleImage)}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center z-0 transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="relative z-20 flex items-end justify-between gap-3 p-6">
        <h3 className="font-bold text-white leading-snug text-lg">
          {displayName}
        </h3>
        <span className={`flex-shrink-0 w-9 h-9 rounded-full text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 ease-out shadow-lg ${ctaClass}`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </button>
  );
}
