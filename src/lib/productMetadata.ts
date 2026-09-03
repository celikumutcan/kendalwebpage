import type { Metadata } from 'next';
import {
  getProductCanonicalUrl,
  getProductImageUrl,
  type Product,
} from '@/data/products';

const NOT_FOUND_METADATA: Metadata = {
  title: 'Ürün Bulunamadı | Kendal Elektrik',
};

export function getProductDetailMetadata(
  product: Product | undefined,
): Metadata {
  if (!product) return NOT_FOUND_METADATA;

  const category = product.category?.tr?.[0];
  const description = `${product.name.tr}${category ? ` - ${category}` : ''} | Model: ${product.model}. Kendal Elektrik'in yerli üretim aydınlatma ve elektrik ürünleri arasında yer alan ${product.name.tr}, teknik özellikleri ve garanti koşullarıyla incelenebilir.`;
  const title = `${product.name.tr} | Kendal Elektrik`;
  const canonicalUrl = getProductCanonicalUrl(product);

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      images: [{ url: getProductImageUrl(product.image) }],
    },
  };
}
