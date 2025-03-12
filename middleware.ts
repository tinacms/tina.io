import { NextRequest, NextResponse } from 'next/server';
import { saveLocaleToCookieServer, getLocale } from 'utils/locale';

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
  const pathname = request.nextUrl.pathname;

  let response;
  const locale = getLocale(request);
  if (locale === DEFAULT_LOCALE) {
    response = NextResponse.next();
  } else {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    response = NextResponse.redirect(url);
  }
  return saveLocaleToCookieServer(response, locale);
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
