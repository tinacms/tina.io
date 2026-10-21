// components/blog/BlogPageClient.tsx
'use client';

import Giscus from '@giscus/react';
import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { DocsPagination } from 'components/ui';
import Image from 'next/image';
import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { type BlogAvatar, blogAvatar } from 'utils/blog/blogAvatar';
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
  slugPath,
}) => {
  const { data: blogPostData } = useTina({ query, variables, data });

  const post = blogPostData.post;
  const strings = getUiStrings(locale);
  const postedDate = formatDate(post.date);
  const avatar = blogAvatar(post.author, slugPath);
  const lastEditedDate = post.last_edited ? formatDate(post.last_edited) : null;

  const previousPage = post.prev
    ? { slug: buildBlogLinkSlug(post.prev.id, locale), title: post.prev.title }
    : null;

  const nextPage = post.next
    ? { slug: buildBlogLinkSlug(post.next.id, locale), title: post.next.title }
    : null;

  return (
    <article>
      <div className="px-6">
        <header className="max-w-3xl mx-auto pt-10 md:pt-12 flex flex-col-reverse items-center gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="text-center md:text-left">
            <h1 className={blogTitleStyling}>{unclipEmoji(post.title)}</h1>
            <p className="mt-4 opacity-80 text-lg">
              By <strong>{post.author}</strong>
              <span aria-hidden="true"> · </span>
              <time dateTime={post.date}>{postedDate}</time>
            </p>
          </div>
          <BlogAvatarImage key={avatar.src} avatar={avatar} />
        </header>
      </div>
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
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

const blogTitleStyling =
  'leading-[1.3] bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 ' +
  'text-transparent bg-clip-text font-ibm-plex text-4xl md:text-5xl';

function BlogAvatarImage({ avatar }: { avatar: BlogAvatar }) {
  const [src, setSrc] = React.useState(avatar.src);

  return (
    <div className="relative shrink-0 w-36 h-44 md:w-48 md:h-60">
      <div className="absolute bottom-0 inset-x-0 aspect-square rounded-full bg-linear-to-br from-orange-400 to-orange-600" />
      <div className="absolute inset-0 overflow-hidden rounded-b-full">
        <Image
          src={src}
          alt=""
          fill={true}
          sizes="192px"
          priority={true}
          className="object-contain object-bottom"
          onError={() => setSrc(avatar.fallbackSrc)}
        />
      </div>
    </div>
  );
}

export default BlogPageClient;
