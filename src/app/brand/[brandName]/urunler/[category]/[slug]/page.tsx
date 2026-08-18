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

  const { getSlugByProductId } = require("@/data/products");
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
  return <ProductDetailClient product={product} brandName={resolvedParams.brandName as "k2" | "vanti" | "global"} pdfFormFile={pdfFormFile} />;
}
