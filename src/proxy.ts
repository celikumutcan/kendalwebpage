import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icon.png|kendal-icon.png).*)',
  ],
};

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Define our brand subdomains
  const brands = ['k2', 'vanti', 'global'];

  // Check if the current hostname starts with one of our brand subdomains
  // e.g. k2.localhost:3000 or k2.kendalelektrik.com.tr
  const currentBrand = brands.find((brand) => hostname.startsWith(`${brand}.`));

  if (currentBrand) {
    // Rewrite the URL to the brand folder
    // e.g. k2.localhost:3000/urunler/aydinlatma/urun-1 -> /brand/k2/urunler/aydinlatma/urun-1
    return NextResponse.rewrite(new URL(`/brand/${currentBrand}${url.pathname}${url.search}`, req.url));
  }

  // Prevent direct access to /brand paths from the main domain to avoid duplicate content
  if (url.pathname.startsWith('/brand')) {
    return NextResponse.redirect(new URL('/404', req.url));
  }

  // Otherwise, let Next.js handle it normally (it will go to (main) or other root folders)
  return NextResponse.next();
}
