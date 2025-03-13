import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../middleware';
import { NextRequest, NextResponse } from 'next/server';

export function saveLocale(locale: string) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    console.warn(`Attempted to save unsupported locale: ${locale}`);
    locale = DEFAULT_LOCALE;
  }

  saveLocaleToLocalStorage(locale);
  saveLocaleToCookie(locale);
}

function saveLocaleToLocalStorage(locale: string) {
  localStorage.setItem('NEXT_LOCALE', locale);
  console.log(`Saved locale to local storage: ${locale}`);
}

function saveLocaleToCookie(locale: string) {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  document.cookie = `NEXT_LOCALE=${locale}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  console.log(`Saved locale to cookie: ${locale}`);
}

export function saveLocaleToCookieServer(
  response: NextResponse,
  locale: string
) {
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });
  return response;
}

export function getLocale(request: NextRequest): string {
  const cookieLocale = getLocaleFromCookie(request);
  if (cookieLocale) {
    return cookieLocale;
  }

  const acceptLanguageLocale = getLocaleFromAcceptLanguage(request);
  if (acceptLanguageLocale) {
    return acceptLanguageLocale;
  }

  console.log(`Get locale from default: ${DEFAULT_LOCALE}`);
  return DEFAULT_LOCALE;
}

function getLocaleFromCookie(request: NextRequest): string | null {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    console.log(`Get locale from cookie: ${cookieLocale}`);
    return cookieLocale;
  }

  return null;
}

function getLocaleFromAcceptLanguage(request: NextRequest): string | null {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  try {
    console.log(`Get locale from headers: ${languages}`);
    return match(languages, SUPPORTED_LOCALES, DEFAULT_LOCALE);
  } catch (error) {
    return null;
  }
}
