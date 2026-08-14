import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { getProductPdfFile } from "@/lib/getProductPdfForm";
import { ProductDetailClient } from "@/app/(main)/[slug]/ProductDetailClient"; // Re-using the main client component

export function generateStaticParams() {
  const { products, getSlugByProductId } = require("@/data/products");
  
  const params: any[] = [];
  
  Object.values(products).forEach((p: any) => {
    const slug = getSlugByProductId(p.id) || p.id;
    const slugify = (text: string) => text.toLowerCase().replace(/ı/g, 'i').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const brandName = p.brand || "k2";
    const categoryName = p.category?.tr?.[0];
    const category = categoryName ? slugify(categoryName) : (brandName === "vanti" ? "vantilator" : "aydinlatma");
    
    params.push({
      brandName: brandName,
      category: category,
      slug: slug
    });
  });

  return params;
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

  const pdfFormFile = getProductPdfFile(product.model, product.name.tr);

  // Here we re-use the exact same UI as the main site for the product detail.
  // The layout wrapper will automatically provide the BrandNavbar and BrandFooter.
  return <ProductDetailClient product={product} brandName={resolvedParams.brandName as "k2" | "vanti" | "global"} pdfFormFile={pdfFormFile} />;
}
