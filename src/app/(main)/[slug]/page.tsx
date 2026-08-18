import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllSlugs } from "@/data/products";
import { getProductPdfFile } from "@/lib/getProductPdfForm";
import { ProductDetailClient } from "./ProductDetailClient"; // Client component

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product = getProductBySlug(decodedSlug);
  
  if (!product) {
    return {
      title: "Ürün Bulunamadı | Kendal Elektrik",
    };
  }

  return {
    title: `${product.name.tr} | Kendal Elektrik`,
    description: `${product.name.tr} - ${product.model}`,
    alternates: { canonical: `/${decodedSlug}` },
  };
}

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const product = getProductBySlug(decodedSlug);
  
  if (!product) {
    notFound();
  }

  const { getSlugByProductId } = require("@/data/products");
  const canonicalSlug = getSlugByProductId(product.id);
  if (canonicalSlug && canonicalSlug !== decodedSlug) {
    const { redirect } = require("next/navigation");
    // Some legacy canonical slugs still contain raw Turkish characters
    // (ş/ı/ğ, code points > 255). An un-encoded redirect() target with such
    // a character crashes static export with a ByteString conversion error,
    // so always percent-encode the segment.
    redirect(`/${encodeURIComponent(canonicalSlug)}`);
  }

  const pdfFormFile = getProductPdfFile(product.model, product.name.tr);

  return <ProductDetailClient product={product} pdfFormFile={pdfFormFile} />;
}
