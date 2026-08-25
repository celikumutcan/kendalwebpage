"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getAssetPath } from "@/lib/basePath";
import { Product } from "@/data/products";
import { getProductCardUrl } from "@/components/sections/CategoryFirstShowcase/helpers";

interface ProductGridProps {
  label: string;
  title: string;
  products: Product[];
  language: string;
  brandName: string;
  accent: string;
  theme?: "dark" | "light";
}

// Static, non-scrolling showcase (mirrors Popular's sliding marquee with a
// fixed editorial grid instead) — product sits on a light "pedestal" plate,
// the caption lives on the page background underneath it rather than inside
// a card, so the two sections read as deliberately different, not
// inconsistent.
export function ProductGrid({ label, title, products, language, brandName, accent, theme = "dark" }: ProductGridProps) {
  if (products.length === 0) return null;
  const isDark = theme === "dark";
  const nameColor = isDark ? "text-white" : "text-zinc-900";
  const arrowColor = isDark ? "text-white/30" : "text-zinc-900/25";

  return (
    <section
      className="reveal-text relative z-10 w-full py-20 md:py-28 px-6 md:px-24"
      style={{ "--accent": accent } as CSSProperties}
    >
      <div className="mb-10 md:mb-14">
        <h3
          className="font-semibold tracking-widest mb-4 uppercase text-sm md:text-base text-[var(--accent)] border-l-2 pl-4"
          style={{ borderColor: accent }}
        >
          {label}
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-12 md:gap-y-16">
        {products.map((product) => {
          const lang = language === "en" ? "en" : "tr";
          const displayName = product.name[lang] || product.name.tr;
          const category = product.category?.[lang]?.[0] || product.category?.tr?.[0];
          const href = getProductCardUrl(product, brandName, false);

          return (
            <Link key={product.id} href={href} className="group block">
              <div className="relative aspect-square rounded-[1.75rem] bg-gradient-to-b from-zinc-50 to-white overflow-hidden shadow-[0_25px_50px_-15px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0_25px_60px_-10px_color-mix(in_srgb,var(--accent)_30%,transparent)]">
                <Image
                  src={getAssetPath("/images/" + product.image)}
                  alt={displayName}
                  fill
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className="object-contain p-8 md:p-10 group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  {category && (
                    <div
                      className="text-[10px] md:text-[11px] uppercase tracking-wider font-semibold mb-1 text-[var(--accent)]"
                    >
                      {category}
                    </div>
                  )}
                  <h4 className={`text-xs md:text-sm font-bold ${nameColor} leading-snug line-clamp-2`}>{displayName}</h4>
                </div>
                <svg
                  className={`w-4 h-4 shrink-0 mt-0.5 ${arrowColor} group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-300`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
