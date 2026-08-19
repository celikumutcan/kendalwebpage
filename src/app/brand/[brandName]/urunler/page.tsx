import React, { Suspense } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/basePath";
import { products, getSlugByProductId } from "@/data/products";
import CategoryFirstShowcase from "@/components/sections/CategoryFirstShowcase";
import { BrandProductsHeader } from "@/components/sections/BrandProductsHeader";

const BRAND_META: Record<string, { host: string; title: string; description: string }> = {
  k2: {
    host: "https://k2.kendalelektrik.com.tr",
    title: "Ürünlerimiz | K2 Led System",
    description: "K2 Led System'e ait tüm yerli üretim LED aydınlatma armatürlerini inceleyin.",
  },
  vanti: {
    host: "https://vanti.kendalelektrik.com.tr",
    title: "Ürünlerimiz | Vanti",
    description: "Vanti markasına ait tüm vantilatör ve havalandırma ürünlerini inceleyin.",
  },
  global: {
    host: "https://global.kendalelektrik.com.tr",
    title: "Ürünlerimiz | Kendal Global",
    description: "Kendal Global markasına ait tüm aydınlatma ve elektrik ürünlerini inceleyin.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ brandName: string }> }): Promise<Metadata> {
  const { brandName } = await params;
  const meta = BRAND_META[brandName] || BRAND_META.k2;

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `${meta.host}/urunler` },
  };
}

export function generateStaticParams() {
  return [
    { brandName: "k2" },
    { brandName: "vanti" },
    { brandName: "global" }
  ];
}

export default async function BrandProductsPage({
  params,
}: {
  params: Promise<{ brandName: string }>;
}) {
  const resolvedParams = await params;
  const { brandName } = resolvedParams;
  const isK2 = brandName === "k2";

  const allProducts = Object.values(products).filter(p => p.brand === brandName);

  const glowStrong = isK2 ? "bg-orange-300/30" : brandName === "vanti" ? "bg-blue-300/30" : "bg-[#FFDA51]/25";
  const glowSoft = isK2 ? "bg-amber-200/25" : brandName === "vanti" ? "bg-cyan-200/25" : "bg-yellow-200/20";

  return (
    <div className={`relative w-full text-zinc-900 min-h-screen py-12 px-6 overflow-hidden ${isK2 ? "bg-orange-50/50" : brandName === "vanti" ? "bg-blue-50/50" : "bg-[#FFDA51]/10"}`}>
      {/* Ambient background glows: fill the wide-viewport margins with brand-colored depth */}
      <div className={`absolute -top-32 -left-48 w-[560px] h-[560px] rounded-full blur-[140px] pointer-events-none z-0 ${glowStrong}`} />
      <div className={`absolute top-1/3 -right-56 w-[640px] h-[640px] rounded-full blur-[160px] pointer-events-none z-0 ${glowSoft}`} />
      <div className={`absolute bottom-0 left-1/4 w-[480px] h-[480px] rounded-full blur-[150px] pointer-events-none z-0 ${glowSoft}`} />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        <BrandProductsHeader brandName={brandName} />

        <Suspense fallback={<div className="py-24 text-center text-zinc-500">Ürünler Yükleniyor...</div>}>
          <CategoryFirstShowcase products={allProducts} brandName={brandName} isBrandScoped />
        </Suspense>
      </div>
    </div>
  );
}
