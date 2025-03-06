import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
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
  //现在默认英文无前缀，其他语言有前缀
  const pathname = request.nextUrl.pathname;

  const isValidPath =
    pathname === '/' ||
    (/^\/[^/]+$/.test(pathname) &&
      !RESERVED_PATHS.includes(pathname.substring(1)) &&
      !pathname.startsWith('/_next') &&
      !pathname.includes('.')) ||
    (/^\/[^/]+\/[^/]+/.test(pathname) &&
      SUPPORTED_LOCALES.includes(pathname.split('/')[1]) &&
      !pathname.startsWith('/_next') &&
      !pathname.includes('.'));
  if (!isValidPath) {
    return;
  }
  //谁能打到这里
  // /  -> /home 有可能可以通过page直接处理 需要重定向为 /locale/home  对应直接访问官网的情况 需要cookie
  // /有效文件 -> /有效文件 对应按钮跳转的情况 因为可能从中文页面发出也可能从英文页面发出，所以需要重定向， 需要cookie
  // /无效文件 -> /无效文件
  // /有效locale -> 重写 /有效locale/home 已经申明locale就不要cookie
  // /无效locale -> /无效locale
  // /有效locale/无效文件 -> /有效locale/无效文件 /也不需要cookie
  // /有效locale/有效文件 -> /有效locale/有效文件 /也不需要cookie

  //Show the original info
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
  //谁能打到这里
  // 无有效语言前缀
  // 无效前缀 -> 直接跳到not found去处理
  // 无前缀英文页面
  // 只有我们选择访问英文界面或者点击按钮的时候会发生
  // 如果我们实际想访问英文就直接返回
  // 如果我们实际想访问中文就重定向到中文页面
  let response;
  const locale = getLocale(request);
  console.log(`Current Locale: ${locale}`);
  if (locale === DEFAULT_LOCALE) {
    response = NextResponse.next();
  } else {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    const response = NextResponse.redirect(url);
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
