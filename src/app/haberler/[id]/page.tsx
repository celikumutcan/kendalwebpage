import React from "react";
import { newsData } from "@/data/news";
import { NewsDetailClient } from "./NewsDetailClient";

// Define the static paths to be generated at build time
export function generateStaticParams() {
  return newsData.map((news) => ({
    id: news.id,
  }));
}

export default async function HaberDetayPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return <NewsDetailClient id={resolvedParams.id} />;
}
