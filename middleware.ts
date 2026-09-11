import { type NextRequest, NextResponse } from 'next/server';
import { hasZhPrefix, isZhHost, stripZhPrefix } from 'utils/i18n/domains';

export enum SupportedLocales {
  EN = 'en',
  ZH = 'zh',
}

export const VALID_PATHS = [
  '/',
  '/about',
  '/compare-tina',
  '/enterprise',
  '/roadmap',
  '/showcase',
  '/pricing',
];

export const SUPPORTED_LOCALES = ['en', 'zh'];
export const DEFAULT_LOCALE = 'en';

/**
 * Locale is decided by hostname, not by cookie or Accept-Language: tina.io is
 * English, tinaio.cn is Chinese. A visitor only reaches the Chinese site by
 * going to tinaio.cn or by using the language switcher, so tina.io never
 * redirects anyone away from the page they asked for.
 *
 * English requests return immediately. Nothing about the English site's URLs,
 * routing or rendering changes; the physical `app/` tree is untouched and only
 * the Chinese branch below rewrites anything.
 */
export function middleware(request: NextRequest) {
  // Behind the China reverse proxy the browser-facing hostname arrives in
  // X-Forwarded-Host; Host is the upstream origin. Fall back to Host for
  // direct requests (local dev, Vercel).
  const rawHost =
    request.headers.get('x-forwarded-host') ?? request.headers.get('host');

  if (!isZhHost(rawHost)) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;

  // On the Chinese domain the `/zh` prefix is redundant, so collapse it to the
  // canonical prefix-free URL. Only in production: locally there is no Chinese
  // hostname, and `/zh/...` is the only way to open Chinese pages by hand.
  if (hasZhPrefix(pathname)) {
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.next();
    }
    const canonical = `${stripZhPrefix(pathname)}${search}`;
    return NextResponse.redirect(new URL(canonical, request.url), 301);
  }

  // Serve the physical Chinese route without exposing the prefix.
  return NextResponse.rewrite(new URL(`/zh${pathname}${search}`, request.url));
}

export const config = {
  // Everything except API routes, build assets, the TinaCMS admin app, and any
  // path with a file extension. Static files must not pay for middleware.
  matcher: [
    '/((?!api/|_next/static|_next/image|admin|favicon\\.ico|.*\\.[a-zA-Z0-9]+$).*)',
  ],
};

export function isValidPathCheck(pathname) {
  if (VALID_PATHS.includes(pathname)) {
    return true;
  }
  const pathParts = pathname.split('/').filter(Boolean);
  if (pathParts.length >= 1 && SUPPORTED_LOCALES.includes(pathParts[0])) {
    return true;
  }
  return false;
}
