# Kendal Webpage Project Overview

Welcome to the Kendal Webpage project. 

## 🧠 Codebase Navigation (Graphify Workflow)
**CRITICAL**: This project uses **Graphify** (`@sentropic/graphify`) to map the codebase into a queryable dependency graph.
1. **DO NOT** use brute-force grep searches, file tree crawling, or broad file reading to understand dependencies or imports.
2. Instead, refer directly to the generated AST/Graph in the `.graphify/` directory to trace component imports, references, and relationships.
3. Use the `npx @sentropic/graphify` tools (like `query`, `summary`, or `explain`) if you need to perform deep impact analysis.
4. If you make significant structural changes (new files, removed dependencies), run `npx @sentropic/graphify extract ./` to keep the local graph up to date.

This document contains high-level routing, component inventory, data schemas, and conventions. Treat it as the source of truth for architecture. For exact code references, rely on the Graphify output.

## Tech Stack
- **Framework:** Next.js (v16+) with App Router (`src/app`), built as a **fully static export** (`output: "export"` in production — no SSR/ISR at runtime)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/postcss`)
- **Animations:** GSAP (v3.15+) + ScrollTrigger
- **Smooth Scrolling:** Lenis
- **3D Graphics:** Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Geo/maps:** `d3-geo` + `topojson-client` (custom SVG maps, no map library/tiles)
- **Code Quality:** ESLint

## Deployment model (important — affects how code must be written)

The site is built as a **static export** and deployed to two different targets from the same codebase (`next.config.ts`):

- **Production (cPanel, `kendalelektrik.com.tr`)**: root path, `NEXT_PUBLIC_BUILD_MODE` unset. `output: "export"`, `images.unoptimized: true`, `trailingSlash: true`.
- **GitHub Pages preview**: `NEXT_PUBLIC_BUILD_MODE=ghpages` (set in `.github/workflows/nextjs.yml`) → adds `basePath`/`assetPrefix: "/kendalwebpage"` since it's served from a repo-name subpath.
- Every static asset reference (images, PDFs, icons) **must** go through `getAssetPath()` / `getBasePath()` (`src/lib/basePath.ts`) so it resolves correctly under both targets — used in 37+ files. When adding new image/PDF references, use this helper, don't hardcode `/images/...`.
- There is **no `headers()` config** in `next.config.ts` — this is intentional: `output: "export"` doesn't support it. Security headers (CSP, HSTS, X-Frame-Options) are instead served by Apache via `public/.htaccess` on the cPanel side.
- No `redirects()`/`rewrites()` config either. The one redirect the app needs (canonical product slug) is done at runtime via `next/navigation`'s `redirect()` inside the page component — see the `[slug]` section below.
- `images.qualities: [25, 50, 70, 75, 80, 100]` is set in all environments.

## Directory Structure & Architecture

### `src/app/` (Routing) — full tree

```
src/app/
├── layout.tsx                # Root layout: <html lang="tr">, Inter font, global metadata (title/OG/twitter/metadataBase)
│                              #   Provider chain: LanguageProvider → SmoothScrollProvider (Lenis) → LightTemperatureProvider
│                              #   → GsapContext → OrganizationSchema + CustomCursor + {children}
├── globals.css
├── robots.ts                  # force-static; allow:"/" for all UAs; points to sitemap.xml
├── sitemap.ts                 # force-static; static pages + all news ids + getProductCanonicalUrl() for every product
│
├── (main)/                    # Route group — main corporate site (no URL segment)
│   ├── layout.tsx              # Navbar + <main>{children}</main> + Footer + CookieConsentBanner + ScrollToTop (no providers)
│   ├── page.tsx                 # "/" → HomeClient.tsx
│   ├── HomeClient.tsx           # "use client": Loader, Hero, AboutUs, OurBrands, CompanyStats, GlobalPresence,
│   │                            #   CompanyVideo, NewsTicker, NewsPreview, Certifications, CatalogCTA, ApertureTransition
│   │
│   ├── [slug]/                  # SHORT product URL: /{slug} — e.g. /ges230-20w-torch-led-ampul-beyaz
│   │   ├── page.tsx              # generateStaticParams = getAllSlugs() (every slug-map.json key, incl. non-canonical)
│   │   │                         # generateMetadata (inline, does NOT reuse lib/productMetadata.ts — duplicated logic)
│   │   │                         # redirects to canonical slug if decodedSlug !== getSlugByProductId(product.id)
│   │   │                         # renders ProductDetailClient + ProductSchema + BreadcrumbSchema
│   │   └── ProductDetailClient.tsx  # "use client" — main product detail UI, brand-themed
│   │
│   ├── urunler/
│   │   ├── page.tsx              # "/urunler" — <Suspense><CategoryFirstShowcase products={all}/></Suspense>
│   │   └── [category]/[slug]/page.tsx  # "/urunler/{category}/{slug}" — canonical product URL (brand-neutral)
│   │       # generateStaticParams built from Object.values(products), NOT slug-map — only canonical slugs get pages
│   │       # generateMetadata uses shared lib/productMetadata.ts::getProductDetailMetadata()
│   │
│   ├── haberler/
│   │   ├── layout.tsx            # metadata-only pass-through (no visual wrapper)
│   │   ├── page.tsx               # "/haberler" → HaberlerListesiClient.tsx (list, sorted via parseNewsDate)
│   │   └── [id]/page.tsx + NewsDetailClient.tsx   # generateMetadata + generateStaticParams from newsData ids
│   │
│   ├── kariyer/
│   │   ├── layout.tsx (metadata-only), page.tsx → KariyerClient.tsx
│   │   ├── insan-kaynaklari-politikamiz/page.tsx + HrPolicyClient.tsx
│   │   ├── temel-ilkelerimiz/page.tsx + PrinciplesClient.tsx
│   │   └── insan-haklari-ve-calisan-haklari-politikasi/page.tsx + HumanRightsClient.tsx
│   │
│   ├── uretim/          layout.tsx (metadata-only) + page.tsx → UretimClient.tsx
│   ├── projeler/         layout.tsx (metadata-only) + page.tsx → renders <Projects/> directly (no client wrapper)
│   ├── zincir-marketler/ layout.tsx (metadata-only) + page.tsx → renders <RetailPresence/> directly
│   ├── misyon-ve-vizyon/ page.tsx → MissionVisionClient.tsx
│   ├── kvkk/             page.tsx → KVKKContent.tsx
│   └── gizlilik-cerez-politikasi/ page.tsx → PrivacyContent.tsx
│
└── brand/                      # Route group — brand micro-sites, own BrandNavbar/BrandFooter
    └── [brandName]/              # "k2" | "vanti" | "global" — generateStaticParams fixes exactly these 3
        ├── layout.tsx             # generateMetadata (brand favicon) + BrandNavbar/BrandFooter/ScrollToTop (themed color)
        ├── page.tsx                # "/brand/{brandName}" → K2CreativePage / VantiCreativePage / GlobalCreativePage
        └── urunler/
            ├── page.tsx            # brand-filtered CategoryFirstShowcase (isBrandScoped=true)
            └── [category]/[slug]/page.tsx  # brand+category+slug product detail; brandName also passed to ProductDetailClient
                # NOTE (known quirk): the canonical-slug redirect() here targets /urunler/{category}/{canonicalSlug}
                # WITHOUT the brand prefix — likely unintentional, hasn't been fixed, worth checking if touching this route.
```

There are **no** `loading.tsx` / `error.tsx` / `not-found.tsx` files anywhere in the project — not-found handling relies solely on Next's default via `notFound()` calls.

**Three separate product-detail routes exist** (`(main)/[slug]`, `(main)/urunler/[category]/[slug]`, `brand/[brandName]/urunler/[category]/[slug]`), all reading from the same `src/data/products.ts` data layer and rendering the same `ProductDetailClient`. The first is the legacy/short-URL form (kept for old links, generates a page per slug-map entry incl. duplicates, then redirects non-canonical ones); the other two are canonical, one page per product.

### `src/components/` — full inventory

62 files across `sections/`, `ui/`, `engine/`, `shared/`, `loader/`, and `brand/` (with `brand/k2/`, `brand/vanti/`, `brand/global/`, `brand/shared/`). **All are client components (`"use client"`) except the four JSON-LD schema components in `shared/`**, which are plain server components with no hooks.

#### `engine/` — animation & 3D infrastructure
- **`GsapContext.tsx`** — app-wide GSAP lifecycle root (wraps whole app in root layout). Creates one root `gsap.context()`, and listens for the `contentvisibilityautostatechange` CSS event on every `<section>` to debounce (150ms) `ScrollTrigger.refresh()` calls; also listens for a custom `window` `scroll-refresh` event (see "scroll-sync convention" below). Individual sections still create their **own** `gsap.context()` scoped to their own container ref — this is not a replacement for per-section contexts.
- **`SmoothScrollProvider.tsx`** — creates the single app-wide `Lenis` instance, exposes `useLenis()` via `LenisContext`. Hooks Lenis's raf into `gsap.ticker`, calls `ScrollTrigger.update()` on scroll, sets `history.scrollRestoration = "manual"`.
- **`Globe.tsx`** — R3F rotating Earth with ~40 hardcoded `LOCATIONS`, animated dashed arcs (custom `THREE.ShaderMaterial`, not drei's MeshLine) from Turkey (HQ) to each location, glowing pins. Camera z lerps from a `scrollProgressRef` (fed by a `ScrollTrigger` in the parent section). Color cross-fades cool→warm via `useLightTemperature()`. `Canvas frameloop` toggles `"always"`/`"never"` based on `useInView()`. Used by `sections/GlobalPresence.tsx` (dynamic import, `ssr:false`).
- **`LightCore.tsx`** — R3F full-screen plane with a custom radial-glow shader; `uScroll` uniform expands radius as you scroll, `uColor` lerps cool→warm via `useLightTemperature()`. Same `useInView()` frameloop gating. Used by `sections/Hero.tsx` (dynamic import, mounted after two `requestAnimationFrame`s post-hydration to not compete with first paint).

Pattern: 3D Canvases are always `next/dynamic({ssr:false})`, mounted as fixed/absolute full-bleed backgrounds, never imported eagerly.

#### `loader/Loader.tsx`
Full-screen page loader (`Loader({onComplete})`) shown until first paint. Faux progress bar capped ~90% until `document.readyState==='complete'`; at 100% plays a GSAP curtain-wipe reveal then calls `onComplete`.

#### `shared/` — small reusable pieces
- **`SplitText.tsx`** — `SplitText({text, className, delay, stagger})`, splits text into words, GSAP stagger-reveals them on `ScrollTrigger` (`start: "top 85%"`).
- **`ApertureTransition.tsx`** — scroll-scrubbed radial-gradient iris wipe; animates a plain object's `radius` via `scrollTrigger:{scrub:1}` and manually repaints a fixed overlay's background in `onUpdate` (direct style mutation, not CSS var, for perf).
- **`OrganizationSchema.tsx`, `ProductSchema.tsx`, `NewsArticleSchema.tsx`, `BreadcrumbSchema.tsx`** — server components, each renders one `<script type="application/ld+json">` (schema.org `Organization`/`Product`/`NewsArticle`/`BreadcrumbList`). `ProductSchema` takes `{product, canonicalUrl}` and maps brand codes to display names.

#### `ui/` — global chrome
- **`Navbar.tsx`** — main-site nav; dropdown groups from hardcoded `navGroups` (brand links → `/brand/{name}` in prod, `http://{brand}.localhost:3000` in dev — subdomain-per-brand convention). Tracks active section via scroll position, handles hash-anchor scroll via `useLenis()` using the scroll-sync convention (see below). Has its own mobile accordion menu.
- **`BrandNavbar.tsx`** — brand micro-site nav variant, themed per brand (`brandThemes` map). Fades in after 2.2s specifically on the Global brand homepage (`isGlobalHomePage`), to let its intro play first.
- **`Footer.tsx` / `BrandFooter.tsx`** — main vs. brand footer; `BrandFooter({brandName})` swaps logo/socials (Instagram link only for K2).
- **`CustomCursor.tsx`** — large soft radial-gradient blob following the mouse via direct `style.transform` mutation (no React state/rAF), hidden on coarse-pointer/touch devices. No context/provider — standalone.
- **`CookieConsentBanner.tsx`** — reads/writes `localStorage["kendal-cookie-consent"]`.
- **`LanguageSwitcher.tsx`** — TR/EN toggle via `useLanguage()`.
- **`ImageSlider.tsx`** — `ImageSlider({images, altPrefix, titlePrefix})`, self-contained auto-advancing carousel (4s interval, pause on hover), plain `useState`/`useEffect`, no GSAP.
- **`ScrollToTop.tsx`** — floating button (visible after `scrollY>300`), uses `useLenis()` + the scroll-sync convention to smooth-scroll to top.

#### `sections/` — page-level sections (mostly homepage)
All follow the same pattern: `useRef` container + `useIsomorphicLayoutEffect` wrapping `gsap.context(() => {...}, containerRef)` returning `ctx.revert()` on cleanup; ScrollTrigger reveals (`start:"top 80%"` fade+slide-up, or `scrub` for pinned/parallax). Copy comes from `useLanguage()`.

- **`Hero.tsx`** — `h-[150vh]` sticky hero hosting `LightCore` as background, tracks scroll progress into a ref.
- **`GlobalPresence.tsx`** — sticky section hosting `Globe` as background.
- **`AboutUs.tsx`** — two-column about+timeline; scrubbed vertical "wire" scale animation. Code comment notes a past perf fix: switched from scrubbing `filter` (brightness/grayscale, paint-heavy) to scrubbing `opacity`.
- **`WhyUs.tsx`** — 5-feature grid, inline SVG icons, staggered fade-in.
- **`CompanyStats.tsx`** — animated counters (`gsap.to(obj,{val:target})` driving `innerHTML`).
- **`Certifications.tsx`** — cert logo grid; hovering the ISO cert reveals 4 sub-certs radiating out with dashed SVG connector lines.
- **`CompanyVideo.tsx`** — click-to-play YouTube embed (lazy, thumbnail until clicked).
- **`BrandsStrip.tsx`** — simple 3-logo strip (K2/Vanti/Global), no GSAP.
- **`OurBrands.tsx`** — brand-card grid, GSAP stagger-reveal, per-brand glow color via CSS var.
- **`Projects.tsx`** — auto-scrolling horizontal carousel of ~43 hardcoded reference projects (`REFERENCE_DATA`), `setInterval`-based autoplay (not GSAP), pause on hover/touch.
- **`RetailPresence.tsx`** — static retailer logo grid (BİM, A101, Koçtaş, etc.), no GSAP.
- **`ProductGallery.tsx`** — category tile grid, staggered fade-in.
- **`NewsTicker.tsx`** — infinite marquee via `gsap.to({xPercent:-50, repeat:-1}, duration:40s)` on a doubled list.
- **`NewsPreview.tsx`** — latest 3 news cards, imports `news-tr`/`news-en` directly (not via `news.ts`), sorted with `parseNewsDate`. No GSAP.
- **`CatalogCTA.tsx`** — PDF catalog download CTA, single fade-in.
- **`BrandHero.tsx`, `BrandAbout.tsx`, `BrandProductsHeader.tsx`, `BrandProductShowcase.tsx`** — ⚠️ generic brand-name–parameterized sections that look like an **older/simpler alternative** to the `brand/*CreativePage.tsx` + `CategoryFirstShowcase` combo. Grep for usage before assuming they're live.
- **`ProductCompareModal.tsx`** — `ProductCompareModal({items, language, brandName, texts, onClose, onRemove})`, portal-rendered comparison table (parses `" / "`-delimited attribute values into bullet lists).

##### `sections/CategoryFirstShowcase/` — the main product catalog browser
Used on `/urunler` and brand product pages.
- **`index.tsx`** — default export `CategoryFirstShowcase({products, brandName, isBrandScoped})`. Manages category/group drill-down (K2 has a two-level category→group hierarchy via `getCategoryGroupForCategory`), search (`?q=`), pagination (`?page=`, 15/page), variant filters (casing/watt/socket from `variantOptions`), and a compare tray (max 3, `MAX_COMPARE`). **All state syncs to the URL query string** (`router.replace(...,{scroll:false})`, rehydrated from `useSearchParams()`).
- **`CategoryCard.tsx`** — category/group tile, Tailwind `animate-in`-style stagger (not GSAP).
- **`ProductCard.tsx`** — product tile; conditional "Compare" chip; strips variant tokens from display name for Global brand via `stripVariantTokens()`.
- **`CompareTray.tsx`** — fixed-bottom tray of selected products + "Compare (n)" button.
- **`FiltersPanelContent.tsx`** — tabbed filter panel (casings/watts/sockets), shared between desktop popover and mobile modal.
- **`helpers.ts`** — `MAX_COMPARE=3`, `getBaseModelKey()`, `slugify()`, `getVisiblePages()` (pagination ellipsis), `getProductCardUrl()`.

#### `brand/` — brand micro-site "creative" landing pages
Each brand (`k2`/`vanti`/`global`) has a large, self-contained one-page story (hero → trust stats → features → category/product marquee → map → CTA) with a full-bleed R3F 3D background and a curtain preloader gated on the 3D scene reporting ready (`onReady` → `sceneReady` → intro timeline plays once, guarded by `introPlayedRef`).

- **`brand/k2/K2CreativePage.tsx`** — orange/dark "mountain summit" theme. Inline bilingual copy (`translations.tr`/`translations.en`) — **does not use the shared `useLanguage()`/`t.*` i18n system**, only reads `language` from it.
  - `K2Scene.tsx` — low-poly cone-geometry mountains + taller "K2 summit", a `Sunrise` that warms color/intensity as a **module-level** scroll-driven variable (`k2DawnProgress`) increases, drei `<Sparkles>`, mouse-parallax rotation. `frameloop` off when tab hidden.
  - `K2Preloader.tsx` — curtain-wipe intro gated on `ready` prop.
- **`brand/vanti/VantiCreativePage.tsx`** — teal/sky "cooling breeze" theme. Same inline-translations pattern.
  - `VantiScene.tsx` — 3D fan rotor (`AeroBlades`) whose spin velocity is driven by **scroll delta** (faster scroll = faster spin, with damping), drifting torus shapes (`<Float>`), `<Sparkles>`, `<Environment>`.
  - `VantiPreloader.tsx` — same curtain pattern, sky-blue.
  - `VantiProductFamilies.tsx`, `VantiVideoShowcase.tsx` — CSS-marquee lists (`.k2-marquee-track`/`.k2-marquee-pause` classes in globals.css), not GSAP.
- **`brand/global/GlobalCreativePage.tsx`** — yellow/gold "light switch" theme. Distinctive intro: hand-drawn cursor SVG animates to a switch icon, "clicks" it, triggers a black→cream (`#fdfbf5`) flash transition. No dedicated preloader component (unlike k2/vanti) — the switch-click sequence IS the reveal.
  - `GlobalScene.tsx` — simplest of the three scenes: a chandelier/bulb mesh whose color/light intensity fades in based on a **module-level** `globalScrollProgress`.
- **`brand/shared/`**:
  - `CategoryShowcase.tsx` — infinite marquee of category cards, groups K2 categories via `getCategoryGroupForCategory`, pure CSS animation, theme-aware.
  - `ProductCarousel.tsx` — ⚠️ similar marquee of individual products; not wired into any of the three `*CreativePage.tsx` files — possible dead code.
  - `DealerMap.tsx`/`DealerMapInner.tsx` — Turkey provinces SVG map (dealer coverage). Outer lazy-loads inner via `next/dynamic({ssr:false})` gated by `IntersectionObserver` (`rootMargin:400px`). Inner converts `@/data/turkey-provinces.json` (TopoJSON) via `topojson-client`, custom (non-d3) equirectangular-like `project()` function.
  - `ExportMap.tsx`/`ExportMapInner.tsx` — same lazy-on-intersect pattern, world map using real `d3-geo` (`geoPath`, `geoEquirectangional`, `geoGraticule`) + `topojson-client` on `@/data/world-land-110m.json`, dashed glowing arcs from `HQ` to `EXPORT_COUNTRIES`, click-to-zoom.

#### Cross-cutting conventions (read before touching animation/3D code)
1. **GSAP pattern** (~30+ occurrences): `useRef` + `useIsomorphicLayoutEffect` wrapping `gsap.context(() => {...}, scopeRef)`, cleanup via `ctx.revert()`. `gsap`/`ScrollTrigger` imported from the shared `@/lib/gsapConfig` wrapper everywhere **except** the three `brand/*CreativePage.tsx` files, which import `gsap`/`ScrollTrigger` directly and call `gsap.registerPlugin(ScrollTrigger)` themselves at module scope — a deliberate but inconsistent second setup path.
2. **R3F perf gating**: two different strategies exist — `useInView()`-driven `frameloop` toggling (Globe/LightCore, homepage) vs. `document.visibilitychange`-driven toggling (K2Scene/VantiScene, brand pages). Scroll-reactive uniforms are driven either via a `scrollProgressRef` passed down from a parent `ScrollTrigger.create({onUpdate})` (Globe/LightCore), or via a **module-level mutable singleton variable** updated by a raw `window.scroll` listener inside the scene component itself (`globalScrollProgress` in GlobalScene, `k2DawnProgress` in K2Scene) — the latter is a hacky pattern worth knowing about before refactoring those scenes.
3. **Scroll-sync coordination convention**: whenever code does a programmatic `lenis.scrollTo(...)`, it (a) sets `window.isProgrammaticScroll = true`, (b) adds a `disable-cv` class to `<body>` (disables `content-visibility` to avoid layout jumps during the animated scroll), (c) on complete dispatches a custom `window` event `scroll-refresh`, which `GsapContext` listens for to trigger a debounced `ScrollTrigger.refresh()`. This exact triple repeats in `Navbar.tsx` (twice) and `ScrollToTop.tsx` — follow it exactly if adding new programmatic-scroll code, or `ScrollTrigger` positions will desync after `content-visibility:auto` toggles.
4. **i18n split**: most of `sections/`/`ui/` use the shared `useLanguage()`/`t.*` dictionary system, but all three `brand/*/*CreativePage.tsx` files define their own local bilingual `translations = {tr:{...}, en:{...}}` object and only read `language` from `useLanguage()`. Don't assume brand-page copy lives in `src/lib/i18n/*.json` — it doesn't.
5. **Legacy/duplicate candidates worth a grep-for-usage pass before assuming dead**: `sections/BrandHero.tsx`, `BrandAbout.tsx`, `BrandProductsHeader.tsx`, `BrandProductShowcase.tsx` (overlap with `brand/*CreativePage.tsx` + `CategoryFirstShowcase`); `brand/shared/ProductCarousel.tsx` (not referenced by any creative page read so far); `src/data/products_backup.json` (not imported anywhere).

### `src/data/` (Static Data) — full schemas

#### `products.json` + `src/data/products.ts` (data-access layer)
**Shape**: flat `Record<string, Product>` keyed by product id — **no nested category tree**. 923 products. Brand split: `k2`=822, `vanti`=53, `global`=48. 53 distinct TR category names (top: LED Paneller 127, Spotlar 116, LED Ampuller 91, Vantilatörler 53...). `images[]` (multi-image) present on only 49/923 products (rest use single `image`). `variantOptions` present on 901/923 (sub-keys: `watt` 710, `light` 425, `casing` 142, `socket` 28, rare `tip`/`color`/`açıklama`/`batarya`/`işık gücü`).

TypeScript type (defined in `products.ts`, not in the JSON itself):
```ts
export interface ProductAttribute { label: string; value: string; }
export interface Product {
  id: string; model: string; image: string; images?: string[];
  name: { tr: string; en: string };
  attributes: { tr: ProductAttribute[]; en: ProductAttribute[] };
  category?: { tr: string[]; en: string[] };
  brand?: string;
  variantOptions?: { watt?: string|null; socket?: string|null; light?: string|null; casing?: string|null };
}
```
Example record (abridged, `products["4206"]`):
```json
{
  "id": "4206", "model": "GDL41425WPANARA", "image": "urunler/gdl414.webp",
  "name": { "tr": "GDL414 SLIM BACKLIGHT SIVA ALTI PANEL", "en": "GDL414 SLIM BACKLIGHT RECESSED PANEL" },
  "attributes": { "tr": [{"label":"Watt","value":"25W"}, {"label":"Lümen","value":"2300"}, ...], "en": [...] },
  "category": { "tr": ["LED Paneller"], "en": ["LED Panels"] },
  "brand": "global",
  "variantOptions": { "watt": "25W", "light": "Ararenk (4000K)" }
}
```
`src/data/products_backup.json`: same schema, **not imported anywhere** (manual backup only, not part of app logic).

Key functions in `products.ts`:
- `getProductBySlug(slug)` — resolves via `slugMap[slug]`, falls back to treating `slug` as a raw product id.
- `getAllSlugs()` — `Object.keys(slugMap)`, used for `(main)/[slug]` static params.
- `getSlugByProductId(id)` — derives canonical slug from `slugify(name.tr)`, checks it maps back to the same id in `slugMap`; else falls back to the first matching entry in a reverse `idToSlugMap`.
- `slugify()` — lowercases, maps Turkish chars (ı,ü,ö,ş,ğ,ç) to ASCII, spaces/specials → `-`.
- `getProductImageUrl(image)` — `getAssetPath('/images/' + image)`.
- `BRAND_HOSTS` — brand → canonical domain map (k2/vanti/global subdomains).
- `CATEGORY_GROUPS` — K2's two top-level menu groups: `armatur` (19 category names) and `digerleri` (17 names).
- `getCategoryGroupForCategory`, `getProductCategorySlug`, `getProductCanonicalUrl` — used by SEO metadata and static route generation.

#### `slug-map.json`
Flat `Record<slug, productId>`, 4470 entries. Example:
```json
{ "ges230-20w-torch-led-ampul-beyaz": "GES230", "ges231-30w-torch-led-ampul-beyaz": "GES231" }
```
⚠️ Not all values match a current `products.json` key: of 913 distinct values, 904 resolve; ~9 point to ids no longer in `products.json` (dead/renamed products, e.g. `7887`, `KLF176PLUS`, `5009`). A product can have multiple slugs (old-URL backward compatibility), which is why "canonical slug" is a distinct concept from "any slug that resolves."

Route usage: `(main)/[slug]/page.tsx` generates a page for **every** slug-map entry (including non-canonical), then `redirect()`s to the canonical slug at render time if they differ. `urunler/[category]/[slug]` and `brand/.../[category]/[slug]` instead build `generateStaticParams` from `Object.values(products)` directly — one page per product, canonical slugs only.

#### `news.ts`, `news-tr.ts`, `news-en.ts`
`news.ts` is a thin re-export layer:
```ts
export { newsDataTR, newsDataEN }; export type { NewsItem };
export const newsData = newsDataTR; // default/back-compat
```
`news-tr.ts`/`news-en.ts` are parallel arrays (not a key-value dictionary) matched by shared string `id`s, ~37 items each:
```ts
export interface NewsItem { id: string; title: string; date: string; images: string[]; content: string[]; }
```
`date` is free text (TR: `"13 Nisan 2024"`, EN: `"Apr 13, 2024"`) — **not ISO** — so sorting uses `src/lib/newsDate.ts`'s `parseNewsDate()`. Consumers: `HaberlerListesiClient.tsx` and `NewsDetailClient.tsx` (pick `newsDataEN`/`newsDataTR` by current language), `sections/NewsPreview.tsx` (imports `news-tr`/`news-en` directly, bypassing `news.ts`), `app/sitemap.ts`.

#### Other `src/data/` files
- **`exportCountries.ts`** — TS (not JSON). `ExportCountry {id, flag, nameTr, nameEn, lat, lon}`, `HQ` (Turkey centroid), `EXPORT_COUNTRIES` (40 countries). Used by `brand/shared/ExportMapInner.tsx`.
- **`turkey-provinces.json`**, **`world-land-110m.json`** — TopoJSON geo data, consumed via `topojson-client` by `DealerMapInner.tsx` and `ExportMapInner.tsx` respectively.
- **`world-land-110m.LICENSE.txt`** — attribution only (Natural Earth/world-atlas), not read by code.

### `src/lib/` (Utilities & Contexts) — every file
- **`gsapConfig.ts`** — registers `ScrollTrigger` (SSR-guarded), exports `GSAP_DEFAULTS` (`ease:"power3.out", duration:1.2`) and `ST_DEFAULTS` (`start:"top 85%", toggleActions:"play none none reverse"`), re-exports `gsap`/`ScrollTrigger`. The central import for nearly every animated component (see GSAP convention above).
- **`LightTemperatureProvider.tsx`** — global `ScrollTrigger` over `document.body` (`scrub:true`), lerps a cool blue (`#d8e4ff`) → warm orange (`#ffb347`) `THREE.Color` and writes CSS vars `--light-temp`/`--accent-current`. Rounds progress to 1/500 to reduce redundant DOM writes. `useLightTemperature()` exposes `getProgress()`. Wraps app in root layout; consumed by `LightCore.tsx`/`Globe.tsx`.
- **`useInView.ts`** — `useInView<T extends HTMLElement>(rootMargin="200px")`, `IntersectionObserver`-based, returns `[ref, isInView]` (defaults `isInView=true`). Used by `Globe.tsx`/`LightCore.tsx` for frameloop gating.
- **`useIsomorphicLayoutEffect.ts`** — `typeof window !== "undefined" ? useLayoutEffect : useEffect`. Paired with GSAP setup in nearly every animated component.
- **`basePath.ts`** — `getBasePath()`/`getAssetPath()`, see Deployment section above. Used in 37+ files for every static asset path.
- **`getProductPdfForm.ts`** — server-side (`fs`/`path`, build/SSG time only) scan of `public/urun-bilgi-formlari/`; `getProductPdfFile(model, nameTr)` matches a PDF whose filename-derived code is contained in the model or TR name. Used by all three product-detail `page.tsx` files for the "Ürün Bilgi Formu" download link.
- **`newsDate.ts`** — `parseNewsDate(dateStr)` parses free-text TR/EN dates into a sortable `Date.UTC(...)` number (separate TR/EN month-name dictionaries); returns `0` on no match. Used by `HaberlerListesiClient.tsx`, `NewsPreview.tsx`.
- **`productMetadata.ts`** — `getProductDetailMetadata(product)` builds Next `Metadata` (title/description/canonical). Shared by `urunler/[category]/[slug]` and `brand/.../[category]/[slug]` — **not** by `(main)/[slug]/page.tsx`, which still inlines its own near-duplicate `generateMetadata` logic.
- **`i18n/LanguageProvider.tsx`** — `Language = "tr"|"en"`, persisted to `localStorage["kendal-language"]`, syncs `document.documentElement.lang`. `useLanguage()` throws if used outside the provider. Consumed in 40 files — the site-wide UI-text i18n mechanism (distinct from the news/product data i18n, which is done via parallel data structures, not this dictionary).
- **`i18n/tr.json` / `en.json`** — parallel nested dictionaries (`nav.about`, etc.), 319 lines each.

### TypeScript type locations
There is **no central `src/types/` domain-types folder** — domain types (`Product`, `ProductAttribute`, `NewsItem`, `ExportCountry`, `CategoryGroupDef`) are each defined inline in their owning data file (`products.ts`, `news-tr.ts`/`news-en.ts` duplicated, `exportCountries.ts`). The only file under `src/types/` is `topojson-client.d.ts`, a hand-written ambient module declaration for the untyped `topojson-client` npm package.

## Key Concepts (quick summary)
1. **Performance & Animation:** GSAP + ScrollTrigger for scroll-driven reveals/pins, Lenis for smooth scroll. `GsapContext` is the app-wide lifecycle root; every section additionally scopes its own `gsap.context()`. See "Cross-cutting conventions" above for the exact scroll-sync and R3F-gating patterns — follow them exactly when adding new scroll-driven code.
2. **3D Elements:** R3F scenes (`Globe`, `LightCore`, and the three brand `*Scene.tsx` files) are always `dynamic({ssr:false})`, full-bleed backgrounds, frameloop-gated for perf.
3. **Product Catalog:** Flat `products.json` (923 items) + `slug-map.json` (4470 slugs, many-to-one with products) drive three separate detail routes; `CategoryFirstShowcase` is the shared browsing UI for `/urunler` and brand product pages, with all filter/search/page state synced to the URL.
4. **Static export, dual deploy target:** everything must work with `output:"export"` (no server-side code paths at runtime) and resolve correctly under both the root domain and the GitHub Pages subpath via `getAssetPath()`.

## Go-live / cPanel migration

There is a pending migration from the old OpenCart (PHP) site at `kendalelektrik.com.tr` to this Next.js static export. See **`CPANEL_DEPLOYMENT_PLAN.md`** at the repo root for the full audit (subdomain routing feasibility, `.htaccess` rewrite, checklist) — read it before doing any deploy-related work on this project.

## Development Workflow
- **Start Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`

Please refer to this document to understand where to place new components, where to look for routing logic, how the data layer resolves products/slugs, and how the styling/animation/3D stack is structured. When something here seems out of date (a file renamed, a component removed), trust the current code over this doc and update this file accordingly.
