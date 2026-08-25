"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getAssetPath } from "@/lib/basePath";
import { Product } from "@/data/products";
import { getProductCardUrl } from "@/components/sections/CategoryFirstShowcase/helpers";

interface ProductCarouselProps {
  label: string;
  title: string;
  products: Product[];
  language: string;
  modelLabel: string;
  viewLabel: string;
  brandName: string;
  accent: string;
  align?: "left" | "right";
}

export function ProductCarousel({
  label,
  title,
  products,
  language,
  modelLabel,
  viewLabel,
  brandName,
  accent,
  align = "left",
}: ProductCarouselProps) {
  if (products.length === 0) return null;

  // Doubled track + translateX(-50%) loop = seamless infinite scroll with
  // pure CSS (see .k2-marquee-track in globals.css). Duration scales with
  // item count so both rows drift at roughly the same visual speed.
  const duration = Math.max(24, products.length * 5.5);
  const loopProducts = [...products, ...products];

  return (
    <section
      className="reveal-text relative z-10 w-full py-20 md:py-28 overflow-hidden"
      style={{ "--accent": accent } as CSSProperties}
    >
      <div className={`mb-10 md:mb-14 px-6 md:px-24 ${align === "right" ? "text-right" : ""}`}>
        <h3
          className={`font-semibold tracking-widest mb-4 uppercase text-sm md:text-base text-[var(--accent)] ${
            align === "right" ? "border-r-2 pr-4 inline-block" : "border-l-2 pl-4"
          }`}
          style={{ borderColor: accent }}
        >
          {label}
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h2>
      </div>

      <div className="k2-marquee-pause relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[var(--page-bg,#0a0a0b)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[var(--page-bg,#0a0a0b)] to-transparent z-10" />

        <div className="overflow-hidden motion-reduce:overflow-x-auto">
          <div
            className={`k2-marquee-track flex w-max gap-6 md:gap-8 ${align === "right" ? "k2-marquee-reverse" : ""}`}
            style={{ animationDuration: `${duration}s` }}
          >
            {loopProducts.map((product, i) => {
              const lang = language === "en" ? "en" : "tr";
              const displayName = product.name[lang] || product.name.tr;
              const category = product.category?.[lang]?.[0] || product.category?.tr?.[0];
              const href = getProductCardUrl(product, brandName, false);

              return (
                <Link
                  key={`${product.id}-${i}`}
                  href={href}
                  tabIndex={i < products.length ? 0 : -1}
                  aria-hidden={i >= products.length}
                  className="group shrink-0 w-[240px] sm:w-[300px] md:w-[340px] bg-white text-zinc-900 rounded-3xl overflow-hidden border border-black/5 shadow-2xl shadow-black/40 hover:shadow-[0_25px_50px_-12px_color-mix(in_srgb,var(--accent)_25%,transparent)] hover:-translate-y-2 transition-all duration-500 flex flex-col"
                >
                  <div className="relative aspect-square bg-zinc-50 overflow-hidden">
                    {category && (
                      <span
                        className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider shadow-sm"
                        style={{ color: accent }}
                      >
                        {category}
                      </span>
                    )}
                    <Image
                      src={getAssetPath("/images/" + product.image)}
                      alt={displayName}
                      fill
                      sizes="(max-width: 640px) 60vw, (max-width: 1024px) 35vw, 340px"
                      className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-medium text-zinc-400 mb-1.5">
                      {modelLabel} {product.model}
                    </div>
                    <h4 className="font-bold text-base leading-snug mb-4 line-clamp-2">{displayName}</h4>
                    <div
                      className="mt-auto inline-flex items-center gap-1.5 self-start px-4 py-2 rounded-full bg-zinc-900 text-white text-xs font-bold uppercase tracking-wide transition-colors duration-300 group-hover:bg-[var(--accent)]"
                    >
                      {viewLabel}
                      <svg
                        className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
