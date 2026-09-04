import type { Metadata } from 'next';
import React from 'react';
import { NewsArticleSchema } from '@/components/shared/NewsArticleSchema';
import { newsData } from '@/data/news';
import { NewsDetailClient } from './NewsDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const news = newsData.find((n) => n.id === id);
  if (!news) return {};
  const description = news.content[0]?.slice(0, 155) ?? '';
  return {
    title: `${news.title} | Kendal Elektrik`,
    description,
    alternates: { canonical: `/haberler/${id}` },
    openGraph: {
      title: `${news.title} | Kendal Elektrik`,
      description,
      type: 'article',
      images: news.images[0] ? [{ url: news.images[0] }] : undefined,
    },
  };
}

export function generateStaticParams() {
  return newsData.map((news) => ({
    id: news.id,
  }));
}

export default async function HaberDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const news = newsData.find((n) => n.id === resolvedParams.id);

  return (
    <>
      {news && <NewsArticleSchema news={news} />}
      <NewsDetailClient id={resolvedParams.id} />
    </>
  );
}
