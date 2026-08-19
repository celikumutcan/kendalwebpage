import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getSlugByProductId, getProductCanonicalUrl, getProductCategorySlug, products } from "@/data/products";
import { getProductPdfFile } from "@/lib/getProductPdfForm";
import { ProductDetailClient } from "@/app/(main)/[slug]/ProductDetailClient";
import { ProductSchema } from "@/components/shared/ProductSchema";

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product = getProductBySlug(decodedSlug);

  if (!product) {
    return { title: "Ürün Bulunamadı | Kendal Elektrik" };
  }

  // Bu rota, ürünün marka mikrosite'indeki asıl sayfasıyla birebir aynı
  // içeriği gösteriyor; yinelenen içerik sinyali göndermemek için kanonik
  // URL her zaman o asıl (marka) adresi işaret eder.
  const category = product.category?.tr?.[0];
  const description = `${product.name.tr}${category ? ` - ${category}` : ""} | Model: ${product.model}. Kendal Elektrik'in yerli üretim aydınlatma ve elektrik ürünleri arasında yer alan ${product.name.tr}, teknik özellikleri ve garanti koşullarıyla incelenebilir.`;

  return {
    title: `${product.name.tr} | Kendal Elektrik`,
    description,
    alternates: { canonical: getProductCanonicalUrl(product) },
  };
}

export function generateStaticParams() {
  return Object.values(products).map((p) => ({
    category: getProductCategorySlug(p),
    slug: getSlugByProductId(p.id) || p.id,
  }));
}

export default async function MainProductDetailPage({
  params
}: {
  params: Promise<{ category: string, slug: string }>
}) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const product = getProductBySlug(decodedSlug);

  if (!product) {
    notFound();
  }

  const pdfFormFile = getProductPdfFile(product.model, product.name.tr);

  return (
    <>
      <ProductSchema product={product} canonicalUrl={getProductCanonicalUrl(product)} />
      <ProductDetailClient product={product} pdfFormFile={pdfFormFile} />
    </>
  );
}
