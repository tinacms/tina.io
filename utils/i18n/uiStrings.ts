// utils/i18n/uiStrings.ts
import type { Locale } from './localeRouteConfig';

export interface UiStrings {
  blogPost: {
    lastEdited: string;
    previousPost: string;
    nextPost: string;
  };
  blogIndex: {
    heading: string;
    pagination: string;
    previous: string;
    next: string;
    pageLabel: (pageIndex: number) => string;
    pageSuffix: (pageIndex: number) => string;
    metaTitle: (pageIndex: number) => string;
    metaDescription: string;
  };
}

const STRINGS: Record<Locale, UiStrings> = {
  en: {
    blogPost: {
      lastEdited: 'Last Edited',
      previousPost: 'Previous post',
      nextPost: 'Next post',
    },
    blogIndex: {
      heading: 'Blog',
      pagination: 'Blog pages',
      previous: 'Previous',
      next: 'Next',
      pageLabel: (pageIndex) => `Page ${pageIndex}`,
      pageSuffix: (pageIndex) => (pageIndex > 1 ? ` - Page ${pageIndex}` : ''),
      metaTitle: (pageIndex) => `TinaCMS Blog - Page ${pageIndex}`,
      metaDescription:
        'Stay updated with the TinaCMS blog. Get tips, guides and the latest news on content management and development',
    },
  },
  zh: {
    blogPost: {
      lastEdited: 'Last Edited',
      previousPost: '上一篇',
      nextPost: '下一篇',
    },
    blogIndex: {
      heading: '博客',
      pagination: '博客分页',
      previous: '上一页',
      next: '下一页',
      pageLabel: (pageIndex) => `第 ${pageIndex} 页`,
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
