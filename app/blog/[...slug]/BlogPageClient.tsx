'use client';

import Giscus from '@giscus/react';
import { formatDate } from 'components/AppRouterMigrationComponents/utils/formatDate';
import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { DocsPagination } from 'components/ui';
import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { BlogPageClientProps } from './BlogType';

const BlogPageClient: React.FC<BlogPageClientProps> = ({ data }) => {
  const blogPostData = data.post;

  const postedDate = formatDate(blogPostData.date);
  const lastEditedDate = blogPostData.last_edited
    ? formatDate(blogPostData.last_edited)
    : null;

  const previousPage = blogPostData.prev
    ? {
        slug: blogPostData.prev.id.slice(7, -4),
        title: blogPostData.prev.title,
      }
    : null;

  const nextPage = blogPostData.next
    ? {
        slug: blogPostData.next.id.slice(7, -4),
        title: blogPostData.next.title,
      }
    : null;

  return (
    <div>
      <BlogPageTitle title={blogPostData.title} />
      <div className="p-6">
        <div className="pt-12 lg:pt-16 max-w-prose mx-auto">
          <div className="flex flex-col items-center opacity-80 m-0">
            <span>{postedDate}</span>
            <div className="flex flex-row text-lg gap-1 pb-4">
              <span>By </span>
              <strong>{blogPostData.author}</strong>
            </div>
          </div>
          <div className="text-[#241748]">
            <TinaMarkdown
              content={blogPostData.body}
              components={docAndBlogComponents}
            />
          </div>

          {lastEditedDate && (
            <div className="mt-2 text-sm opacity-50">
              Last Edited: {lastEditedDate}
            </div>
          )}
          <DocsPagination prevPage={previousPage} nextPage={nextPage} />
          <div className="mt-8">
            <Giscus
              id="discussion-box"
              repo={blogPostData.giscusProps.giscusRepo}
              repoId={blogPostData.giscusProps.giscusRepoId}
              category={blogPostData.giscusProps.giscusCategory}
              categoryId={blogPostData.giscusProps.giscusCategoryId}
              mapping="pathname"
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme={blogPostData.giscusProps.giscusThemeUrl}
              lang="en"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function BlogPageTitle({ title }: { title: string }) {
  const blogTitleStyling =
    'leading-[1.3] max-w-[9em] bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 ' +
    'text-transparent bg-clip-text font-ibm-plex mx-auto text-4xl md:text-5xl lg:text-6xl';

  return (
    <div className="relative z-10 overflow-visible text-center px-8 py-12 lg:py-16">
      <div className={blogTitleStyling}>{title}</div>
    </div>
  );
}

export default BlogPageClient;
