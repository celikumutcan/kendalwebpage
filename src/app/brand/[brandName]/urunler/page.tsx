import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/basePath";
import { products, getSlugByProductId } from "@/data/products";
import CategoryFirstShowcase from "@/components/sections/CategoryFirstShowcase";
export function generateStaticParams() {
  return [
    { brandName: "k2" },
    { brandName: "vanti" }
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
    <div className={`w-full text-zinc-900 min-h-screen py-12 px-6 ${isK2 ? "bg-orange-50/50" : "bg-blue-50/50"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tüm Ürünlerimiz
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            {isK2 
              ? "K2 LED SYSTEMS güvencesiyle sunduğumuz tüm aydınlatma ürünlerini aşağıdan inceleyebilirsiniz."
              : "VANTİ ile yaşam alanlarınıza değer katan tüm ürünlerimiz."}
          </p>
        </div>

        <CategoryFirstShowcase products={allProducts} brandName={brandName} />
      </div>
    </div>
  );
}
