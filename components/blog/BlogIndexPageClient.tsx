// components/blog/BlogIndexPageClient.tsx
'use client';

import { MarkdownContent } from 'components/layout';
import { DynamicLink, Pagination } from 'components/ui';
import { LOCALE_ROUTE_CONFIG, type Locale } from 'utils/i18n/localeRouteConfig';
import { getUiStrings } from 'utils/i18n/uiStrings';
import { unclipEmoji } from 'utils/unclipEmoji';
import {
  BODY_MUTED,
  BODY_SMALL,
  CARD_TITLE,
  PAGE_TITLE,
  TITLE_LINK,
} from '@/component/styles/typography';
import { extractTextFromBody } from '@/utils/extractTextFromBody';
import { formatDate } from '@/utils/formatDate';

interface Post {
  id: string;
  title: string;
  date?: string;
  author?: string;
  body?: string;
  seo?: { title?: string; description?: string };
  _sys: {
    filename: string;
    basename: string;
    breadcrumbs: string[];
    path: string;
    relativePath: string;
    extension: string;
  };
}

interface BlogIndexPageClientProps {
  currentPageIndexNumber: number;
  numberOfPages: number;
  postsForPageIndex: Post[];
  locale: Locale;
}

export default function BlogIndexPageClient({
  currentPageIndexNumber: pageIndex,
  postsForPageIndex: posts,
  numberOfPages: numPages,
  locale,
}: BlogIndexPageClientProps) {
  const strings = getUiStrings(locale);
  const prefix = LOCALE_ROUTE_CONFIG[locale].pathPrefix; // '' or '/zh'

  return (
    <section className="p-6">
      <header className="text-center pt-8 pb-4">
        <h1 className={PAGE_TITLE}>
          {strings.blogIndex.heading}
          {strings.blogIndex.pageSuffix(pageIndex)}
        </h1>
      </header>
      <div className="py-12 lg:py-16 last:pb-20 lg:last:pb-32 max-w-prose mx-auto">
        {posts.map((post) => (
          <article
            key={post.id}
            className="w-full flex flex-col gap-6 lg:gap-8 items-start mb-6 lg:mb-8"
          >
            <DynamicLink href={`${prefix}/blog/${post._sys.filename}`} passHref>
              <h2 className={`${CARD_TITLE} ${TITLE_LINK}`}>
                {unclipEmoji(post.title)}
              </h2>
            </DynamicLink>
            <div className="w-full">
              <div className="flex justify-between items-center w-full mb-6 -mt-2">
                <p className={BODY_MUTED}>By {post.author}</p>
                <time className={BODY_MUTED} dateTime={post.date}>
                  {formatDate(post.date || '')}
                </time>
              </div>
              <div className={`${BODY_SMALL} mb-6`}>
                <MarkdownContent
                  skipHtml={true}
                  content={extractTextFromBody(post.body)}
                />
              </div>
              <hr className="block border-none bg-[url('/svg/hr.svg')] bg-no-repeat bg-[length:auto_100%] h-[7px] w-full my-8" />
            </div>
          </article>
        ))}
        <div className="mt-12 mb-12">
          <Pagination
            currentPage={pageIndex}
            numPages={numPages}
            hrefFor={(page) => `${prefix}/blog/page/${page}`}
            labels={{
              pagination: strings.blogIndex.pagination,
              previous: strings.blogIndex.previous,
              next: strings.blogIndex.next,
              page: strings.blogIndex.pageLabel,
            }}
          />
        </div>
      </div>
    </section>
  );
}
