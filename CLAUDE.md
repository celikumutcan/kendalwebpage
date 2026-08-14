# Kendal Webpage Project Overview

Welcome to the Kendal Webpage project. This document provides a comprehensive overview of the project's architecture, technologies, and file structure to help you understand how everything fits together.

## Tech Stack
- **Framework:** Next.js (v16+) with App Router (`src/app`)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/postcss`)
- **Animations:** GSAP (v3.15+)
- **Smooth Scrolling:** Lenis
- **3D Graphics:** Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Code Quality:** ESLint

## Directory Structure & Architecture

The project follows a standard Next.js App Router structure, primarily contained within the `src/` directory.

### `src/app/` (Routing)
Contains the Next.js routes and page definitions.
- **`(main)`**: The primary layout group for the main website, wrapping most public-facing pages.
  - Contains informational pages like `haberler` (news), `kariyer` (career), `projeler` (projects), `uretim` (production), `urunler` (products), `zincir-marketler` (retail presence).
  - Contains legal pages: `kvkk`, `gizlilik-cerez-politikasi`, `misyon-ve-vizyon`.
  - **`[slug]`**: Dynamic route for handling specific product or category details.
- **`brand`**: Specialized route group for brand-specific landing pages and showcases.
- **`globals.css`**: Global stylesheet including Tailwind directives.

### `src/components/` (React Components)
Organized by scope and purpose:
- **`sections/`**: Large, page-level sections. 
  - Examples: `Hero.tsx`, `AboutUs.tsx`, `OurBrands.tsx`, `CategoryFirstShowcase.tsx`, `ProductGallery.tsx`, `Projects.tsx`.
- **`ui/`**: Reusable UI elements and layout shells.
  - Examples: `Navbar.tsx`, `Footer.tsx`, `BrandNavbar.tsx`, `BrandFooter.tsx`, `ImageSlider.tsx`, `CustomCursor.tsx`.
- **`engine/`**: Components related to 3D rendering and core animation contexts.
  - Examples: `Globe.tsx`, `LightCore.tsx` (Three.js scenes), `GsapContext.tsx`, `SmoothScrollProvider.tsx`.
- **`shared/`**: Small, reusable utilities and structural components.
  - Examples: `SplitText.tsx`, `ApertureTransition.tsx`, SEO schemas (`OrganizationSchema.tsx`, `NewsArticleSchema.tsx`).

### `src/data/` (Static Data)
Contains JSON and TypeScript files that act as a local database or static content provider.
- `products.json`: The main catalog data.
- `slug-map.json`: Mapping of URLs to specific products or categories.
- `news.ts`, `news-tr.ts`, `news-en.ts`: News articles and multi-language content.

### `src/lib/` (Utilities & Contexts)
Contains helper functions, hooks, and React Contexts.
- `gsapConfig.ts`: GSAP initialization and defaults.
- `LightTemperatureProvider.tsx`: Context for managing light temperature states across the app.
- Custom hooks like `useInView.ts`, `useIsomorphicLayoutEffect.ts`.

## Key Concepts
1. **Performance & Animation:** The site relies heavily on GSAP for scroll-triggered and timeline animations, paired with Lenis for smooth scrolling. `GsapContext` usually manages animation lifecycles to prevent memory leaks in React.
2. **3D Elements:** React Three Fiber is used for interactive 3D components like the globe (`Globe.tsx`) and light elements (`LightCore.tsx`), adding a premium feel to the site.
3. **Product Catalog:** Data is largely driven by static JSON files (`products.json`, `slug-map.json`) which are consumed by the dynamic `[slug]` route to render product detail pages.

## Development Workflow
- **Start Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`

Please refer to this document to understand where to place new components, where to look for routing logic, and how the styling/animation stack is structured.
