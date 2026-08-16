import React from "react";
import { products } from "@/data/products";
import { BrandHero } from "@/components/sections/BrandHero";
import { K2CreativePage } from "@/components/brand/k2/K2CreativePage";
import { GlobalCreativePage } from "@/components/brand/global/GlobalCreativePage";
import { VantiCreativePage } from "@/components/brand/vanti/VantiCreativePage";

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
