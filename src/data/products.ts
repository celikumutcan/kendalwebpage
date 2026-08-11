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
}

// id -> Product
export const products: Record<string, Product> = productsData as Record<string, Product>;

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

export function getSlugByProductId(id: string): string | undefined {
  // Return the first matching slug (usually TR is first, or we just grab any)
  return Object.keys(slugMap).find(slug => slugMap[slug] === id);
}
