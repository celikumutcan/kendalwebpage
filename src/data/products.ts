import productsData from "./products.json";
import slugMapData from "./slug-map.json"; // trigger update 23
import { getAssetPath } from "@/utils/basePath";

export interface ProductAttribute {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  model: string;
  image: string; // relative path, e.g. "catalog/image/catalog/urunler/kes1205wbeyaz.jpg"
  images?: string[]; // optional array of additional image paths
  name: { tr: string; en: string };
  attributes: { tr: ProductAttribute[]; en: ProductAttribute[] };
  category?: { tr: string[]; en: string[] };
  brand?: string;
  variantOptions?: {
    watt?: string | null;
    socket?: string | null;
    light?: string | null;
    casing?: string | null;
  };
}

// id -> Product
export const products: Record<string, Product> = productsData as unknown as Record<string, Product>;

// slug -> id. Includes BOTH legacy TR and EN slugs (they sometimes differ
// slightly, e.g. "sarı" vs "sari"), so every old QR / bookmarked link
// resolves regardless of which language variant was originally printed.
export const slugMap: Record<string, string> = slugMapData as Record<string, string>;

export function getProductBySlug(slug: string): Product | undefined {
  const id = slugMap[slug];
  return id ? products[id] : undefined;
}

export function getAllSlugs(): string[] {
  return Object.keys(slugMap);
}

export function getProductImageUrl(image: string): string {
  return getAssetPath('/images/' + image);
}

// Pre-compute an inverted map for O(1) lookups by ID
const idToSlugMap: Record<string, string> = {};
for (const slug of Object.keys(slugMap)) {
  const id = slugMap[slug as keyof typeof slugMap];
  if (!idToSlugMap[id]) {
    idToSlugMap[id] = slug;
  }
}

const slugify = (text: string) => text.toLowerCase().replace(/ı/g, 'i').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function getSlugByProductId(id: string): string | undefined {
  const product = products[id as keyof typeof products];
  if (product) {
    const canonical = slugify(product.name.tr);
    if (slugMap[canonical as keyof typeof slugMap] === id) {
      return canonical;
    }
  }
  return idToSlugMap[id];
}

// Ürünlerin "gerçek" (canonical) adresi marka mikrosite'leridir
// (k2/vanti/global.kendalelektrik.com.tr) - ana domaindeki /{slug} ve
// /urunler/{kategori}/{slug} rotaları aynı içeriği gösteren aynalardır.
export const BRAND_HOSTS: Record<string, string> = {
  k2: "https://k2.kendalelektrik.com.tr",
  vanti: "https://vanti.kendalelektrik.com.tr",
  global: "https://global.kendalelektrik.com.tr",
};

export function getProductCategorySlug(product: Product): string {
  const brandName = product.brand || "k2";
  const categoryName = product.category?.tr?.[0];
  return categoryName ? slugify(categoryName) : (brandName === "vanti" ? "vantilator" : "aydinlatma");
}

export function getProductCanonicalUrl(product: Product): string {
  const brandName = product.brand || "k2";
  const host = BRAND_HOSTS[brandName] || BRAND_HOSTS.k2;
  const category = getProductCategorySlug(product);
  const slug = getSlugByProductId(product.id) || product.id;
  return `${host}/urunler/${category}/${encodeURIComponent(slug)}`;
}
