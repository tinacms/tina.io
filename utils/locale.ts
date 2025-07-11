import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../middleware';

export function saveLocaleToCookie(locale: string) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    console.warn(`Attempted to save unsupported locale: ${locale}`);
    locale = DEFAULT_LOCALE;
  }

  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  document.cookie = `NEXT_LOCALE=${locale}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  console.log(`Saved locale to cookie: ${locale}`);
}

export function getLocale(request: NextRequest): string {
  const cookieLocale = getLocaleFromCookie(request);
  if (cookieLocale) {
    return cookieLocale;
  }

  const hostname = request.headers.get('host') || '';
  if (hostname === 'www.tinacms.com.cn' || hostname === 'tinacms.com.cn') {
    return 'zh';
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

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  try {
    return match(languages, SUPPORTED_LOCALES, DEFAULT_LOCALE);
  } catch (_error) {
    return null;
  }
}

export function isChineseRoute(pathname: string): boolean {
  return pathname === '/zh' || pathname.startsWith('/zh/');
}
