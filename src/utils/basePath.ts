// next.config.ts ile aynı mantık: basePath sadece GitHub Pages build'inde
// (NEXT_PUBLIC_BUILD_MODE=ghpages) uygulanır. cPanel'e (kendalelektrik.com.tr)
// giden varsayılan production build kök dizine yüklendiği için prefix'siz
// olmalı.
// NEXT_PUBLIC_ öneki şart: bu dosya "use client" bileşenlerinden de
// çağrılıyor (ör. CategoryFirstShowcase.tsx) ve Next.js, NEXT_PUBLIC_
// önekli olmayan özel env değişkenlerini tarayıcı paketine hiç dahil etmez
// — öneksiz bir değişken tarayıcıda her zaman undefined döner.
export const getBasePath = () => {
  return process.env.NEXT_PUBLIC_BUILD_MODE === "ghpages" ? "/kendalwebpage" : "";
};

export const getAssetPath = (path: string) => {
  const base = getBasePath();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
};
