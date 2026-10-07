// components/blog/BlogPageClient.tsx
'use client';

import Giscus from '@giscus/react';
import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { DocsPagination } from 'components/ui';
import Image from 'next/image';
// biome-ignore lint/style/useImportType: React is required
import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { buildBlogLinkSlug } from 'utils/i18n/buildLinkSlug';
import { LOCALE_ROUTE_CONFIG } from 'utils/i18n/localeRouteConfig';
import { getUiStrings } from 'utils/i18n/uiStrings';
import { unclipEmoji } from 'utils/unclipEmoji';
import { formatDate } from '@/utils/formatDate';
import type { BlogPageClientProps } from './BlogType';

const BlogPageClient: React.FC<BlogPageClientProps> = ({
  data,
  variables,
  query,
  locale,
  heroImage,
}) => {
  const { data: blogPostData } = useTina({ query, variables, data });

  const post = blogPostData.post;
  const strings = getUiStrings(locale);
  const postedDate = formatDate(post.date);
  const lastEditedDate = post.last_edited ? formatDate(post.last_edited) : null;

  const previousPage = post.prev
    ? { slug: buildBlogLinkSlug(post.prev.id, locale), title: post.prev.title }
    : null;

  const nextPage = post.next
    ? { slug: buildBlogLinkSlug(post.next.id, locale), title: post.next.title }
    : null;

  return (
    <article>
      <header className="max-w-4xl mx-auto px-6 pt-12">
        {/* The image shows the title and author, so the page text for them is for screen readers only. */}
        <h1 className="sr-only">{unclipEmoji(post.title)}</h1>
        {/* NOTE: [7 Oct 2026] EK - unoptimized is deliberate. Vercel only optimises static
            files and passes this route's PNG through unchanged. */}
        <Image
          src={heroImage}
          alt=""
          width={1200}
          height={630}
          unoptimized={true}
          priority={true}
          className="w-full h-auto rounded-xl border"
        />
      </header>
      <div className="p-6">
        <div className="max-w-prose mx-auto">
          <div className="flex justify-end opacity-80 m-0">
            <span className="sr-only">By {post.author}</span>
            <time dateTime={post.date}>{postedDate}</time>
          </div>
          <div className=" pt-6">
            <TinaMarkdown
              content={post.body}
              components={docAndBlogComponents}
            />
          </div>

          {lastEditedDate && (
            <div className="mt-2 text-sm opacity-50">
              {strings.blogPost.lastEdited}:{' '}
              <time dateTime={post.last_edited}>{lastEditedDate}</time>
            </div>
          )}
          <DocsPagination prevPage={previousPage} nextPage={nextPage} />
          <div className="mt-8">
            <Giscus
              id="discussion-box"
              repo={post.giscusProps?.giscusRepo}
              repoId={post.giscusProps?.giscusRepoId}
              category={post.giscusProps?.giscusCategory}
              categoryId={post.giscusProps?.giscusCategoryId}
              mapping="pathname"
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme={post.giscusProps?.giscusThemeUrl}
              lang={LOCALE_ROUTE_CONFIG[locale].giscusLang}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPageClient;
