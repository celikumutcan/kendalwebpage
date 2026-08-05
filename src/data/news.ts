import { newsDataTR, NewsItem } from "./news-tr";
import { newsDataEN } from "./news-en";

export type { NewsItem };
export { newsDataTR, newsDataEN };

// Fallback for static generation
export const newsData = newsDataTR;

