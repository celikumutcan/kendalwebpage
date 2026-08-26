import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|urun-bilgi-formlari|icon.png|kendal-icon.png).*)',
  ],
};

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  const brands = ['k2', 'vanti', 'global'];

  const currentBrand = brands.find((brand) => hostname.startsWith(`${brand}.`));

  if (currentBrand) {
    return NextResponse.rewrite(new URL(`/brand/${currentBrand}${url.pathname}${url.search}`, req.url));
  }

  if (url.pathname.startsWith('/brand')) {
    return NextResponse.redirect(new URL('/404', req.url));
  }

  return NextResponse.next();
}
