"use client";

import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/basePath";
import { Product } from "@/data/products";

export interface CompareTexts {
  modal_title: string;
  view: string;
  model: string;
  no_value: string;
}

interface CompareItem {
  product: Product;
  url: string;
}

interface ProductCompareModalProps {
  items: CompareItem[];
  language: string;
  brandName: string;
  texts: CompareTexts;
  onClose: () => void;
  onRemove: (id: string) => void;
}

function renderValue(value: string | null, noValueLabel: string) {
  if (!value) {
    return <span className="text-zinc-300">{noValueLabel}</span>;
  }
  if (value.includes(" / ")) {
    const parts = value.split(" / ").map((s) => s.trim()).filter(Boolean);
    return (
      <ul className="space-y-1.5 mx-auto w-fit text-left">
        {parts.map((part, i) => (
          <li key={i} className="flex items-start gap-1.5">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-300 flex-shrink-0" />
            <span>{part}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <span>{value}</span>;
}

export default function ProductCompareModal({ items, language, brandName, texts, onClose, onRemove }: ProductCompareModalProps) {
  const isK2 = brandName === "k2";
  const isVanti = brandName === "vanti";

  const accentSolid = isK2 ? "bg-orange-500" : isVanti ? "bg-blue-600" : "bg-[#FFDA51]";
  const accentSolidHover = isK2 ? "hover:bg-orange-600" : isVanti ? "hover:bg-blue-700" : "hover:bg-[#e6c449]";
  const accentSolidText = isK2 || isVanti ? "text-white" : "text-zinc-900";
  const accentBorder = isK2 ? "border-orange-100" : isVanti ? "border-blue-100" : "border-yellow-100";
  const accentGradient = isK2 ? "from-orange-50" : isVanti ? "from-blue-50" : "from-yellow-50";
  // Each attribute row cycles through a distinct color (not just a single
  // brand tint alternating with white), so e.g. "Motor Gücü" and "Gerilim"
  // are immediately distinguishable from one another, not just from every
  // other row.
  const rowPalette = [
    { bg: "bg-amber-50/70", dot: "bg-amber-500", text: "text-amber-700" },
    { bg: "bg-rose-50/70", dot: "bg-rose-500", text: "text-rose-700" },
    { bg: "bg-blue-50/70", dot: "bg-blue-500", text: "text-blue-700" },
    { bg: "bg-emerald-50/70", dot: "bg-emerald-500", text: "text-emerald-700" },
    { bg: "bg-purple-50/70", dot: "bg-purple-500", text: "text-purple-700" },
    { bg: "bg-cyan-50/70", dot: "bg-cyan-500", text: "text-cyan-700" },
    { bg: "bg-orange-50/70", dot: "bg-orange-500", text: "text-orange-700" },
    { bg: "bg-pink-50/70", dot: "bg-pink-500", text: "text-pink-700" },
  ];
  // Fixed pixel column tracks (not 1fr) so the grid's own width is exactly
  // N * column-width, letting the modal shrink-wrap (w-fit) to the content
  // instead of stretching to fill leftover space.
  const gridColsClass = items.length >= 3
    ? "grid-cols-[repeat(3,260px)] md:grid-cols-[repeat(3,300px)]"
    : "grid-cols-[repeat(2,260px)] md:grid-cols-[repeat(2,300px)]";

  const attributeRows = useMemo(() => {
    const labels: string[] = [];
    const seen = new Set<string>();

    items.forEach(({ product }) => {
      const attrs = product.attributes?.[language as keyof typeof product.attributes] || product.attributes?.tr || [];
      attrs.forEach((attr) => {
        if (!seen.has(attr.label)) {
          seen.add(attr.label);
          labels.push(attr.label);
        }
      });
    });

    return labels.map((label) => ({
      label,
      values: items.map(({ product }) => {
        const attrs = product.attributes?.[language as keyof typeof product.attributes] || product.attributes?.tr || [];
        const found = attrs.find((a) => a.label === label);
        return found ? found.value : null;
      }),
    }));
  }, [items, language]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8" data-lenis-prevent>
      <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-[2rem] w-fit max-w-[calc(100vw-2rem)] max-h-[94vh] flex flex-col shadow-[0_50px_120px_-20px_rgba(0,0,0,0.45)] border border-zinc-100 ring-1 ring-black/[0.02] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        <div className="relative flex items-center justify-center px-6 md:px-10 py-6 md:py-7 border-b border-zinc-100 flex-shrink-0">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight">{texts.modal_title}</h3>
            <p className="text-sm text-zinc-400 mt-1">{items.length} ürün karşılaştırılıyor</p>
          </div>
          <button onClick={onClose} className="absolute right-5 md:right-8 p-3 text-zinc-400 hover:text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-full transition-colors flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-200 px-5 md:px-8 pb-8">
          <div className="w-fit mx-auto">
            {/* Product cards */}
            <div className={`sticky top-0 z-10 bg-white grid gap-3 pt-6 pb-5 ${gridColsClass}`}>
              {items.map(({ product, url }) => {
                const displayName = product.name[language as keyof typeof product.name] || product.name.tr;
                return (
                  <div key={product.id} className={`relative rounded-3xl border ${accentBorder} bg-gradient-to-b ${accentGradient} to-white p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]`}>
                    <button
                      onClick={() => onRemove(product.id)}
                      className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-700 hover:border-zinc-300 shadow-sm transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="relative aspect-square w-full max-w-[220px] mx-auto mb-5 bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_-4px_rgba(0,0,0,0.15)]">
                      <Image
                        src={getAssetPath("/images/" + product.image)}
                        alt={displayName}
                        fill
                        sizes="280px"
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 text-left">
                      {texts.model} {product.model}
                    </div>
                    <div className="font-bold text-zinc-900 text-base leading-snug mb-4 text-left line-clamp-2 min-h-[2.6em]" title={displayName}>
                      {displayName}
                    </div>
                    <div className="text-center">
                      <Link
                        href={url}
                        className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold ${accentSolid} ${accentSolidHover} ${accentSolidText} shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md`}
                      >
                        {texts.view}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Attribute rows: one shared label per row, plus a divider that
                runs the full height of the group (label + values), not just
                the value strip — a colspan-style single label cell can't
                carry per-column borders through itself, so this uses a
                position:relative group with an absolutely-positioned overlay
                grid (same column template) to draw continuous divider lines. */}
            {attributeRows.map((row, i) => {
              const palette = rowPalette[i % rowPalette.length];
              return (
              <div key={row.label} className={`relative ${palette.bg}`}>
                <div className="flex justify-center pt-4 pb-2">
                  <span className="inline-flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${palette.dot} flex-shrink-0`} />
                    <span className={`text-sm md:text-base font-extrabold uppercase tracking-wider ${palette.text}`}>{row.label}</span>
                  </span>
                </div>
                <div className={`grid gap-3 pb-4 ${gridColsClass}`}>
                  {row.values.map((value, j) => (
                    <div key={j} className="px-1 text-center text-zinc-700 text-sm md:text-base leading-relaxed">
                      {renderValue(value, texts.no_value)}
                    </div>
                  ))}
                </div>
                <div className={`absolute inset-0 pointer-events-none grid gap-3 ${gridColsClass}`}>
                  {items.map((item, idx) => (
                    <div key={item.product.id} className={idx > 0 ? "border-l-2 border-zinc-200" : ""} />
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
