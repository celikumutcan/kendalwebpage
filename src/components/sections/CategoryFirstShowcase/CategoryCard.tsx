"use client";

import Image from "next/image";
import { getAssetPath } from "@/lib/basePath";

interface CategoryCardProps {
  alt: string;
  displayName: string;
  sampleImage: string;
  onClick: () => void;
}

export function CategoryCard({ alt, displayName, sampleImage, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-zinc-100 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-all duration-300 text-left h-[280px] flex flex-col justify-end"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

      <Image
        src={getAssetPath('/images/' + sampleImage)}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center opacity-100 z-0 transition-transform duration-700 group-hover:scale-105"
      />

      <div className="relative z-20 p-8">
        <h3 className="text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors duration-300">
          {displayName}
        </h3>
      </div>
    </button>
  );
}
