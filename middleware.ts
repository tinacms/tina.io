import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { NextRequest, NextResponse } from 'next/server';

export enum SupportedLocales {
  EN = 'en',
  ZH = 'zh',
}

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
  if (!isValidPathCheck(pathname)) {
    return;
  }

  console.log(`default language: ${DEFAULT_LOCALE}`);
  console.log(`current path: ${pathname}`);

  const matchedLocale = SUPPORTED_LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (matchedLocale) {
    if (pathname === `/${matchedLocale}`) {
      const url = request.nextUrl.clone();
      url.pathname = `/${matchedLocale}/home`;
      return NextResponse.rewrite(url);
    } else {
      return;
    }
  }

  let response;
  const locale = getLocale(request);
  console.log(`Current Locale: ${locale}`);
  if (locale === DEFAULT_LOCALE) {
    response = NextResponse.next();
  } else {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    response = NextResponse.redirect(url);
  }
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });
  return response;
}

export const config = {
  matcher: ['/((?!_next|public|api).*)'],
};

function getLocale(request: NextRequest): string {
  const cookieLocale = getLocaleFromCookie(request);
  if (cookieLocale) {
    console.log(`Get locale from cookie: ${cookieLocale}`);
    return cookieLocale;
  }

  const acceptLanguageLocale = getLocaleFromAcceptLanguage(request);
  if (acceptLanguageLocale) {
    console.log(`Get locale from accept language: ${acceptLanguageLocale}`);
    return acceptLanguageLocale;
  }

  console.log(`Get locale from default: ${DEFAULT_LOCALE}`);
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
  return (
    pathname === '/' ||
    (/^\/[^/]+$/.test(pathname) &&
      !RESERVED_PATHS.includes(pathname.substring(1)) &&
      !pathname.startsWith('/_next') &&
      !pathname.includes('.')) ||
    (/^\/[^/]+\/[^/]+/.test(pathname) &&
      SUPPORTED_LOCALES.includes(pathname.split('/')[1]) &&
      !pathname.startsWith('/_next') &&
      !pathname.includes('.'))
  );
}
