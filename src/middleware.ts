import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default createMiddleware({
  locales: ['ru', 'en'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname === '/') {
    url.pathname = '/en';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
