import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

export const SUPPORTED_LOCALES = ['en', 'zh'];
export const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ignore static files
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.match(/\.(jpg|png|svg|ico|css|js|webm)$/)
  ) {
    return;
  }

  console.log(`default language: ${DEFAULT_LOCALE}`);
  console.log(`current path: ${pathname}`);

  // check if the pathname has a locale
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // get the locale from the request
  const locale = getLocale(request);
  console.log(`locale: ${locale}`);
  return;
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
