"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAssetPath } from "@/utils/basePath";
import { Product, getSlugByProductId } from "@/data/products";
import { useLanguage } from "@/app/i18n/LanguageProvider";

interface CategoryFirstShowcaseProps {
  products: Product[];
  brandName: string;
}

export default function CategoryFirstShowcase({ products, brandName }: CategoryFirstShowcaseProps) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const searchParams = useSearchParams();
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
  
  const urlCategory = searchParams?.get("category") || null;
  const urlPage = parseInt(searchParams?.get("page") || "1", 10) || 1;
  const urlQuery = searchParams?.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string | null>(urlCategory);
  const [currentPage, setCurrentPage] = useState<number>(urlPage);
  const [searchQuery, setSearchQuery] = useState(urlQuery);

  useEffect(() => {
    const cat = searchParams?.get("category") || null;
    const page = parseInt(searchParams?.get("page") || "1", 10) || 1;
    const q = searchParams?.get("q") || "";
    
    setSelectedCategory(cat);
    setCurrentPage(page);
    setSearchQuery(q);
  }, [searchParams]);

  const updateUrl = (cat: string | null, page: number, query: string) => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (cat) params.set("category", cat);
      else params.delete("category");

      if (page > 1) params.set("page", page.toString());
      else params.delete("page");

      if (query) params.set("q", query);
      else params.delete("q");

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

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
    const cats = new Map<string, { count: number; sampleImage: string; uniqueModels: Set<string>; enName?: string }>();
    
    products.forEach(p => {
      if (p.category?.tr && p.category.tr.length > 0) {
        const topCat = p.category.tr[0];
        const baseModel = (p.name.tr || "").split(' ')[0];

        if (!cats.has(topCat)) {
          cats.set(topCat, { 
            count: 1, 
            sampleImage: p.image, 
            uniqueModels: new Set([baseModel]),
            enName: p.category.en?.[0] 
          });
        } else {
          const existing = cats.get(topCat)!;
          if (!existing.uniqueModels.has(baseModel)) {
            existing.uniqueModels.add(baseModel);
            existing.count += 1;
          }
          if (!existing.enName && p.category.en?.[0]) {
            existing.enName = p.category.en[0];
          }
          
          // Ampuller kategorisinin kapak fotoğrafını sabit KES180 Ararenk yapmak için
          if (topCat.toLowerCase().includes("ampul")) {
            existing.sampleImage = "urunler/kes180-8wararenk.webp";
          }
          
          cats.set(topCat, existing);
        }
      }
    });
    
    return Array.from(cats.entries()).map(([name, data]) => ({
      name,
      displayName: language === 'en' && data.enName ? data.enName : name,
      count: data.count,
      sampleImage: data.sampleImage
    }));
  }, [products, language]);

  // Auto-select if there is only 1 category
  const activeCategory = selectedCategory || (categoriesData.length === 1 ? categoriesData[0].name : null);
  const showBackButton = categoriesData.length > 1;

  // Filter States
  const [selectedCasings, setSelectedCasings] = useState<string[]>([]);
  const [selectedWatts, setSelectedWatts] = useState<string[]>([]);
  const [selectedSockets, setSelectedSockets] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isCasingDropdownOpen, setIsCasingDropdownOpen] = useState(false);
  const [casingSearchQuery, setCasingSearchQuery] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState<"casings" | "watts" | "sockets">("casings");

  // Calculate available filters for the current category
  const availableFilters = useMemo(() => {
    if (!activeCategory) return { casings: [], watts: [], sockets: [] };
    const categoryProducts = products.filter(p => p.category?.tr && p.category.tr[0] === activeCategory);
    
    const casings = new Set<string>();
    const watts = new Set<string>();
    const sockets = new Set<string>();
    
    categoryProducts.forEach(p => {
      if (p.variantOptions?.casing) casings.add(p.variantOptions.casing);
      if (p.variantOptions?.watt) watts.add(p.variantOptions.watt);
      if (p.variantOptions?.socket) sockets.add(p.variantOptions.socket);
    });
    
    return {
      casings: Array.from(casings).sort(),
      watts: Array.from(watts).sort((a, b) => parseInt(a) - parseInt(b)),
      sockets: Array.from(sockets).sort()
    };
  }, [products, activeCategory]);

  useEffect(() => {
    if (availableFilters[activeFilterTab].length === 0) {
      if (availableFilters.casings.length > 0) setActiveFilterTab("casings");
      else if (availableFilters.watts.length > 0) setActiveFilterTab("watts");
      else if (availableFilters.sockets.length > 0) setActiveFilterTab("sockets");
    }
  }, [availableFilters, activeFilterTab]);

  // Filter products by selected category, apply filters, and group them by base model
  const filteredProducts = useMemo(() => {
    if (!activeCategory) return [];
    let categoryProducts = products.filter(p => p.category?.tr && p.category.tr[0] === activeCategory);
    
    // Group products by their base model (first word of name, e.g. "GDL414" from "GDL414 25W...")
    const uniqueGroups = new Map<string, { product: Product, variants: Product[] }>();
    for (const p of categoryProducts) {
      const baseModel = (p.name.tr || "").split(' ')[0];
      if (!uniqueGroups.has(baseModel)) {
        uniqueGroups.set(baseModel, { product: p, variants: [p] });
      } else {
        uniqueGroups.get(baseModel)!.variants.push(p);
      }
    }
    
    let groups = Array.from(uniqueGroups.values());

    // Apply Filters (A group matches if ANY of its variants match the filter)
    if (selectedCasings.length > 0) {
      groups = groups.filter(g => g.variants.some(v => v.variantOptions?.casing && selectedCasings.includes(v.variantOptions.casing)));
    }
    if (selectedWatts.length > 0) {
      groups = groups.filter(g => g.variants.some(v => v.variantOptions?.watt && selectedWatts.includes(v.variantOptions.watt)));
    }
    if (selectedSockets.length > 0) {
      groups = groups.filter(g => g.variants.some(v => v.variantOptions?.socket && selectedSockets.includes(v.variantOptions.socket)));
    }

    return groups;
  }, [products, activeCategory, selectedCasings, selectedWatts, selectedSockets]);

  const searchedProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    
    const uniqueGroups = new Map<string, { product: Product, variants: Product[] }>();
    
    for (const p of products) {
      const model = (p.model || "").toLowerCase();
      const name = (p.name?.tr || "").toLowerCase();
      
      if (model.includes(query) || name.includes(query)) {
        const baseModel = (p.name?.tr || "").split(' ')[0];
        if (!uniqueGroups.has(baseModel)) {
          uniqueGroups.set(baseModel, { product: p, variants: [p] });
        } else {
          uniqueGroups.get(baseModel)!.variants.push(p);
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
    setSelectedCasings([]);
    setSelectedWatts([]);
    setSelectedSockets([]);
    updateUrl(cat, 1, "");
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setCurrentPage(1);
    setSearchQuery("");
    setSelectedCasings([]);
    setSelectedWatts([]);
    setSelectedSockets([]);
    updateUrl(null, 1, "");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setCurrentPage(1);
    updateUrl(selectedCategory, 1, val);
  };

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
                onClick={() => { setSearchQuery(""); setCurrentPage(1); updateUrl(selectedCategory, 1, ""); }}
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
                      {cat.displayName}
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
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 relative">
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
                  {isSearching ? showcaseTexts.search_results_title : (categoriesData.find(c => c.name === activeCategory)?.displayName || activeCategory)}
                </h2>
              </div>

              {/* FILTERS UI */}
              {!isSearching && (availableFilters.casings.length > 0 || availableFilters.watts.length > 0 || availableFilters.sockets.length > 0) && (
                <div className="animate-in fade-in duration-700 relative sm:static">
                  <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 shadow-sm hover:shadow`}
                  >
                    <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    {(t as any).brand_pages?.showcase?.filters || "Filtrele"}
                    {(selectedCasings.length > 0 || selectedWatts.length > 0 || selectedSockets.length > 0) && (
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                        isK2 ? "bg-orange-100 text-orange-600" : brandName === "vanti" ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {selectedCasings.length + selectedWatts.length + selectedSockets.length}
                      </span>
                    )}
                  </button>
                  
                  {isFiltersOpen && (
                    <>
                      <div className="fixed inset-0 z-[90]" onClick={() => setIsFiltersOpen(false)}></div>
                      <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-3 z-[100] bg-white rounded-[2rem] w-[calc(100vw-2rem)] max-w-4xl max-h-[80vh] flex flex-col shadow-2xl border border-zinc-200 animate-in slide-in-from-top-4 fade-in duration-200 overflow-hidden">
                      {/* Header */}
                      <div className="flex items-center justify-between p-5 border-b border-zinc-100">
                        <h3 className="text-xl font-bold text-zinc-900">{(t as any).brand_pages?.showcase?.filters || "Filtreler"}</h3>
                        <button onClick={() => setIsFiltersOpen(false)} className="p-2 text-zinc-400 hover:text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-full transition-colors">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Tabs Header */}
                      <div className="flex border-b border-zinc-100 px-5 gap-6">
                        {[
                          { id: "casings", label: "Renkler", show: availableFilters.casings.length > 0, count: selectedCasings.length },
                          { id: "watts", label: "Güç", show: availableFilters.watts.length > 0, count: selectedWatts.length },
                          { id: "sockets", label: "Duy Tipi", show: availableFilters.sockets.length > 0, count: selectedSockets.length }
                        ].filter(t => t.show).map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveFilterTab(tab.id as any)}
                            className={`py-4 text-sm font-bold transition-all relative ${
                              activeFilterTab === tab.id ? (isK2 ? "text-orange-600" : "text-blue-600") : "text-zinc-500 hover:text-zinc-800"
                            }`}
                          >
                            {tab.label}
                            {tab.count > 0 && (
                              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                                activeFilterTab === tab.id 
                                  ? (isK2 ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700") 
                                  : "bg-zinc-100 text-zinc-600"
                              }`}>
                                {tab.count}
                              </span>
                            )}
                            {activeFilterTab === tab.id && (
                              <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full ${isK2 ? "bg-orange-600" : "bg-blue-600"}`} />
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Body */}
                      <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-zinc-200">
                        
                        {/* Renkler Tab */}
                        {activeFilterTab === "casings" && availableFilters.casings.length > 0 && (
                          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                            <div className="relative">
                              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <input 
                                type="text" 
                                placeholder="Renk ara..." 
                                value={casingSearchQuery}
                                onChange={(e) => setCasingSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pr-1">
                              {availableFilters.casings
                                .filter(c => c.toLowerCase().includes(casingSearchQuery.toLowerCase()))
                                .map(casing => (
                                  <label key={casing} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors border ${selectedCasings.includes(casing) ? (isK2 ? "border-orange-500 bg-orange-50" : "border-blue-600 bg-blue-50") : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"}`}>
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                      selectedCasings.includes(casing) 
                                        ? (isK2 ? "bg-orange-500 border-orange-500" : "bg-blue-600 border-blue-600")
                                        : "border-zinc-300 bg-white"
                                    }`}>
                                      {selectedCasings.includes(casing) && (
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                      )}
                                    </div>
                                    <span className={`text-sm flex-1 ${selectedCasings.includes(casing) ? "font-semibold text-zinc-900" : "text-zinc-600"}`}>
                                      {casing}
                                    </span>
                                    <input 
                                      type="checkbox"
                                      className="sr-only"
                                      checked={selectedCasings.includes(casing)}
                                      onChange={() => {
                                        setSelectedCasings(prev => prev.includes(casing) ? prev.filter(c => c !== casing) : [...prev, casing]);
                                        setCurrentPage(1);
                                      }}
                                    />
                                  </label>
                              ))}
                              {availableFilters.casings.filter(c => c.toLowerCase().includes(casingSearchQuery.toLowerCase())).length === 0 && (
                                <div className="p-4 text-center text-sm text-zinc-500 col-span-full">
                                  Sonuç bulunamadı.
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Watts Tab */}
                        {activeFilterTab === "watts" && availableFilters.watts.length > 0 && (
                          <div className="animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex flex-wrap gap-2">
                              {availableFilters.watts.map(watt => (
                                <button
                                  key={watt}
                                  onClick={() => {
                                    setSelectedWatts(prev => prev.includes(watt) ? prev.filter(w => w !== watt) : [...prev, watt]);
                                    setCurrentPage(1);
                                  }}
                                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                                    selectedWatts.includes(watt)
                                      ? isK2 ? "bg-orange-600 text-white border-orange-600 shadow-md" : "bg-blue-600 text-white border-blue-600 shadow-md"
                                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                                  }`}
                                >
                                  {watt}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Sockets Tab */}
                        {activeFilterTab === "sockets" && availableFilters.sockets.length > 0 && (
                          <div className="animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex flex-wrap gap-2">
                              {availableFilters.sockets.map(socket => (
                                <button
                                  key={socket}
                                  onClick={() => {
                                    setSelectedSockets(prev => prev.includes(socket) ? prev.filter(s => s !== socket) : [...prev, socket]);
                                    setCurrentPage(1);
                                  }}
                                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                                    selectedSockets.includes(socket)
                                      ? isK2 ? "bg-orange-600 text-white border-orange-600 shadow-md" : "bg-blue-600 text-white border-blue-600 shadow-md"
                                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                                  }`}
                                >
                                  {socket}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Footer */}
                      <div className="p-5 border-t border-zinc-100 flex gap-3 bg-zinc-50/50 rounded-b-[2rem]">
                        <button 
                          onClick={() => {
                            setSelectedCasings([]);
                            setSelectedWatts([]);
                            setSelectedSockets([]);
                            setCasingSearchQuery("");
                            setCurrentPage(1);
                          }} 
                          className="px-5 py-3 rounded-xl font-bold bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors"
                        >
                          Temizle
                        </button>
                        <button 
                          onClick={() => setIsFiltersOpen(false)} 
                          className={`flex-1 px-5 py-3 rounded-xl font-bold text-white transition-colors shadow-lg ${isK2 ? "bg-orange-600 hover:bg-orange-700 shadow-orange-600/30" : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/30"}`}
                        >
                          Uygula ({selectedCasings.length + selectedWatts.length + selectedSockets.length})
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            
            </div> {/* END OF HEADER ROW */}

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
              {displayedProducts.map((group) => {
                const product = group.product;
                const variants = group.variants;
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
                        updateUrl(selectedCategory, pageNum as number, searchQuery);
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
