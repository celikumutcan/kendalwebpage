"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAssetPath } from "@/utils/basePath";
import { Product, getSlugByProductId } from "@/data/products";
import { useLanguage } from "@/app/i18n/LanguageProvider";

interface CategoryFirstShowcaseProps {
  products: Product[];
  brandName: string;
}

export default function CategoryFirstShowcase({ products, brandName }: CategoryFirstShowcaseProps) {
  const pathname = usePathname() || "";
  const isBrandRoute = pathname.includes("/brand/");
  
  const { t, language } = useLanguage();
  const showcaseTexts = (t as any).brand_pages?.showcase || {
    product_count: "Ürün",
    back_to_categories: "Kategorilere Dön",
    products_found: "adet ürün bulundu.",
    view: "İncele",
    model: "Model:",
    search_placeholder: "Ürün adı veya model kodu ile arayın...",
    search_results_title: "Arama Sonuçları",
    search_for: "için",
    search_no_results_title: "Sonuç Bulunamadı",
    search_no_results_desc: "Aradığınız kriterlere uygun ürün bulamadık. Lütfen farklı kelimelerle tekrar deneyin."
  };

  const isK2 = brandName === "k2";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
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
    const cats = new Map<string, { count: number; sampleImage: string; uniqueModels: Set<string> }>();
    
    products.forEach(p => {
      if (p.category?.tr && p.category.tr.length > 0) {
        const topCat = p.category.tr[0];
        const baseModel = (p.name.tr || "").split(' ')[0];

        if (!cats.has(topCat)) {
          cats.set(topCat, { count: 1, sampleImage: p.image, uniqueModels: new Set([baseModel]) });
        } else {
          const existing = cats.get(topCat)!;
          if (!existing.uniqueModels.has(baseModel)) {
            existing.uniqueModels.add(baseModel);
            existing.count += 1;
          }
          cats.set(topCat, existing);
        }
      }
    });
    
    return Array.from(cats.entries()).map(([name, data]) => ({
      name,
      count: data.count,
      sampleImage: data.sampleImage
    }));
  }, [products]);

  // Auto-select if there is only 1 category
  const activeCategory = selectedCategory || (categoriesData.length === 1 ? categoriesData[0].name : null);
  const showBackButton = categoriesData.length > 1;

  // Filter products by selected category and group them by base model
  const filteredProducts = useMemo(() => {
    if (!activeCategory) return [];
    const categoryProducts = products.filter(p => p.category?.tr && p.category.tr[0] === activeCategory);
    
    // Group products by their base model (first word of name, e.g. "GDL414" from "GDL414 25W...")
    const uniqueGroups = new Map<string, Product>();
    for (const p of categoryProducts) {
      const baseModel = (p.name.tr || "").split(' ')[0];
      if (!uniqueGroups.has(baseModel)) {
        uniqueGroups.set(baseModel, p);
      }
    }
    
    return Array.from(uniqueGroups.values());
  }, [products, activeCategory]);

  const searchedProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    
    const uniqueGroups = new Map<string, Product>();
    
    for (const p of products) {
      const model = (p.model || "").toLowerCase();
      const name = (p.name?.tr || "").toLowerCase();
      
      if (model.includes(query) || name.includes(query)) {
        const baseModel = (p.name?.tr || "").split(' ')[0];
        if (!uniqueGroups.has(baseModel)) {
          uniqueGroups.set(baseModel, p);
        }
      }
    }
    
    return Array.from(uniqueGroups.values());
  }, [products, searchQuery]);

  const isSearching = searchQuery.trim().length > 0;
  const currentViewProducts = isSearching ? searchedProducts : filteredProducts;

  const totalPages = Math.ceil(currentViewProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = currentViewProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const activeColorClasses = isK2 
    ? "bg-orange-500 text-white shadow-orange-500/30 border-orange-500" 
    : brandName === "vanti" 
      ? "bg-blue-600 text-white shadow-blue-500/30 border-blue-600"
      : "bg-[#FFDA51] text-zinc-900 shadow-[#FFDA51]/30 border-[#FFDA51]";

  return (
    <section className="pt-4 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* SEARCH BAR */}
        <div className="mb-12 pb-8 relative animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className={`h-6 w-6 transition-colors duration-300 ${isK2 ? "text-orange-300 group-focus-within:text-orange-500" : brandName === "vanti" ? "text-blue-300 group-focus-within:text-blue-500" : "text-[#FFDA51]/60 group-focus-within:text-[#FFDA51]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={showcaseTexts.search_placeholder}
              className={`w-full pl-12 pr-12 py-4 rounded-2xl border-2 bg-white/90 backdrop-blur-md shadow-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 transition-all duration-300 text-lg
                ${isK2 
                  ? "border-orange-100/50 focus:border-orange-500 focus:ring-orange-500/20" 
                  : brandName === "vanti" 
                    ? "border-blue-100/50 focus:border-blue-500 focus:ring-blue-500/20" 
                    : "border-zinc-200 focus:border-[#FFDA51] focus:ring-[#FFDA51]/20"}`}
            />
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <svg className="h-5 w-5 bg-zinc-100 rounded-full p-1 hover:bg-zinc-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* VIEW 1: CATEGORY CARDS */}
        {!activeCategory && !isSearching && (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesData.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-zinc-100 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-all duration-300 text-left h-[280px] flex flex-col justify-end"
                >
                  {/* Dark gradient for text readability at the bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                  
                  {/* Background Image (Vivid, no zoom) */}
                  <Image 
                    src={getAssetPath('/images/' + cat.sampleImage)} 
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center opacity-100 z-0"
                  />
                  
                  <div className="relative z-20 p-8">

                    <h3 className="text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors duration-300">
                      {cat.name}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: PRODUCT GRID FOR SELECTED CATEGORY OR SEARCH */}
        {(activeCategory || isSearching) && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                {!isSearching && showBackButton && (
                  <button 
                    onClick={handleBack}
                    className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-4 group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {showcaseTexts.back_to_categories}
                  </button>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">
                  {isSearching ? showcaseTexts.search_results_title : activeCategory}
                </h2>

              </div>
            </div>

            {currentViewProducts.length === 0 && isSearching ? (
              <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border border-zinc-100 shadow-sm animate-in fade-in duration-500">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${isK2 ? "bg-orange-50 text-orange-400" : brandName === "vanti" ? "bg-blue-50 text-blue-400" : "bg-zinc-50 text-zinc-400"}`}>
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-3">{showcaseTexts.search_no_results_title}</h3>
                <p className="text-zinc-500 text-lg max-w-md mx-auto">{showcaseTexts.search_no_results_desc}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {displayedProducts.map((product) => {
                const slug = getSlugByProductId(product.id) || product.id;
                
                const slugify = (text: string) => text.toLowerCase().replace(/ı/g, 'i').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const categoryName = product.category?.tr?.[0];
                const categorySlug = categoryName ? slugify(categoryName) : (brandName === "vanti" ? "vantilator" : "aydinlatma");
                
                const productUrl = isBrandRoute && brandName && process.env.NODE_ENV === "production"
                  ? `/brand/${brandName}/urunler/${categorySlug}/${slug}`
                  : `/urunler/${categorySlug}/${slug}`;
                  
                return (
                  <Link 
                    href={productUrl} 
                    key={product.id} 
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-zinc-100/80 flex flex-col"
                  >
                    <div className="relative aspect-square p-6 bg-white flex items-center justify-center border-b border-zinc-50 overflow-hidden">
                      <Image 
                        src={getAssetPath('/images/' + product.image)} 
                        alt={product.name[language as keyof typeof product.name] || product.name.tr} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out" 
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="text-xs font-medium text-zinc-400 mb-1">{showcaseTexts.model} {product.model}</div>
                        <h4 className="font-bold text-sm md:text-base mb-2 line-clamp-2 text-zinc-800" title={product.name[language as keyof typeof product.name] || product.name.tr}>
                          {product.name[language as keyof typeof product.name] || product.name.tr}
                        </h4>
                      </div>
                      <div className={`text-xs font-bold mt-4 flex items-center ${isK2 ? "text-orange-500" : "text-blue-500"}`}>
                        {showcaseTexts.view}
                        <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
            )}

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
                          ? (isK2 ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : brandName === "vanti" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-[#FFDA51] text-zinc-900 shadow-lg shadow-[#FFDA51]/30")
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
