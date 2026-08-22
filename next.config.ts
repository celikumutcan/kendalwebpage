import type { NextConfig } from "next";

// Bu proje statik export olarak üretiliyor ve iki farklı statik barındırma
// hedefi var:
//  - GitHub Pages: geliştirme sürecinde yöneticinin önizleyebilmesi için,
//    repo adı alt dizin olduğundan basePath/assetPrefix gerekiyor.
//  - cPanel (kendalelektrik.com.tr): gerçek üretim ortamı, kök dizine
//    yükleniyor, basePath OLMAMALI.
// `next build` varsayılan olarak cPanel hedefini üretir. GitHub Pages
// build'i BUILD_MODE=ghpages ile tetiklenir (bkz. .github/workflows/nextjs.yml).
const isGithubPagesBuild = process.env.BUILD_MODE === "ghpages";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 70, 75, 80, 100],
  },
  // Güvenlik başlıkları (CSP, HSTS, X-Frame-Options vb.) burada tanımlanmıyor:
  // `output: "export"` ile statik export modunda Next.js'in `headers()`
  // konfigürasyonu hiçbir zaman uygulanmaz (ne GitHub Pages'te ne de
  // cPanel'de). Bu başlıklar artık public/.htaccess üzerinden, Apache
  // tarafından cPanel'de sunuluyor.
  ...(process.env.NODE_ENV === "production" ? {
    output: "export",
    images: { unoptimized: true },
    trailingSlash: true,
    ...(isGithubPagesBuild ? {
      basePath: "/kendalwebpage",
      assetPrefix: "/kendalwebpage",
    } : {}),
  } : {}),
  devIndicators: false,
};

export default nextConfig;
