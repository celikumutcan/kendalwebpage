# Task: Fix SEO gaps and implement GEO (Generative Engine Optimization) across the Kendal Elektrik website

## Context

This is a Next.js 15 (App Router) site for Kendal Elektrik, a Turkish lighting/electrical equipment manufacturer. It's built with `output: "export"` (static export) and deployed to GitHub Pages under the `/kendalwebpage` basePath, with the real production domain being `https://www.kendalelektrik.com.tr`.

The site already has decent SEO fundamentals (canonical URLs, Open Graph tags, Twitter Cards, a basic `Organization` JSON-LD schema, `robots.ts`, `sitemap.ts`). However, an audit found concrete gaps in both traditional SEO and GEO (Generative Engine Optimization — the practice of making content easy for AI systems like ChatGPT, Google AI Overviews, Perplexity, and Gemini to parse, trust, and cite as a source).

**Your goal is twofold, and both matter equally:**
1. **Fix the SEO issues** listed below (technical correctness, per-page metadata, sitemap completeness).
2. **Implement GEO best practices** so AI crawlers can extract accurate, structured, citable facts about Kendal Elektrik — its history, numbers, products, and news — without needing to execute JavaScript or guess.

Do all of the items below. This is not a menu to pick from — implement every fix. Work file by file, and after each change, run a build (`npm run build`) to confirm nothing breaks the static export.

---

## Issue 1 (HIGH PRIORITY — SEO + GEO): Company stat numbers only exist as "0" in the rendered HTML

**File:** `src/components/sections/CompanyStats.tsx`

**Problem:** The stat numbers (years of experience, m² of facility, employee count, annual production volume, product variety, dealer count) are hardcoded as the literal text `0` in JSX:

```jsx
<span ref={(el) => { numberRefs.current[idx] = el; }}>0</span>
```

The real values only get written into the DOM imperatively via GSAP (`el.innerHTML = ...`) after a scroll-triggered animation runs client-side. Because this site is statically exported, the actual pre-hydration HTML that crawlers (including AI crawlers that don't execute JS, or that snapshot before animations run) receive contains "0" for every single stat. This means any AI system reading this page will see "0 Yıllık Tecrübe", "0 m² Kapalı Alan", etc., instead of the real numbers — actively wrong information about the company.

**Required fix:**
- Render the **real final value** (e.g. `29`, `22000`, `350+`, etc., using the existing `STATS` array data and formatting logic) directly in the JSX as the initial content of the `<span>`.
- Keep the GSAP count-up animation as a pure visual enhancement: it should animate the *displayed* number from 0 up to the real value on scroll, but the underlying server-rendered/static HTML must already contain the correct final number as text content (e.g. via `suppressHydrationWarning` if needed, or by initializing the counted value in a way that doesn't remove it from the static markup).
- Acceptance criteria: View source / static export output of the homepage must show the real numbers (e.g. "29", "22.000", "350+", "80", "1.000+", "540+") in the raw HTML for each stat, not "0".

---

## Issue 2 (HIGH PRIORITY — SEO): Every page shares the same `<title>` and meta description

**Problem:** Only `/kariyer` has its own `layout.tsx` with page-specific `metadata` (title: "Kariyer | Kendal Elektrik"). Every other route — `/projeler`, `/zincir-marketler`, `/haberler`, and critically **every individual news article** at `/haberler/[id]` — has no page-level metadata export, so they all inherit the root layout's generic metadata:
- Title: "Kendal Elektrik - Global Manufacturer Since 1997"
- Description: "Innovative lighting and electrical equipment."

This means dozens of distinct news articles and content pages are indistinguishable to search engines and AI crawlers by title/description alone — a major loss for both SEO ranking and GEO citability (AI systems favor content with clear, specific, unique framing per page).

**Required fix — add proper per-route metadata:**

1. **`/projeler`** (`src/app/projeler/page.tsx` is currently a client component): Create a `src/app/projeler/layout.tsx` (server component, same pattern as `src/app/kariyer/layout.tsx`) exporting `metadata` with a specific title (e.g. "Projeler | Kendal Elektrik") and a description summarizing Kendal's project/reference work, plus matching `openGraph` fields.

2. **`/zincir-marketler`**: Same pattern — create `src/app/zincir-marketler/layout.tsx` with a title like "Zincir Marketler | Kendal Elektrik" and a description about which retail chains carry Kendal products.

3. **`/haberler`** (news list page): Create `src/app/haberler/layout.tsx` with title "Haberler | Kendal Elektrik" and a description like "Kendal Elektrik'ten güncel kurumsal haberler, fuar katılımları ve ürün lansmanları."

4. **`/haberler/[id]`** (individual news articles — the most important fix in this group): This currently only has a server `page.tsx` that calls `generateStaticParams()` and renders a client component (`NewsDetailClient`). Add a `generateMetadata()` function to `src/app/haberler/[id]/page.tsx` that:
   - Looks up the news item by `id` from `newsDataTR` (or the appropriate language data source).
   - Sets `title` to the actual news headline (e.g. the `title` field from the news item), suffixed with " | Kendal Elektrik".
   - Sets `description` to a truncated (≈150-160 char) version of the first paragraph in `content`.
   - Sets `openGraph.images` to the first image in the news item's `images` array (fall back to the default OG image if none).
   - Sets `alternates.canonical` to the correct per-article URL.

   Example shape (adapt to this codebase's actual patterns and the `NewsItem` type in `src/data/news-tr.ts`):
   ```ts
   export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
     const { id } = await params;
     const news = newsDataTR.find((n) => n.id === id);
     if (!news) return {};
     const description = news.content[0]?.slice(0, 155) ?? "";
     return {
       title: `${news.title} | Kendal Elektrik`,
       description,
       alternates: { canonical: `/haberler/${id}` },
       openGraph: {
         title: news.title,
         description,
         type: "article",
         images: news.images[0] ? [{ url: news.images[0] }] : undefined,
       },
     };
   }
   ```

Acceptance criteria: Every route listed above must render a unique `<title>` and `<meta name="description">` in its static HTML output, and each must be genuinely descriptive of that page's specific content (not a copy-paste of the homepage's).

---

## Issue 3 (MEDIUM PRIORITY — SEO): `sitemap.ts` is missing most of the site's content pages

**File:** `src/app/sitemap.ts`

**Problem:** The current sitemap only lists: home, `/kariyer` and its 3 sub-pages, `/kvkk`, and `/gizlilik-cerez-politikasi`. It is missing:
- `/haberler` (the news list page)
- Every individual article at `/haberler/{id}` for every entry in `newsDataTR`
- `/projeler`
- `/zincir-marketler`

**Required fix:** Update `sitemap.ts` to programmatically include all news article URLs (import `newsDataTR` from `@/data/news-tr` and map each `id` to a `${baseUrl}/haberler/${id}` entry, using each article's real `date` for `lastModified` where feasible — parse the Turkish date format already used in the data), plus static entries for `/haberler`, `/projeler`, and `/zincir-marketler` with sensible `changeFrequency` and `priority` values consistent with the existing entries in the file.

Acceptance criteria: `sitemap.xml` output must contain a `<url>` entry for every route in the site, including every individual news article.

---

## Issue 4 (MEDIUM PRIORITY — GEO): No structured data (JSON-LD) on news articles

**Problem:** News articles are exactly the kind of dated, factual, citable content that AI Overview / ChatGPT Search / Perplexity prioritize when selecting sources — but there is currently zero `NewsArticle` or `Article` schema anywhere in the news detail template.

**Required fix:**
- Create a new component `src/components/shared/NewsArticleSchema.tsx`, following the same pattern as the existing `OrganizationSchema.tsx` (a component that renders a `<script type="application/ld+json">` tag).
- It should accept the news item as a prop and emit a `NewsArticle` schema with at minimum: `headline` (the title), `datePublished` (parsed from the `date` field), `image` (the `images` array), `publisher` (an `Organization` object referencing Kendal Elektrik, name + logo URL — reuse the same values as `OrganizationSchema.tsx`), `mainEntityOfPage` (the canonical article URL), and `description` (same truncated first paragraph used in Issue 2's metadata).
- Render `<NewsArticleSchema news={...} />` inside `src/app/haberler/[id]/page.tsx` (the server component, so it's present in the static HTML), passing the resolved news item.

Acceptance criteria: View source of any individual news article page must contain a valid `NewsArticle` JSON-LD block with the article's real headline, date, and image.

---

## Issue 5 (LOW PRIORITY — GEO): Strengthen the existing `OrganizationSchema`

**File:** `src/components/shared/OrganizationSchema.tsx`

**Problems found:**
- `logo` points to `https://www.kendalelektrik.com.tr/images/logo.png`, but based on `layout.tsx`, the actual site icon asset is `kendal-icon.png` — verify the real production logo path and fix this (it may currently be a broken link).
- `sameAs` only lists Facebook and Instagram, but the site's footer links to LinkedIn (`https://www.linkedin.com/company/kendal-elektrik-ayd%C4%B1nlatma-a-%C5%9F/`) as well — this is missing from the schema and should be added.
- No `address` (`PostalAddress`), `telephone`, or `contactPoint` fields are present, despite this information being visible in the site footer (address: "Selimpaşa Org. San. Böl. 5008 Sokak No:6 Selimpaşa Silivri/İSTANBUL"; phone lines: İletişim Hattı 0212 482 75 90, Satış Destek Hattı 0850 259 41 41, Teknik Servis Hattı 444 34 98; email: info@kendalelektrik.com.tr).

**Required fix:** Expand the schema object to include:
```ts
address: {
  "@type": "PostalAddress",
  streetAddress: "Selimpaşa Org. San. Böl. 5008 Sokak No:6",
  addressLocality: "Silivri/İstanbul",
  addressCountry: "TR",
},
contactPoint: [
  {
    "@type": "ContactPoint",
    telephone: "+90-212-482-75-90",
    contactType: "customer service",
  },
],
foundingDate: "1997", // already present, keep it
sameAs: [
  "https://www.facebook.com/kendalelektrik",
  "https://www.instagram.com/k2.ledsystem",
  "https://www.linkedin.com/company/kendal-elektrik-ayd%C4%B1nlatma-a-%C5%9F/",
],
```
Verify the real logo URL before hardcoding it, and correct the description to be a bit richer than the current one-liner if you have accurate company info to draw from elsewhere in the codebase (e.g. `AboutUs.tsx` copy) — don't invent facts, only use what's already stated elsewhere in the codebase.

---

## General rules while doing this work

- Do not fabricate any numbers, dates, addresses, or facts. Only use data that already exists somewhere in this codebase (component copy, `news-tr.ts`/`news-en.ts`, footer, etc.).
- Preserve the existing bilingual (TR/EN) structure — if a fix touches user-facing copy, make sure both `newsDataTR`/`newsDataEN` (or `tr.json`/`en.json`) paths are respected; metadata can default to Turkish since `metadataBase`/`html lang="tr"` are Turkish-first, but don't break the existing language-switching logic.
- Keep the existing static export (`output: "export"`) working — every fix must be compatible with `generateStaticParams` and build-time metadata generation, not runtime/server-only APIs.
- After finishing all 5 issues, run `npm run build` and confirm the build succeeds with no errors, then spot-check the generated static HTML output (in the `out/` directory) for at least: the homepage (real stat numbers, not "0"), one news article page (unique title/description + NewsArticle JSON-LD present), and `sitemap.xml` (contains all routes including individual news articles).
