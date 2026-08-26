import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllSlugs, getProductImageUrl, getProductCanonicalUrl, getSlugByProductId } from "@/data/products";
import { getProductPdfFile } from "@/lib/getProductPdfForm";
import { ProductDetailClient } from "./ProductDetailClient";
import { ProductSchema } from "@/components/shared/ProductSchema";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product = getProductBySlug(decodedSlug);

  if (!product) {
    return {
      title: "Ürün Bulunamadı | Kendal Elektrik",
    };
  }

  const category = product.category?.tr?.[0];
  const description = `${product.name.tr}${category ? ` - ${category}` : ""} | Model: ${product.model}. Kendal Elektrik'in yerli üretim aydınlatma ve elektrik ürünleri arasında yer alan ${product.name.tr}, teknik özellikleri ve garanti koşullarıyla incelenebilir.`;
  const canonicalUrl = getProductCanonicalUrl(product);

  return {
    title: `${product.name.tr} | Kendal Elektrik`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${product.name.tr} | Kendal Elektrik`,
      description,
      type: "website",
      url: canonicalUrl,
      images: [{ url: getProductImageUrl(product.image) }],
    },
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

  const canonicalSlug = getSlugByProductId(product.id);
  if (canonicalSlug && canonicalSlug !== decodedSlug) {
    const { redirect } = require("next/navigation");
    redirect(`/${encodeURIComponent(canonicalSlug)}`);
  }

  const pdfFormFile = getProductPdfFile(product.model, product.name.tr);
  const canonicalUrl = getProductCanonicalUrl(product);
  const category = product.category?.tr?.[0];

  return (
    <>
      <ProductSchema product={product} canonicalUrl={canonicalUrl} />
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", url: "https://www.kendalelektrik.com.tr/" },
          { name: "Ürünler", url: "https://www.kendalelektrik.com.tr/urunler" },
          ...(category ? [{ name: category, url: "https://www.kendalelektrik.com.tr/urunler" }] : []),
          { name: product.name.tr, url: canonicalUrl },
        ]}
      />
      <ProductDetailClient product={product} pdfFormFile={pdfFormFile} />
    </>
  );
}
