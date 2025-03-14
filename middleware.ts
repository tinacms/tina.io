import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';

export enum SupportedLocales {
  EN = 'en',
  ZH = 'zh',
}

export const VALID_PATHS = [
  '/',
  '/about',
  '/compare-tina',
  '/enterprise',
  '/home',
  '/roadmap',
  '/showcase',
  '/pricing',
];

export const SUPPORTED_LOCALES = ['en', 'zh'];
export const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  const locale = url.searchParams.get('setLocale') || getLocale(request);

  let response;

  if (url.searchParams.has('setLocale')) {
    url.searchParams.delete('setLocale');
    if (locale === DEFAULT_LOCALE) {
      response = NextResponse.redirect(new URL('/', request.url));
    } else {
      response = NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  } else if (pathname === '/' && locale !== DEFAULT_LOCALE) {
    response = NextResponse.redirect(new URL(`/${locale}`, request.url));
  } else {
    response = NextResponse.next();
  }

  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });
  return response;
}

export const config = {
  matcher: ['/'],
};

function getLocale(request: NextRequest): string {
  const cookieLocale = getLocaleFromCookie(request);
  if (cookieLocale) {
    return cookieLocale;
  }

  const acceptLanguageLocale = getLocaleFromAcceptLanguage(request);
  if (acceptLanguageLocale) {
    return acceptLanguageLocale;
  }

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
