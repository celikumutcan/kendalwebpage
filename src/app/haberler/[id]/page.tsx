import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsData } from "@/data/news";
import { ImageSlider } from "@/components/ui/ImageSlider";

// Define the static paths to be generated at build time
export function generateStaticParams() {
  return newsData.map((news) => ({
    id: news.id,
  }));
}

export default async function HaberDetayPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const news = newsData.find((n) => n.id === resolvedParams.id);

  if (!news) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/haberler" className="inline-flex items-center text-gray-400 hover:text-[var(--brand-red)] transition-colors text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tüm Haberlere Dön
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 text-center">
          <div className="inline-block px-3 py-1 rounded-full border border-[var(--brand-red)]/30 bg-[var(--brand-red)]/10 text-xs font-semibold tracking-wider text-[var(--brand-red)] mb-6 uppercase">
            Kurumsal Haberler
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {news.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span>{news.date}</span>
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
            <span>Okuma Süresi: {news.readTime}</span>
          </div>
        </header>

        {/* Dynamic Image Slider Component (Client Side) */}
        <ImageSlider images={news.images} />

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed mt-12 text-justify">
          {news.content.map((paragraph, idx) => (
            <p key={idx} className={idx === 0 ? "text-xl text-white font-medium mb-8" : "mb-6"}>
              {paragraph}
            </p>
          ))}
        </article>

      </div>
    </div>
  );
}
