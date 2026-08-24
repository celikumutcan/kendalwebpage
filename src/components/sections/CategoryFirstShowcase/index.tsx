"use client";

import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Product, getCategoryGroupForCategory } from "@/data/products";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import ProductCompareModal from "../ProductCompareModal";
import { CategoryCard } from "./CategoryCard";
import { ProductCard } from "./ProductCard";
import { FiltersPanelContent, FilterTab } from "./FiltersPanelContent";
import { CompareTray } from "./CompareTray";
import { MAX_COMPARE, getBaseModelKey, getVisiblePages, getProductCardUrl } from "./helpers";

interface CategoryFirstShowcaseProps {
  products: Product[];
  brandName: string;
  // True only when `products` has already been filtered down to a single brand
  // (the real /brand/[brandName]/urunler route). The generic /urunler catalog page
  // passes brandName="global" purely for theming while mixing all brands together,
  // so that prop alone can't be used to gate brand-scoped features like comparison.
  isBrandScoped?: boolean;
}

export default function CategoryFirstShowcase({ products, brandName, isBrandScoped = false }: CategoryFirstShowcaseProps) {
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
  const isGlobal = brandName === "global";

  const compareTexts = language === 'en' ? {
    add: "Compare",
    added: "Added",
    max_reached: "You can compare up to 3 products",
    tray_hint: "Select 2-3 products from this category to compare",
    compare_button: "Compare",
    clear: "Clear",
    modal_title: "Product Comparison",
    view: "View",
    model: "Model:",
    no_value: "—"
  } : {
    add: "Karşılaştır",
    added: "Eklendi",
    max_reached: "En fazla 3 ürün karşılaştırabilirsiniz",
    tray_hint: "Bu kategoriden karşılaştırmak için 2-3 ürün seçin",
    compare_button: "Karşılaştır",
    clear: "Temizle",
    modal_title: "Ürün Karşılaştırma",
    view: "İncele",
    model: "Model:",
    no_value: "—"
  };

  const urlGroup = searchParams?.get("group") || null;
  const urlCategory = searchParams?.get("category") || null;
  const urlPage = parseInt(searchParams?.get("page") || "1", 10) || 1;
  const urlQuery = searchParams?.get("q") || "";

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [selectedGroup, setSelectedGroup] = useState<string | null>(urlGroup);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(urlCategory);
  const [currentPage, setCurrentPage] = useState<number>(urlPage);
  const [searchQuery, setSearchQuery] = useState(urlQuery);

  useEffect(() => {
    const group = searchParams?.get("group") || null;
    const cat = searchParams?.get("category") || null;
    const page = parseInt(searchParams?.get("page") || "1", 10) || 1;
    const q = searchParams?.get("q") || "";

    setSelectedGroup(group);
    setSelectedCategory(cat);
    setCurrentPage(page);
    setSearchQuery(q);
  }, [searchParams]);

  const updateUrl = (group: string | null, cat: string | null, page: number, query: string) => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (group) params.set("group", group);
      else params.delete("group");

      if (cat) params.set("category", cat);
      else params.delete("category");

      if (page > 1) params.set("page", page.toString());
      else params.delete("page");

      if (query) params.set("q", query);
      else params.delete("q");

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const itemsPerPage = 15;

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

          // "LED Flaman Ampul" kategorisinin kapak fotoğrafını sabit KES498 yapmak için
          if (topCat === "LED Flaman Ampul") {
            existing.sampleImage = "urunler/kes498.webp";
          }

          cats.set(topCat, existing);
        }
      }
    });

    const collator = new Intl.Collator(language === 'en' ? 'en' : 'tr', { sensitivity: 'base' });
    return Array.from(cats.entries())
      .map(([name, data]) => ({
        name,
        displayName: language === 'en' && data.enName ? data.enName : name,
        count: data.count,
        sampleImage: data.sampleImage
      }))
      .sort((a, b) => collator.compare(a.displayName, b.displayName));
  }, [products, language]);

  const isK2Grouped = isK2 && isBrandScoped;

  // k2'de birbirine yakın isimli kategorileri (Solar Armatür, Sokak Armatürü vb.)
  // tek bir "Armatür" grup kartı altında toplar. Diğer markalarda/karma
  // /urunler kataloğunda inert (ungroupedCategories === categoriesData).
  const { ungroupedCategories, groupCards } = useMemo(() => {
    if (!isK2Grouped) return { ungroupedCategories: categoriesData, groupCards: [] as { key: string; displayName: string; sampleImage: string; members: typeof categoriesData }[] };

    const map = new Map<string, { def: ReturnType<typeof getCategoryGroupForCategory>; members: typeof categoriesData }>();
    const ungrouped: typeof categoriesData = [];

    for (const cat of categoriesData) {
      const def = getCategoryGroupForCategory(cat.name, brandName);
      if (!def) { ungrouped.push(cat); continue; }
      if (!map.has(def.key)) map.set(def.key, { def, members: [] });
      map.get(def.key)!.members.push(cat);
    }

    const collator = new Intl.Collator(language === 'en' ? 'en' : 'tr', { sensitivity: 'base' });
    const groupCards = Array.from(map.values())
      .filter(g => g.members.length > 0)
      .map(({ def, members }) => ({
        key: def!.key,
        displayName: language === 'en' ? def!.name.en : def!.name.tr,
        sampleImage: members[0].sampleImage,
        members,
      }))
      .sort((a, b) => collator.compare(a.displayName, b.displayName));

    return { ungroupedCategories: ungrouped, groupCards };
  }, [categoriesData, isK2Grouped, brandName, language]);

  // Üst seviye kartlar (tekil kategoriler + k2 grup kartları) tek bir alfabetik listede birleşir
  const topLevelCards = useMemo(() => {
    const collator = new Intl.Collator(language === 'en' ? 'en' : 'tr', { sensitivity: 'base' });
    return [
      ...ungroupedCategories.map(cat => ({ type: 'category' as const, key: cat.name, displayName: cat.displayName, sampleImage: cat.sampleImage, cat })),
      ...groupCards.map(group => ({ type: 'group' as const, key: group.key, displayName: group.displayName, sampleImage: group.sampleImage, group })),
    ].sort((a, b) => collator.compare(a.displayName, b.displayName));
  }, [ungroupedCategories, groupCards, language]);

  // Auto-select if there is only 1 category (grup modunda üst seviyedeki toplam kart sayısına göre)
  const topLevelCount = isK2Grouped ? ungroupedCategories.length + groupCards.length : categoriesData.length;
  const activeCategory = selectedCategory || (topLevelCount === 1 && !isK2Grouped ? categoriesData[0].name : null);
  const showBackButton = categoriesData.length > 1;
  const activeGroup = isK2Grouped ? groupCards.find(g => g.key === selectedGroup) || null : null;
  const isSearching = searchQuery.trim().length > 0;
  const inGroupCategoryList = isK2Grouped && !!selectedGroup && !activeCategory && !isSearching;
  const inTopLevel = !selectedGroup && !activeCategory && !isSearching;

  // Compare feature (brand routes only — comparison stays within a single brand's catalog)
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const toggleCompare = (product: Product) => {
    setCompareIds(prev => {
      if (prev.includes(product.id)) return prev.filter(id => id !== product.id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, product.id];
    });
  };

  const productById = useMemo(() => new Map(products.map(p => [p.id, p])), [products]);

  const compareItems = useMemo(() => {
    return compareIds
      .map(id => productById.get(id))
      .filter((p): p is Product => !!p)
      .map(product => ({ product, url: getProductCardUrl(product, brandName, isBrandRoute) }));
  }, [compareIds, productById, brandName, isBrandRoute]);

  // Filter States
  const [selectedCasings, setSelectedCasings] = useState<string[]>([]);
  const [selectedWatts, setSelectedWatts] = useState<string[]>([]);
  const [selectedSockets, setSelectedSockets] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [casingSearchQuery, setCasingSearchQuery] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState<FilterTab>("casings");

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
      const baseModel = getBaseModelKey(p.name.tr);
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

    // Model kodu (ilk kelime) sıralamada göz ardı edilir; ürünler açıklayıcı
    // isimlerine göre (örn. "JÜPİTER LED APLİK") gruplanıp alfabetik dizilir.
    const collator = new Intl.Collator(language === 'en' ? 'en' : 'tr', { sensitivity: 'base', numeric: true });
    const sortKey = (p: Product) => {
      const name = p.name[language] || p.name.tr || "";
      const withoutModel = name.split(' ').slice(1).join(' ').trim();
      return withoutModel || name;
    };
    groups.sort((a, b) => collator.compare(sortKey(a.product), sortKey(b.product)) || collator.compare(a.product.name.tr, b.product.name.tr));

    return groups;
  }, [products, activeCategory, selectedCasings, selectedWatts, selectedSockets, language]);

  const searchedProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();

    const uniqueGroups = new Map<string, { product: Product, variants: Product[] }>();

    for (const p of products) {
      const model = (p.model || "").toLowerCase();
      const name = (p.name?.tr || "").toLowerCase();

      if (model.includes(query) || name.includes(query)) {
        const baseModel = getBaseModelKey(p.name?.tr || "");
        if (!uniqueGroups.has(baseModel)) {
          uniqueGroups.set(baseModel, { product: p, variants: [p] });
        } else {
          uniqueGroups.get(baseModel)!.variants.push(p);
        }
      }
    }

    return Array.from(uniqueGroups.values());
  }, [products, searchQuery]);

  const currentViewProducts = isSearching ? searchedProducts : filteredProducts;

  const totalPages = Math.ceil(currentViewProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = currentViewProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryClick = (cat: string) => {
    // Bir gruba ait alt kategoriye hangi yoldan girilirse girinsin (grup kartından,
    // tarayıcı geri/ileri tuşundan, elle yazılmış ?category= linkinden) selectedGroup
    // her zaman doğru şekilde yeniden türetilir — ayrı bir deep-link kod yolu gerekmez.
    const group = isK2Grouped ? getCategoryGroupForCategory(cat, brandName)?.key || null : null;
    setSelectedGroup(group);
    setSelectedCategory(cat);
    setCurrentPage(1);
    setSearchQuery("");
    setSelectedCasings([]);
    setSelectedWatts([]);
    setSelectedSockets([]);
    setCompareIds([]);
    updateUrl(group, cat, 1, "");
  };

  const handleGroupClick = (groupKey: string) => {
    setSelectedGroup(groupKey);
    setSelectedCategory(null);
    setCurrentPage(1);
    setSearchQuery("");
    setSelectedCasings([]);
    setSelectedWatts([]);
    setSelectedSockets([]);
    setCompareIds([]);
    updateUrl(groupKey, null, 1, "");
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
    setSelectedCategory(null);
    setCurrentPage(1);
    setSearchQuery("");
    setSelectedCasings([]);
    setSelectedWatts([]);
    setSelectedSockets([]);
    setCompareIds([]);
    updateUrl(null, null, 1, "");
  };

  const handleBack = () => {
    // selectedGroup bilinçli olarak temizlenmiyor: bir gruptan gelindiyse geri
    // butonu üst gruba değil, grubun alt kategori listesine döner (breadcrumb
    // davranışı, ayrı bir component eklemeden state persistence ile).
    setSelectedCategory(null);
    setCurrentPage(1);
    setSearchQuery("");
    setSelectedCasings([]);
    setSelectedWatts([]);
    setSelectedSockets([]);
    setCompareIds([]);
    updateUrl(selectedGroup, null, 1, "");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setCurrentPage(1);
    updateUrl(selectedGroup, selectedCategory, 1, val);
  };

  const hasAnyFilterOptions = availableFilters.casings.length > 0 || availableFilters.watts.length > 0 || availableFilters.sockets.length > 0;
  const selectedFilterCount = selectedCasings.length + selectedWatts.length + selectedSockets.length;

  const filtersPanelProps = {
    t,
    isK2,
    availableFilters,
    activeFilterTab,
    setActiveFilterTab,
    selectedCasings,
    setSelectedCasings,
    selectedWatts,
    setSelectedWatts,
    selectedSockets,
    setSelectedSockets,
    casingSearchQuery,
    setCasingSearchQuery,
    setCurrentPage,
    onClose: () => setIsFiltersOpen(false),
  };

  return (
    <section className="pt-4 pb-12 px-6">
      <div className="max-w-[1440px] mx-auto">

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
                onClick={() => { setSearchQuery(""); setCurrentPage(1); updateUrl(selectedGroup, selectedCategory, 1, ""); }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <svg className="h-5 w-5 bg-zinc-100 rounded-full p-1 hover:bg-zinc-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* VIEW 1: CATEGORY CARDS (+ k2'de grup kartları, örn. "Armatür") */}
        {inTopLevel && (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {topLevelCards.map((item) => (
                <CategoryCard
                  key={item.key}
                  alt={item.displayName}
                  displayName={item.displayName}
                  sampleImage={item.sampleImage}
                  onClick={() => item.type === 'category' ? handleCategoryClick(item.cat.name) : handleGroupClick(item.group.key)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 1.5: GRUP İÇİ ALT KATEGORİ KARTLARI (sadece k2'de, bir gruba tıklanınca) */}
        {inGroupCategoryList && activeGroup && (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="mb-8">
              <button
                onClick={handleBackToGroups}
                className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-4 group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {showcaseTexts.back_to_categories}
              </button>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">{activeGroup.displayName}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {activeGroup.members.map((cat) => (
                <CategoryCard
                  key={cat.name}
                  alt={cat.name}
                  displayName={cat.displayName}
                  sampleImage={cat.sampleImage}
                  onClick={() => handleCategoryClick(cat.name)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: PRODUCT GRID FOR SELECTED CATEGORY OR SEARCH */}
        {(activeCategory || isSearching) && (
          <div className="animate-in fade-in duration-500">
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
              {!isSearching && hasAnyFilterOptions && (
                <div className="animate-in fade-in duration-700 relative sm:static">
                  <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className={`group flex items-center gap-2.5 px-5 py-3 rounded-full font-bold text-sm transition-all duration-300 border shadow-sm ${
                      isFiltersOpen
                        ? (isK2 ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-600/25" : "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25")
                        : "bg-white/90 backdrop-blur-md text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:-translate-y-0.5 hover:shadow-md"
                    }`}
                  >
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isFiltersOpen ? "rotate-180 text-white" : "text-zinc-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    {(t as any).brand_pages?.showcase?.filters || "Filtrele"}
                    {selectedFilterCount > 0 && (
                      <span className={`min-w-[1.25rem] h-5 px-1.5 rounded-full text-[11px] flex items-center justify-center ${
                        isFiltersOpen ? "bg-white/25 text-white" : (isK2 ? "bg-orange-100 text-orange-600" : brandName === "vanti" ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-700")
                      }`}>
                        {selectedFilterCount}
                      </span>
                    )}
                  </button>

                  {isFiltersOpen && (
                    <>
                      {/* Desktop Modal Inline */}
                      <div className="hidden sm:block absolute top-full left-0 sm:left-auto sm:right-0 mt-3 z-[100] bg-white/95 backdrop-blur-2xl rounded-[1.75rem] w-max min-w-[300px] max-w-md max-h-[80vh] flex-col shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] border border-zinc-100 ring-1 ring-black/[0.02] animate-in slide-in-from-top-3 fade-in zoom-in-95 duration-200 overflow-hidden pointer-events-auto">
                        <FiltersPanelContent {...filtersPanelProps} />
                      </div>

                      {/* Mobile Modal via Portal */}
                      {mounted && typeof window !== 'undefined' && createPortal(
                        <div className="fixed inset-0 z-[100] flex items-center justify-center sm:hidden">
                          <div className="fixed inset-0 bg-zinc-900/10 backdrop-blur-[2px] animate-in fade-in duration-200" onClick={() => setIsFiltersOpen(false)}></div>
                          <div className="relative z-10 bg-white/95 backdrop-blur-2xl rounded-[1.75rem] w-[calc(100vw-2rem)] max-h-[85vh] flex flex-col shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] border border-zinc-100 ring-1 ring-black/[0.02] animate-in fade-in zoom-in-95 duration-200 overflow-hidden pointer-events-auto">
                            <FiltersPanelContent {...filtersPanelProps} />
                          </div>
                        </div>,
                        document.body
                      )}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8">
                {displayedProducts.map((group) => {
                  const product = group.product;
                  const canCompare = !!(isBrandScoped && activeCategory && !isSearching);
                  const isCompared = compareIds.includes(product.id);
                  const isCompareMaxed = compareIds.length >= MAX_COMPARE && !isCompared;

                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      language={language}
                      brandName={brandName}
                      isBrandRoute={isBrandRoute}
                      isK2={isK2}
                      isGlobal={isGlobal}
                      showcaseTexts={showcaseTexts}
                      canCompare={canCompare}
                      isCompared={isCompared}
                      isCompareMaxed={isCompareMaxed}
                      compareTexts={compareTexts}
                      onToggleCompare={toggleCompare}
                    />
                  );
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
                        updateUrl(selectedGroup, selectedCategory, pageNum as number, searchQuery);
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

      {/* Compare Tray (brand routes only) */}
      {mounted && typeof window !== 'undefined' && isBrandScoped && compareItems.length > 0 && createPortal(
        <CompareTray
          compareItems={compareItems}
          language={language}
          isK2={isK2}
          brandName={brandName}
          compareTexts={compareTexts}
          onToggleCompare={toggleCompare}
          onClear={() => setCompareIds([])}
          onOpenCompare={() => setIsCompareOpen(true)}
        />,
        document.body
      )}

      {isCompareOpen && compareItems.length >= 2 && (
        <ProductCompareModal
          items={compareItems}
          language={language}
          brandName={brandName}
          texts={compareTexts}
          onClose={() => setIsCompareOpen(false)}
          onRemove={(id) => setCompareIds(prev => prev.filter(cid => cid !== id))}
        />
      )}
    </section>
  );
}
