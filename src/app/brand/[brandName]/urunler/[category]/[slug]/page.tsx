import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getSlugByProductId, getProductCanonicalUrl, getProductCategorySlug, products } from "@/data/products";
import { getProductPdfFile } from "@/lib/getProductPdfForm";
import { ProductDetailClient } from "@/app/(main)/[slug]/ProductDetailClient"; // Re-using the main client component
import { ProductSchema } from "@/components/shared/ProductSchema";

export async function generateMetadata({ params }: { params: Promise<{ brandName: string; category: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product = getProductBySlug(decodedSlug);

  if (!product) {
    return { title: "Ürün Bulunamadı" };
  }

  const productCategory = product.category?.tr?.[0];
  const description = `${product.name.tr}${productCategory ? ` - ${productCategory}` : ""} | Model: ${product.model}. Teknik özellikleri ve garanti koşullarıyla incelenebilir.`;

  return {
    title: product.name.tr,
    description,
    alternates: { canonical: getProductCanonicalUrl(product) },
  };
}

export function generateStaticParams() {
  return Object.values(products).map((p) => ({
    brandName: p.brand || "k2",
    category: getProductCategorySlug(p),
    slug: getSlugByProductId(p.id) || p.id,
  }));
}

export default async function BrandProductDetailPage({
  params
}: {
  params: Promise<{ brandName: string, category: string, slug: string }>
}) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const product = getProductBySlug(decodedSlug);

  if (!product) {
    notFound();
  }

  const canonicalSlug = getSlugByProductId(product.id);
  if (canonicalSlug && canonicalSlug !== decodedSlug) {
    const { redirect } = require("next/navigation");
    // Host-relative path: k2.localhost/urunler/... proxy.ts rewrites this to
    // /brand/k2/urunler/... internally. Redirecting to the /brand/... path
    // directly here gets rewritten a second time (double-nested) and 404s.
    // Some legacy canonical slugs still contain raw Turkish characters
    // (ş/ı/ğ, code points > 255); an un-encoded redirect() target crashes
    // static export with a ByteString conversion error, so always encode.
    redirect(`/urunler/${resolvedParams.category}/${encodeURIComponent(canonicalSlug)}`);
  }

  const pdfFormFile = getProductPdfFile(product.model, product.name.tr);

  // Here we re-use the exact same UI as the main site for the product detail.
  // The layout wrapper will automatically provide the BrandNavbar and BrandFooter.
  return (
    <>
      <ProductSchema product={product} canonicalUrl={getProductCanonicalUrl(product)} />
      <ProductDetailClient product={product} brandName={resolvedParams.brandName as "k2" | "vanti" | "global"} pdfFormFile={pdfFormFile} />
    </>
  );
}
