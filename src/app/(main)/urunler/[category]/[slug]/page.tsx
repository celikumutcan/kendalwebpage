import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { ProductDetailClient } from "@/app/(main)/[slug]/ProductDetailClient"; 

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
      category: category,
      slug: slug
    });
  });

  return params;
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
  
  const brandName = product.brand || "global";
  
  return <ProductDetailClient product={product} brandName={brandName as "k2" | "vanti" | "global"} />;
}
