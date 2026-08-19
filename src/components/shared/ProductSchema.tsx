import React from "react";
import { Product, getProductImageUrl } from "@/data/products";

const BRAND_NAMES: Record<string, string> = {
  k2: "K2 Led System",
  vanti: "Vanti",
  global: "Kendal Global",
};

export const ProductSchema = ({ product, canonicalUrl }: { product: Product; canonicalUrl: string }) => {
  const attributes = product.attributes.tr || [];
  const category = product.category?.tr?.[0];
  const brand = BRAND_NAMES[product.brand || ""] || "Kendal Elektrik";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name.tr,
    sku: product.model,
    image: [product.image, ...(product.images || [])].map((img) => getProductImageUrl(img)),
    description: `${product.name.tr}${category ? ` - ${category}` : ""} (${product.model})`,
    category,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    manufacturer: {
      "@type": "Organization",
      name: "Kendal Elektrik",
      url: "https://www.kendalelektrik.com.tr",
    },
    additionalProperty: attributes
      .filter((attr) => attr.label && attr.value)
      .map((attr) => ({
        "@type": "PropertyValue",
        name: attr.label,
        value: String(attr.value),
      })),
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
