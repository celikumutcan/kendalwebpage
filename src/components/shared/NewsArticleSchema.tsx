import React from "react";
import { NewsItem } from "@/data/news-tr";

export const NewsArticleSchema = ({ news }: { news: NewsItem }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    image: news.images,
    datePublished: news.date,
    author: [{
      "@type": "Organization",
      name: "Kendal Elektrik",
      url: "https://www.kendalelektrik.com.tr"
    }],
    publisher: {
      "@type": "Organization",
      name: "Kendal Elektrik",
      logo: {
        "@type": "ImageObject",
        url: "https://www.kendalelektrik.com.tr/kendal-icon.png"
      }
    },
    description: news.content[0]?.slice(0, 155) ?? "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.kendalelektrik.com.tr/haberler/${news.id}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
