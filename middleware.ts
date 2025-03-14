import { NextRequest, NextResponse } from 'next/server';
import { getLocale } from 'utils/locale';

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
  console.log('Try to Access:', pathname);
  console.log('Get from Locale:', getLocale(request));
  console.log('Get from Params:', url.searchParams.get('setLocale'));
  const locale = url.searchParams.get('setLocale') || getLocale(request);
  console.log('Final locale:', locale);
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
