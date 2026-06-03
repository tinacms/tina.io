// utils/i18n/uiStrings.ts
import type { Locale } from './localeRouteConfig';

export interface UiStrings {
  docs: {
    lastEdited: string;
  };
  blogPost: {
    lastEdited: string;
  };
  blogIndex: {
    heading: string;
    pageSuffix: (pageIndex: number) => string;
    metaTitle: (pageIndex: number) => string;
    metaDescription: string;
  };
}

const STRINGS: Record<Locale, UiStrings> = {
  en: {
    docs: { lastEdited: 'Last Edited' },
    blogPost: { lastEdited: 'Last Edited' },
    blogIndex: {
      heading: 'Blog',
      pageSuffix: (pageIndex) => (pageIndex > 1 ? ` - Page ${pageIndex}` : ''),
      metaTitle: (pageIndex) => `TinaCMS Blog - Page ${pageIndex}`,
      metaDescription:
        'Stay updated with the TinaCMS blog. Get tips, guides and the latest news on content management and development',
    },
  },
  zh: {
    docs: { lastEdited: '上次编辑' },
    blogPost: { lastEdited: 'Last Edited' },
    blogIndex: {
      heading: '博客',
      pageSuffix: (pageIndex) => (pageIndex > 1 ? ` - 第${pageIndex}页` : ''),
      metaTitle: (pageIndex) => `TinaCMS 博客 - 第 ${pageIndex} 页`,
      metaDescription:
        '关注 TinaCMS 博客，获取内容管理和开发的技巧、指南和最新资讯',
    },
  },
};

export function getUiStrings(locale: Locale): UiStrings {
  return STRINGS[locale];
}
