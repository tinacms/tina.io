// utils/i18n/localeRouteConfig.ts
import type { SupportedLocales } from 'middleware';
export type Locale = `${SupportedLocales}`;

export interface LocaleRouteConfig {
  /** Directory globbed for static params, e.g. './content/docs/' */
  docsContentDir: string;
  blogContentDir: string;
  /**
   * URL prefix. Empty for both locales: each language has its own domain
   * (tina.io / tinaio.cn) and the two share one path shape, so the `/zh`
   * segment never appears in a public URL. Middleware rewrites the Chinese
   * domain's requests onto the physical `/zh/...` routes.
   */
  pathPrefix: string;
  /** Path segment inside Tina document ids, e.g. 'docs' or 'docs-zh' */
  docsContentSlug: string;
  blogContentSlug: string;
  /** Public URL segment the content slug maps to, e.g. 'docs' or 'zh/docs' */
  docsUrlSlug: string;
  blogUrlSlug: string;
  /** giscus comment widget language */
  giscusLang: string;
}

export const LOCALE_ROUTE_CONFIG: Record<Locale, LocaleRouteConfig> = {
  en: {
    docsContentDir: './content/docs/',
    blogContentDir: './content/blog/',
    pathPrefix: '',
    docsContentSlug: 'docs',
    blogContentSlug: 'blog',
    docsUrlSlug: 'docs',
    blogUrlSlug: 'blog',
    giscusLang: 'en',
  },
  zh: {
    docsContentDir: './content/docs-zh/',
    blogContentDir: './content/blog-zh/',
    pathPrefix: '',
    docsContentSlug: 'docs-zh',
    blogContentSlug: 'blog-zh',
    docsUrlSlug: 'docs',
    blogUrlSlug: 'blog',
    giscusLang: 'zh-CN',
  },
};
