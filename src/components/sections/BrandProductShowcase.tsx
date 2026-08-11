"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/basePath";
import { Product, getSlugByProductId } from "@/data/products";

interface BrandProductShowcaseProps {
  products: Product[];
  brandName: string;
}

export default function BrandProductShowcase({ products, brandName }: BrandProductShowcaseProps) {
  const isK2 = brandName === "k2";
  
  // Extract unique top-level categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach(p => {
      if (p.category?.tr && p.category.tr.length > 0) {
        cats.add(p.category.tr[0]);
      }
    });
    return ["Tümü", ...Array.from(cats)];
  }, [products]);

  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Tümü") {
      return products;
    }
    return products.filter(p => p.category?.tr && p.category.tr[0] === selectedCategory);
  }, [products, selectedCategory]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(12); // Reset count on category change
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const activeColorClasses = isK2 
    ? "bg-red-600 text-white shadow-red-500/30 border-red-600" 
    : "bg-orange-500 text-white shadow-orange-500/30 border-orange-500";
    
  const inactiveColorClasses = "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md";

  return (
    <section id="urunler" className="py-24 px-6 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ürün Koleksiyonumuz</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">Size en uygun ürünleri bulmak için kategorilere göz atın.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-nowrap md:flex-wrap gap-3 overflow-x-auto pb-6 mb-8 scrollbar-hide snap-x justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`snap-center shrink-0 px-6 py-2.5 rounded-full font-medium transition-all duration-300 border shadow-sm flex items-center ${
                selectedCategory === cat ? activeColorClasses : inactiveColorClasses
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => {
            const slug = getSlugByProductId(product.id) || product.id;
            const categorySlug = "aydinlatma"; // Optional: make dynamic if needed
            const productUrl = `/urunler/${categorySlug}/${slug}`;

            return (
              <Link 
                href={productUrl} 
                key={product.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-zinc-100/80 flex flex-col"
              >
                <div className="relative aspect-square p-6 bg-white flex items-center justify-center border-b border-zinc-50 overflow-hidden">
                  <Image 
                    src={getAssetPath('/images/' + product.image)} 
                    alt={product.name.tr} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  {product.category?.tr && product.category.tr[0] && (
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-zinc-100 text-zinc-500 rounded backdrop-blur-md bg-white/80 border border-zinc-200">
                        {product.category.tr[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-xs font-medium text-zinc-400 mb-1">Model: {product.model}</div>
                    <h4 className="font-bold text-sm md:text-base mb-2 line-clamp-2 text-zinc-800" title={product.name.tr}>
                      {product.name.tr}
                    </h4>
                  </div>
                  <div className={`text-xs font-bold mt-4 flex items-center ${isK2 ? "text-red-600" : "text-orange-500"}`}>
                    İncele
                    <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        
        {displayedProducts.length === 0 && (
          <div className="text-center py-24 text-zinc-400">
            Bu kategoride ürün bulunamadı.
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-16">
            <button 
              onClick={handleLoadMore}
              className={`inline-block px-10 py-3.5 rounded-full border-2 font-medium transition-all duration-300 ${
                isK2 
                  ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/30" 
                  : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/30"
              }`}
            >
              Daha Fazla Gör
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
