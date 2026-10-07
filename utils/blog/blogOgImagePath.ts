import type { Locale } from 'utils/i18n/localeRouteConfig';

const prefix = (locale: Locale) => (locale === 'zh' ? '/zh' : '');

export function blogOgImagePath(locale: Locale, slugPath: string): string {
  return `${prefix(locale)}/blog/og/${slugPath}`;
}

export function blogHeroImagePath(locale: Locale, slugPath: string): string {
  return `${prefix(locale)}/blog/hero/${slugPath}`;
}
