"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Product } from "@/data/products";
import { getAssetPath } from "@/lib/basePath";

interface VantiProductFamiliesProps {
  label: string;
  title: string;
  allProducts: Product[];
  language: string;
}

interface FamilyDef {
  key: string;
  nameTr: string;
  nameEn: string;
  query: string;
  productId: string;
}

const FAMILIES: FamilyDef[] = [
  { key: "tavan", nameTr: "Tavan Vantilatörleri", nameEn: "Ceiling Fans", query: "tavan vanti", productId: "KCF306" },
  { key: "sanayi", nameTr: "Sanayi Tipi Vantilatörler", nameEn: "Industrial Fans", query: "sanayi", productId: "KCF291" },
  { key: "ayakli", nameTr: "Ayaklı Vantilatörler", nameEn: "Stand Fans", query: "ayakl", productId: "KCF272L" },
  { key: "duvar", nameTr: "Duvar Tipi Vantilatörler", nameEn: "Wall Fans", query: "duvar ti", productId: "KCF299D" },
  { key: "masaustu", nameTr: "Masaüstü Fanlar", nameEn: "Desktop Fans", query: "masaüstü", productId: "KCF295" },
  { key: "sarjli", nameTr: "Şarjlı El Vantilatörleri", nameEn: "Rechargeable Hand Fans", query: "şarj", productId: "KCF700" },
  { key: "banyo", nameTr: "Banyo Aspiratörleri", nameEn: "Bathroom Extractor Fans", query: "banyo", productId: "KSP120" },
];

export function VantiProductFamilies({ label, title, allProducts, language }: VantiProductFamiliesProps) {
  const lang = language === "en" ? "en" : "tr";
  const catalogBase = process.env.NODE_ENV === "production" ? "/brand/vanti/urunler" : "/urunler";

  const families = useMemo(() => {
    return FAMILIES.map((f) => {
      const q = f.query.toLowerCase();
      const count = allProducts.filter((p) => {
        const model = (p.model || "").toLowerCase();
        const name = (p.name?.tr || "").toLowerCase();
        return model.includes(q) || name.includes(q);
      }).length;
      const rep = allProducts.find((p) => p.id === f.productId);
      return { ...f, count, image: rep?.image };
    }).filter((f) => f.count > 0 && f.image);
  }, [allProducts]);

  if (families.length === 0) return null;

  return (
    <section className="reveal-text relative z-10 w-full px-6 md:px-24 py-12 md:py-16">
      <div className="mb-10 md:mb-14 inline-block bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[2rem] px-6 py-5 md:px-10 md:py-7">
        <h3 className="font-medium tracking-[0.2em] mb-4 uppercase text-lg text-teal-700 flex items-center gap-4">
          <span className="w-16 h-[1px] bg-teal-600 block"></span>
          {label}
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-teal-950">{title}</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {families.map((f) => (
          <Link
            key={f.key}
            href={`${catalogBase}?q=${encodeURIComponent(f.query)}`}
            className="group relative flex flex-col bg-white/70 backdrop-blur-xl border border-white/60 rounded-[1.75rem] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(15,118,110,0.18)] hover:-translate-y-1 transition-all duration-500"
          >
            <div className="relative aspect-square bg-sky-50/60">
              <Image
                src={getAssetPath("/images/" + f.image)}
                alt={lang === "en" ? f.nameEn : f.nameTr}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>
            <div className="p-4 md:p-5 flex items-center justify-between gap-2">
              <h4 className="font-bold text-sm md:text-base leading-snug text-teal-950">
                {lang === "en" ? f.nameEn : f.nameTr}
              </h4>
              <svg
                className="w-4 h-4 shrink-0 text-teal-700/40 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
