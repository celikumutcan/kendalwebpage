export const isGithubPagesBuild =
  process.env.NEXT_PUBLIC_BUILD_MODE === 'ghpages';

export const getBasePath = () => {
  return isGithubPagesBuild ? '/kendalwebpage' : '';
};

export const getAssetPath = (path: string) => {
  const base = getBasePath();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};

// cPanel/yerel'de marka alt alan adı zaten /brand/{marka} içine rewrite
// ediyor, göreli link yeterli; GH Pages'te alt alan adı olmadığı için mutlak
// /brand/{marka}/... yolu şart.
export const getBrandHomeHref = (brand: string) =>
  isGithubPagesBuild ? `/brand/${brand}` : '/';

export const getBrandUrunlerHref = (brand: string) =>
  isGithubPagesBuild ? `/brand/${brand}/urunler` : '/urunler';
