// utils/i18n/buildLinkSlug.ts
import { LOCALE_ROUTE_CONFIG, type Locale } from './localeRouteConfig';

/** Strip the leading "content" prefix (7 chars) and trailing ".mdx" (4 chars). */
function stripContentWrapper(id: string): string {
  return id.slice(7, -4);
}

export function buildDocLinkSlug(
  id: string | undefined,
  locale: Locale,
): string {
  if (!id) {
    return '';
  }
  let slug = stripContentWrapper(id);
  if (locale === 'zh') {
    const cfg = LOCALE_ROUTE_CONFIG.zh;
    slug = slug.replace(cfg.docsContentSlug, cfg.docsUrlSlug);
    if (slug.endsWith('/index')) {
      slug = slug.substring(0, slug.length - '/index'.length);
    }
  }
  return slug;
}

export function buildBlogLinkSlug(
  id: string | undefined,
  locale: Locale,
): string {
  if (!id) {
    return '';
  }
  let slug = stripContentWrapper(id);
  if (locale === 'zh') {
    const cfg = LOCALE_ROUTE_CONFIG.zh;
    slug = slug.replace(cfg.blogContentSlug, cfg.blogUrlSlug);
  }
  return slug;
}
