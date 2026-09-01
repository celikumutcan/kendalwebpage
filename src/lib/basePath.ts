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

// Marka mikro-sitesi içi linkler (Ürünler, Ana Sayfa vb.):
// - cPanel/yerel: k2.kendalelektrik.com.tr / k2.localhost gibi bir alt alan
//   adı üzerinden geliniyor, arka planda görünmez bir rewrite zaten
//   /brand/{marka}/... içine yönlendiriyor — bu yüzden göreli link ("/urunler")
//   yeterli, "/brand/k2" öneki eklenirse rewrite ikinci kez tetiklenip
//   "/brand/k2/brand/k2/..." gibi kırık bir adrese gider.
// - GitHub Pages: alt alan adı/rewrite hiç yok, tek bir origin var — bu
//   yüzden mutlak "/brand/{marka}/..." yolu şart (next/link basePath'i
//   otomatik ekler).
export const getBrandHomeHref = (brand: string) =>
  isGithubPagesBuild ? `/brand/${brand}` : '/';

export const getBrandUrunlerHref = (brand: string) =>
  isGithubPagesBuild ? `/brand/${brand}/urunler` : '/urunler';
