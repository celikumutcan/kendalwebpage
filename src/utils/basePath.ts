export const getBasePath = () => {
  return process.env.NODE_ENV === "production" ? "/kendalwebpage" : "";
};

export const getAssetPath = (path: string) => {
  const base = getBasePath();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
};
