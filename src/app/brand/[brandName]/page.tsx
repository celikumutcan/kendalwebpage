import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/basePath";
import { products, getSlugByProductId } from "@/data/products";
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
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 z-0 bg-gradient-to-br ${isK2 ? "from-orange-700 via-orange-600 to-amber-500" : "from-blue-700 via-blue-600 to-cyan-500"}`}>
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-xl text-white">
            {isK2 ? "Profesyonel Aydınlatma Çözümleri" : "Ferah ve Serin Yaşam Alanları"}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
            {isK2 
              ? "K2 markası ile endüstriyel ve mimari aydınlatmada en yüksek kalite standartlarını sunuyoruz." 
              : "Vanti ile ev ve ofisleriniz için yenilikçi, modern ve güçlü vantilatör teknolojilerini keşfedin."}
          </p>
          <Link 
            href="/urunler" 
            className={`inline-flex items-center px-8 py-4 rounded-full bg-white font-medium transition-transform hover:scale-105 shadow-2xl ${isK2 ? "text-orange-600" : "text-blue-600"}`}
          >
            Ürünleri İncele
          </Link>
        </div>
      </section>

    </div>
  );
}
