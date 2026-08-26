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

  if (brandName === "k2") {
    const K2_POPULAR_IDS = ["7803", "4535", "KES120", "KTL159", "KLF190", "KML400"];
    const K2_NEW_IDS = ["KST510", "KWL117", "KST303", "KES498", "KCL005_1", "KSL2431", "KST220", "KEL273L"];
    const popularProducts = K2_POPULAR_IDS.map(id => products[id]).filter(Boolean);
    const newProducts = K2_NEW_IDS.map(id => products[id]).filter(Boolean);

    return <K2CreativePage popularProducts={popularProducts} newProducts={newProducts} />;
  }

  if (brandName === "global") {
    const GLOBAL_POPULAR_IDS = ["4206", "KES171", "GES240", "KCL016", "GLF292", "KTL180"];
    const GLOBAL_NEW_IDS = ["GDL420", "KES172", "GES230", "KCL060", "GLF295", "KKP285A", "KDB271A", "KCL007"];
    const popularProducts = GLOBAL_POPULAR_IDS.map(id => products[id]).filter(Boolean);
    const newProducts = GLOBAL_NEW_IDS.map(id => products[id]).filter(Boolean);

    return <GlobalCreativePage popularProducts={popularProducts} newProducts={newProducts} />;
  }

  if (brandName === "vanti") {
    const VANTI_POPULAR_IDS = ["KCF298", "KCF291", "KCF295", "KCF273", "KSP100", "KCF700"];
    const VANTI_NEW_IDS = ["KCF306", "KCF301", "KCF282", "KCF280", "KCF299D", "KCF308", "KCF271", "KCF276"];
    const popularProducts = VANTI_POPULAR_IDS.map(id => products[id]).filter(Boolean);
    const newProducts = VANTI_NEW_IDS.map(id => products[id]).filter(Boolean);

    return <VantiCreativePage popularProducts={popularProducts} newProducts={newProducts} />;
  }

  return (
    <div className="w-full text-zinc-900 bg-zinc-50">
      <BrandHero brandName={brandName} />
    </div>
  );
}
