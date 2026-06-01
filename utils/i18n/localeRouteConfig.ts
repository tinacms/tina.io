// utils/i18n/localeRouteConfig.ts
export type Locale = 'en' | 'zh';

export interface LocaleRouteConfig {
  /** Directory globbed for static params, e.g. './content/docs/' */
  docsContentDir: string;
  blogContentDir: string;
  /** URL prefix: '' for English, '/zh' for Chinese */
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
    pathPrefix: '/zh',
    docsContentSlug: 'docs-zh',
    blogContentSlug: 'blog-zh',
    docsUrlSlug: 'zh/docs',
    blogUrlSlug: 'zh/blog',
    giscusLang: 'zh-CN',
  },
};
