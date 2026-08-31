import type { MetadataRoute } from 'next';
import { newsData } from '@/data/news';
import { getProductCanonicalUrl, products } from '@/data/products';

export const dynamic = 'force-static';

const trMonths: { [key: string]: number } = {
  Ocak: 0,
  Şubat: 1,
  Mart: 2,
  Nisan: 3,
  Mayıs: 4,
  Haziran: 5,
  Temmuz: 6,
  Ağustos: 7,
  Eylül: 8,
  Ekim: 9,
  Kasım: 10,
  Aralık: 11,
};

function parseTRDate(dateStr: string): Date {
  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = trMonths[parts[1]];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return new Date(Date.UTC(year, month, day));
    }
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.kendalelektrik.com.tr';

  const newsEntries: MetadataRoute.Sitemap = newsData.map((news) => ({
    url: `${baseUrl}/haberler/${news.id}`,
    lastModified: parseTRDate(news.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const productEntries: MetadataRoute.Sitemap = Object.values(products).map(
    (product) => ({
      url: getProductCanonicalUrl(product),
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/urunler`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...productEntries,
    {
      url: `${baseUrl}/projeler`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/uretim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/misyon-ve-vizyon`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/zincir-marketler`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/haberler`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...newsEntries,
    {
      url: `${baseUrl}/kariyer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kariyer/insan-kaynaklari-politikamiz`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kariyer/temel-ilkelerimiz`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kariyer/insan-haklari-ve-calisan-haklari-politikasi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kvkk`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/gizlilik-cerez-politikasi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
