'use client';

import NewBlogPagination from 'components/AppRouterMigrationComponents/Blogs/BlogPagination';
import { extractTextFromBody } from 'components/AppRouterMigrationComponents/utils/extractTextFromBody';
import { formatDate } from 'components/AppRouterMigrationComponents/utils/formatDate';
import { MarkdownContent } from 'components/layout';
import { DynamicLink } from 'components/ui';
import React from 'react';

interface Post {
  id: string;
  title: string;
  date?: string;
  author?: string;
  body?: string;
  seo?: {
    title?: string;
    description?: string;
  };
  _sys: {
    filename: string;
    basename: string;
    breadcrumbs: string[];
    path: string;
    relativePath: string;
    extension: string;
  };
}

interface BlogPageClientProps {
  currentPageIndexNumber: number;
  numberOfPages: number;
  postsForPageIndex: Post[];
}
export default function BlogIndexPageClient({
  currentPageIndexNumber: pageIndex,
  postsForPageIndex: posts,
  numberOfPages: numPages,
}: BlogPageClientProps) {
  return (
    <div className="p-6">
      <div className="py-12 lg:py-16 last:pb-20 lg:last:pb-32 max-w-prose mx-auto">
        {posts.map((post) => (
          <DynamicLink
            key={post.id}
            href={`/blog/${post._sys.filename}`}
            passHref
          >
            <div className="w-full group flex flex-col gap-6 lg:gap-8 items-start mb-6 lg:mb-8">
              <h3 className="font-ibm-plex text-3xl lg:text-4xl lg:leading-tight bg-linear-to-br from-blue-700/70 via-blue-900/90 to-blue-1000 group-hover:from-orange-300 group-hover:via-orange-500 group-hover:to-orange-700 bg-clip-text text-transparent">
                {post.title}
              </h3>
              <div className="w-full text-[#241748] ">
                <div className="flex justify-between items-center w-full mb-6 -mt-2">
                  <p className="opacity-70">
                    <span className="mr-1">By</span>
                    <strong>{post.author}</strong>
                  </p>
                  <p className="opacity-70">{formatDate(post.date || '')}</p>
                </div>
                <div className=" font-light mb-6">
                  <MarkdownContent
                    skipHtml={true}
                    content={extractTextFromBody(post.body)}
                  />
                </div>

                <hr className="block border-none bg-[url('/svg/hr.svg')] bg-no-repeat bg-[length:auto_100%] h-[7px] w-full my-8" />
              </div>
            </div>
          </DynamicLink>
        ))}
        <div className="mt-12">
          <NewBlogPagination currentPage={pageIndex} numPages={numPages} />
        </div>
      </div>
    </div>
  );
}
