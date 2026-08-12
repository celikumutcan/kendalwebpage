import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/basePath";
import { products, getSlugByProductId } from "@/data/products";
import CategoryFirstShowcase from "@/components/sections/CategoryFirstShowcase";
import { BrandProductsHeader } from "@/components/sections/BrandProductsHeader";

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

  return (
    <div className={`w-full text-zinc-900 min-h-screen py-12 px-6 ${isK2 ? "bg-orange-50/50" : brandName === "vanti" ? "bg-blue-50/50" : "bg-[#FFDA51]/10"}`}>
      <div className="max-w-7xl mx-auto">
        <BrandProductsHeader brandName={brandName} />

        <CategoryFirstShowcase products={allProducts} brandName={brandName} />
      </div>
    </div>
  );
}
