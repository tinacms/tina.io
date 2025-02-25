import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';

export const SUPPORTED_LOCALES = ['en', 'zh'];
export const DEFAULT_LOCALE = 'en';
const RESERVED_PATHS = [
  'api',
  'blog',
  'community',
  'docs',
  'events',
  'examples',
  'search',
  'test-analytics',
  'whats-new',
  'admin',
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isValidPath =
    pathname === '/' ||
    (/^\/[^/]+$/.test(pathname) &&
      !RESERVED_PATHS.includes(pathname.substring(1))) || // matches /xxx but not reserved paths
    (/^\/[^/]+\/[^/]+/.test(pathname) &&
      SUPPORTED_LOCALES.includes(pathname.split('/')[1])); // matches /locale/xxx

  if (!isValidPath) {
    return;
  }

  // ignore static files
  if (pathname.startsWith('/_next') || pathname.includes('.')) {
    return;
  }

  console.log(`default language: ${DEFAULT_LOCALE}`);
  console.log(`current path: ${pathname}`);

  // check if the pathname has a locale
  const matchedLocale = SUPPORTED_LOCALES.find(
    (locale) =>
      pathname.startsWith(`/${locale}/`) ||
      pathname === `/${locale}` ||
      pathname === `/${locale}/`
  );

  if (matchedLocale) {
    if (pathname === `/${matchedLocale}` || pathname === `/${matchedLocale}/`) {
      const url = request.nextUrl.clone();
      url.pathname = `/${matchedLocale}/home`;
      return NextResponse.redirect(url);
    }
    return; // the final output
  }

  // get the locale from the request
  const locale = getLocale(request);
  console.log(`locale: ${locale}`);

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${locale}/home` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|public|api).*)'],
};

function getLocale(request: NextRequest): string {
  const cookieLocale = getLocaleFromCookie(request);
  if (cookieLocale) {
    console.log(`Get cookie locale: ${cookieLocale}`);
    return cookieLocale;
  }

  const acceptLanguageLocale = getLocaleFromAcceptLanguage(request);
  if (acceptLanguageLocale) {
    console.log(`Get accept language locale: ${acceptLanguageLocale}`);
    return acceptLanguageLocale;
  }

  console.log(`Get default locale: ${DEFAULT_LOCALE}`);
  return DEFAULT_LOCALE;
}

function getLocaleFromCookie(request: NextRequest): string | null {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    return cookieLocale;
  }

  return null;
}

function getLocaleFromAcceptLanguage(request: NextRequest): string | null {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  try {
    return match(languages, SUPPORTED_LOCALES, DEFAULT_LOCALE);
  } catch (error) {
    return null;
  }
}
