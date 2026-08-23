import { Metadata } from "next";
import { Product, getProductCanonicalUrl } from "@/data/products";

const NOT_FOUND_METADATA: Metadata = {
  title: "Ürün Bulunamadı | Kendal Elektrik",
};

// Shared by the main-site and brand-microsite product detail routes, which
// render the exact same product page under different URLs.
export function getProductDetailMetadata(product: Product | undefined): Metadata {
  if (!product) return NOT_FOUND_METADATA;

  const category = product.category?.tr?.[0];
  const description = `${product.name.tr}${category ? ` - ${category}` : ""} | Model: ${product.model}. Kendal Elektrik'in yerli üretim aydınlatma ve elektrik ürünleri arasında yer alan ${product.name.tr}, teknik özellikleri ve garanti koşullarıyla incelenebilir.`;

  return {
    title: `${product.name.tr} | Kendal Elektrik`,
    description,
    alternates: { canonical: getProductCanonicalUrl(product) },
  };
}
