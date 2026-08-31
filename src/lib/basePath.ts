export const getBasePath = () => {
  return process.env.NEXT_PUBLIC_BUILD_MODE === 'ghpages'
    ? '/kendalwebpage'
    : '';
};

export const getAssetPath = (path: string) => {
  const base = getBasePath();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};
