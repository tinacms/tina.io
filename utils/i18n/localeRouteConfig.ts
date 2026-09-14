// utils/i18n/localeRouteConfig.ts
import type { SupportedLocales } from 'middleware';
export type Locale = `${SupportedLocales}`;

export interface LocaleRouteConfig {
  /** Directory globbed for static params, e.g. './content/blog/' */
  blogContentDir: string;
  /** URL prefix: '' for English, '/zh' for Chinese */
  pathPrefix: string;
  /** Path segment inside Tina document ids, e.g. 'blog' or 'blog-zh' */
  blogContentSlug: string;
  /** Public URL segment the content slug maps to, e.g. 'blog' or 'zh/blog' */
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
    pathPrefix: '/zh',
    blogContentSlug: 'blog-zh',
    blogUrlSlug: 'zh/blog',
    giscusLang: 'zh-CN',
  },
};
