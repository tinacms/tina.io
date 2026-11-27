import type { Locale } from 'utils/i18n/localeRouteConfig';

// One source for the post's link-preview image and the copy shown on the page, so they never drift.
export function blogOgImagePath(locale: Locale, slugPath: string): string {
  return `${locale === 'zh' ? '/zh' : ''}/blog/og/${slugPath}`;
}
