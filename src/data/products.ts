import productsData from "./products.json";
import slugMapData from "./slug-map.json";
import { getAssetPath } from "@/utils/basePath";

export interface ProductAttribute {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  model: string;
  image: string; // relative path, e.g. "catalog/image/catalog/urunler/kes1205wbeyaz.jpg"
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
  const id = slugMap[slug];
  if (!idToSlugMap[id]) {
    idToSlugMap[id] = slug;
  }
}

export function getSlugByProductId(id: string): string | undefined {
  return idToSlugMap[id];
}
