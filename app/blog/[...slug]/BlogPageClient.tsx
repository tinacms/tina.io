'use client';

import { formatDate } from 'components/AppRouterMigrationComponents/utils/formatDate';
import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { DocsPagination } from 'components/ui';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { BlogPageClientProps } from './BlogType';

export default function BlogPageClient(props: BlogPageClientProps) {
  console.log(props);
  const blogPostData = props.data.post;
  const postedDate = formatDate(blogPostData?.date);
  const lastEditedDate = formatDate(blogPostData?.last_edited);

  const previousPage = {
    slug: blogPostData?.prev?.id.slice(7, -4),
    title: blogPostData?.prev?.title,
  };
  const nextPage = {
    slug: blogPostData?.next?.id.slice(7, -4),
    title: blogPostData?.next?.title,
  };
  return (
    <div>
      <BlogPageTitle title={blogPostData?.title} />
      <div className="p-6">
        <div className="py-12 lg:py-16 last:pb-20 last:lg:pb-32 max-w-prose mx-auto">
          <div className="flex flex-col items-center opacity-80 m-0">
            {postedDate}
            <div className="flex flex-row text-lg gap-1 pb-4">
              <span>By </span>
              <strong>{blogPostData?.author}</strong>
            </div>
          </div>
          <div className="text-[#241748]">
            <TinaMarkdown
              content={blogPostData?.body}
              components={docAndBlogComponents}
            />
          </div>

          {lastEditedDate && (
            <div className="mt-2 text-sm opacity-50">
              Last Edited: {lastEditedDate}
            </div>
          )}
          <DocsPagination prevPage={previousPage} nextPage={nextPage} />
        </div>
      </div>
    </div>
  );
}

function BlogPageTitle({ title }: { title: string }) {
  const blogTitleStyling =
    'leading-[1.3] max-w-[9em] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 ' +
    'text-transparent bg-clip-text font-tuner mx-auto text-4xl md:text-5xl lg:text-6xl';

  return (
    <div className="relative z-10 overflow-visible text-center px-8 py-12 lg:py-16">
      <div className={blogTitleStyling}>{title}</div>
    </div>
  );
}
