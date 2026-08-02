# Kendal Elektrik Showcase

A cinematic, WebGL-powered Next.js application built with React, GSAP, and Three.js.

## Local Development

```bash
npm install
npm run dev
```

## Deployment Options

This project is a frontend-only Next.js App Router application. Since the WebGL features (Hero, Globe, ProductGallery) are entirely client-side, the app can be deployed either via standard Next.js hosting (Vercel) or exported as static HTML (GitHub Pages).

### Option A: Vercel (Recommended, Zero-Config)
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Vercel will auto-detect Next.js. Leave the build command as `next build`.
5. Click **Deploy**.

### Option B: GitHub Pages (Static Export)
This repository includes a `.github/workflows/deploy.yml` file that automatically builds and deploys a static version of the site whenever you push to the `main` branch.

1. Go to your repository settings on GitHub: **Settings > Pages**.
2. Under **Build and deployment**, set the **Source** to **GitHub Actions**.
3. Push your code to `main`. The workflow will use `BUILD_MODE=static npm run build` to generate an `out` folder and deploy it automatically.

> Note: If you are deploying to a project page (e.g. `yourname.github.io/kendal`), you will need to add `basePath: "/kendal"` and `assetPrefix: "/kendal"` inside the `next.config.ts` static condition block.
