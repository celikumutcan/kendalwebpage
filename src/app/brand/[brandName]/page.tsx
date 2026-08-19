import React from "react";
import { Metadata } from "next";
import { products } from "@/data/products";
import { BrandHero } from "@/components/sections/BrandHero";
import { K2CreativePage } from "@/components/brand/k2/K2CreativePage";
import { GlobalCreativePage } from "@/components/brand/global/GlobalCreativePage";
import { VantiCreativePage } from "@/components/brand/vanti/VantiCreativePage";

const BRAND_META: Record<string, { host: string; title: string; description: string }> = {
  k2: {
    host: "https://k2.kendalelektrik.com.tr",
    title: "K2 Led System | Yerli Üretim LED Aydınlatma",
    description: "K2 Led System, Kendal Elektrik güvencesiyle yerli üretim LED aydınlatma armatürleri ve ürün gamı.",
  },
  vanti: {
    host: "https://vanti.kendalelektrik.com.tr",
    title: "Vanti | Kendal Elektrik Vantilatör Ürünleri",
    description: "Vanti, Kendal Elektrik güvencesiyle üretilen vantilatör ve havalandırma ürünleri markasıdır.",
  },
  global: {
    host: "https://global.kendalelektrik.com.tr",
    title: "Kendal Global | Aydınlatma ve Elektrik Ürünleri",
    description: "Kendal Global, Kendal Elektrik'in uluslararası pazarlara yönelik aydınlatma ve elektrik ürünleri markasıdır.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ brandName: string }> }): Promise<Metadata> {
  const { brandName } = await params;
  const meta = BRAND_META[brandName] || BRAND_META.k2;

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.host },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: meta.host,
    },
  };
}

// Server component
export function generateStaticParams() {
  return [
    { brandName: "k2" },
    { brandName: "vanti" },
    { brandName: "global" }
  ];
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brandName: string }>;
}) {
  const resolvedParams = await params;
  const { brandName } = resolvedParams;
  
  const allProducts = Object.values(products).filter(p => p.brand === brandName);

  if (brandName === "k2") {
    // Return the new creative GSAP page for K2
    return <K2CreativePage products={allProducts} />;
  }
  
  if (brandName === "global") {
    return <GlobalCreativePage products={allProducts} />;
  }

  if (brandName === "vanti") {
    return <VantiCreativePage products={allProducts} />;
  }

  // Regular page for Vanti and Global
  return (
    <div className="w-full text-zinc-900 bg-zinc-50">
      {/* HERO SECTION */}
      <BrandHero brandName={brandName} />
    </div>
  );
}
