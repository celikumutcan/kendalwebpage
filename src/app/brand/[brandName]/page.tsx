import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/basePath";
import { products, getSlugByProductId } from "@/data/products";
import { BrandAbout } from "@/components/sections/BrandAbout";
import { BrandHero } from "@/components/sections/BrandHero";
// Server component
export function generateStaticParams() {
  return [
    { brandName: "k2" },
    { brandName: "vanti" }
  ];
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brandName: string }>;
}) {
  const resolvedParams = await params;
  const { brandName } = resolvedParams;
  const isK2 = brandName === "k2";

  const brandColor = isK2 ? "bg-[var(--brand-red, #E60000)]" : "bg-[#FF6600]";
  const brandTextColor = isK2 ? "text-[var(--brand-red, #E60000)]" : "text-[#FF6600]";

  const allProducts = Object.values(products).filter(p => p.brand === brandName);

  return (
    <div className="w-full text-zinc-900 bg-zinc-50">
      {/* HERO SECTION */}
      <BrandHero brandName={brandName} />

      <BrandAbout brandName={brandName} />
    </div>
  );
}
