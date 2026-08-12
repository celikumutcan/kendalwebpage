import React from "react";
import CategoryFirstShowcase from "@/components/sections/CategoryFirstShowcase";
import { products } from "@/data/products";

export default function GlobalUrunlerPage() {
  const allProducts = Object.values(products);

  return (
    <div className="w-full text-zinc-900 min-h-screen py-12 px-6 bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Tüm Ürünlerimiz</h1>
          <p className="text-zinc-500 max-w-2xl mx-auto">Kendal Elektrik, K2 ve Vanti markalarımıza ait tüm aydınlatma ve elektrik ürünlerini inceleyebilirsiniz.</p>
        </div>
        <CategoryFirstShowcase products={allProducts} brandName="global" />
      </div>
    </div>
  );
}
