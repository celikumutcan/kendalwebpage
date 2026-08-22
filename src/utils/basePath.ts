// next.config.ts ile aynı mantık: basePath sadece GitHub Pages build'inde
// (BUILD_MODE=ghpages) uygulanır. cPanel'e (kendalelektrik.com.tr) giden
// varsayılan production build kök dizine yüklendiği için prefix'siz olmalı.
export const getBasePath = () => {
  return process.env.BUILD_MODE === "ghpages" ? "/kendalwebpage" : "";
};

export const getAssetPath = (path: string) => {
  const base = getBasePath();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
};
