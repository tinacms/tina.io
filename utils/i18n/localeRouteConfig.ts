// utils/i18n/localeRouteConfig.ts
import type { SupportedLocales } from 'middleware';
export type Locale = `${SupportedLocales}`;

export interface LocaleRouteConfig {
  /** Directory globbed for static params, e.g. './content/blog/' */
  blogContentDir: string;
  /**
   * URL prefix. Empty for both locales: each language has its own domain
   * (tina.io / tinaio.cn) and the two share one path shape, so the `/zh`
   * segment never appears in a public URL. Middleware rewrites the Chinese
   * domain's requests onto the physical `/zh/...` routes.
   */
  pathPrefix: string;
  /** Path segment inside Tina document ids, e.g. 'blog' or 'blog-zh' */
  blogContentSlug: string;
  /** Public URL segment the content slug maps to — 'blog' for both locales */
  blogUrlSlug: string;
  /** giscus comment widget language */
  giscusLang: string;
}

export const LOCALE_ROUTE_CONFIG: Record<Locale, LocaleRouteConfig> = {
  en: {
    blogContentDir: './content/blog/',
    pathPrefix: '',
    blogContentSlug: 'blog',
    blogUrlSlug: 'blog',
    giscusLang: 'en',
  },
  zh: {
    blogContentDir: './content/blog-zh/',
    pathPrefix: '',
    blogContentSlug: 'blog-zh',
    blogUrlSlug: 'blog',
    giscusLang: 'zh-CN',
  },
};
