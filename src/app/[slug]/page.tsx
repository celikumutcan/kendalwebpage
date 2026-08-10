import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllSlugs } from "@/data/products";
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
  
  return <ProductDetailClient product={product} />;
}
