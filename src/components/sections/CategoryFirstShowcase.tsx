"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/utils/basePath";
import { Product, getSlugByProductId } from "@/data/products";

interface CategoryFirstShowcaseProps {
  products: Product[];
  brandName: string;
}

export default function CategoryFirstShowcase({ products, brandName }: CategoryFirstShowcaseProps) {
  const isK2 = brandName === "k2";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Generate pagination array with ellipses
  const getVisiblePages = (current: number, total: number) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    
    if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
    if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    
    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  // Group products by category
  const categoriesData = useMemo(() => {
    const cats = new Map<string, { count: number; sampleImage: string }>();
    
    products.forEach(p => {
      if (p.category?.tr && p.category.tr.length > 0) {
        const topCat = p.category.tr[0];
        if (!cats.has(topCat)) {
          cats.set(topCat, { count: 1, sampleImage: p.image });
        } else {
          const existing = cats.get(topCat)!;
          existing.count += 1;
          cats.set(topCat, existing);
        }
      }
    });
    
    return Array.from(cats.entries()).map(([name, data]) => ({
      name,
      ...data
    }));
  }, [products]);

  // Auto-select if there is only 1 category
  const activeCategory = selectedCategory || (categoriesData.length === 1 ? categoriesData[0].name : null);
  const showBackButton = categoriesData.length > 1;

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (!activeCategory) return [];
    return products.filter(p => p.category?.tr && p.category.tr[0] === activeCategory);
  }, [products, activeCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  const activeColorClasses = isK2 
    ? "bg-orange-500 text-white shadow-orange-500/30 border-orange-500" 
    : "bg-blue-600 text-white shadow-blue-500/30 border-blue-600";

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* VIEW 1: CATEGORY CARDS */}
        {!activeCategory && (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoriesData.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-zinc-100 hover:shadow-2xl transition-all duration-500 text-left h-64 flex flex-col justify-end"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  
                  {/* Background Image (blurred/zoomed slightly) */}
                  <Image 
                    src={getAssetPath('/images/' + cat.sampleImage)} 
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                  />
                  
                  <div className="relative z-20 p-8">
                    <div className="mb-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider ${isK2 ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'}`}>
                        {cat.count} Ürün
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:-translate-y-1 transition-transform duration-300">
                      {cat.name}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: PRODUCT GRID FOR SELECTED CATEGORY */}
        {activeCategory && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-12">
              <div>
                {showBackButton && (
                  <button 
                    onClick={handleBack}
                    className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-4 group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kategorilere Dön
                  </button>
                )}
                <h2 className="text-3xl md:text-4xl font-bold">{activeCategory}</h2>
                <p className="text-zinc-500 mt-2">{filteredProducts.length} adet ürün bulundu.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {displayedProducts.map((product) => {
                const slug = getSlugByProductId(product.id) || product.id;
                
                const slugify = (text: string) => text.toLowerCase().replace(/ı/g, 'i').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const categoryName = product.category?.tr?.[0];
                const categorySlug = categoryName ? slugify(categoryName) : (isK2 ? "aydinlatma" : "vantilator");
                
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
                    </div>
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="text-xs font-medium text-zinc-400 mb-1">Model: {product.model}</div>
                        <h4 className="font-bold text-sm md:text-base mb-2 line-clamp-2 text-zinc-800" title={product.name.tr}>
                          {product.name.tr}
                        </h4>
                      </div>
                      <div className={`text-xs font-bold mt-4 flex items-center ${isK2 ? "text-orange-500" : "text-blue-500"}`}>
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                {getVisiblePages(currentPage, totalPages).map((pageNum, i) => {
                  if (pageNum === '...') {
                    return <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-zinc-400">...</span>;
                  }
                  
                  return (
                    <button 
                      key={i} 
                      onClick={() => {
                        setCurrentPage(pageNum as number);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                        currentPage === pageNum 
                          ? (isK2 ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "bg-blue-600 text-white shadow-lg shadow-blue-500/30")
                          : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
