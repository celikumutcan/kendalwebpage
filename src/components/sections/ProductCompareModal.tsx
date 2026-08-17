"use client";

import React, { useMemo } from "react";
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
      <ul className="space-y-1.5">
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
  const accentSoft = isK2 ? "bg-orange-50" : isVanti ? "bg-blue-50" : "bg-yellow-50";
  const accentText = isK2 ? "text-orange-600" : isVanti ? "text-blue-600" : "text-yellow-700";
  const accentBorder = isK2 ? "border-orange-100" : isVanti ? "border-blue-100" : "border-yellow-100";
  const accentGradient = isK2 ? "from-orange-50" : isVanti ? "from-blue-50" : "from-yellow-50";

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

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-[1.75rem] w-full max-w-6xl max-h-[90vh] flex flex-col shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] border border-zinc-100 ring-1 ring-black/[0.02] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-zinc-100 flex-shrink-0">
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accentSoft} ${accentText}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v18M15 3v18M4 8h5M4 16h5M15 8h5M15 16h5" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-zinc-900 tracking-tight leading-tight">{texts.modal_title}</h3>
              <p className="text-xs text-zinc-400 mt-0.5">{items.length} ürün karşılaştırılıyor</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 text-zinc-400 hover:text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-full transition-colors flex-shrink-0">
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-200 px-4 md:px-6 pb-6">
          <table className="w-full text-sm border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky left-0 top-0 z-20 bg-white w-32 min-w-[8rem]" />
                {items.map(({ product, url }) => {
                  const displayName = product.name[language as keyof typeof product.name] || product.name.tr;
                  return (
                    <th key={product.id} className="sticky top-0 z-10 bg-white align-bottom pt-5 px-2.5 pb-4 min-w-[210px]">
                      <div className={`relative rounded-2xl border ${accentBorder} bg-gradient-to-b ${accentGradient} to-white p-4 shadow-sm`}>
                        <button
                          onClick={() => onRemove(product.id)}
                          className="absolute -top-2.5 -right-2.5 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-700 hover:border-zinc-300 shadow-sm transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="relative aspect-square w-full max-w-[140px] mx-auto mb-3.5 bg-white rounded-xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.15)]">
                          <Image
                            src={getAssetPath("/images/" + product.image)}
                            alt={displayName}
                            fill
                            sizes="200px"
                            className="object-contain p-3"
                          />
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1 text-left">
                          {texts.model} {product.model}
                        </div>
                        <div className="font-bold text-zinc-900 text-sm leading-snug mb-3 text-left line-clamp-2 min-h-[2.5em]" title={displayName}>
                          {displayName}
                        </div>
                        <Link
                          href={url}
                          className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-bold ${accentSolid} ${accentSolidHover} ${accentSolidText} shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md`}
                        >
                          {texts.view}
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {attributeRows.map((row, i) => (
                <tr key={row.label} className={`group transition-colors ${i % 2 === 0 ? "bg-zinc-50/60" : "bg-white"} hover:bg-zinc-100/60`}>
                  <td className="sticky left-0 z-10 bg-inherit p-4 align-top whitespace-normal">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">{row.label}</span>
                  </td>
                  {row.values.map((value, j) => (
                    <td key={j} className="p-4 text-zinc-700 align-top text-xs md:text-sm leading-relaxed border-l border-zinc-100/80">
                      {renderValue(value, texts.no_value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    document.body
  );
}
