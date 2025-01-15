import client from 'tina/__generated__/client';

import BlogIndexPageClient from './BlogIndexPageClient';

const POSTS_PER_PAGE = 8;

export default async function BlogPaginationPage({
  params,
}: {
  params: { page_index: string };
}) {
  const fg = require('fast-glob');
  const contentDir = './content/blog/';
  const posts = await fg(`${contentDir}**/*.mdx`);
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pageIndex = parseInt(params.page_index) || 1;
  const startIndex = (pageIndex - 1) * POSTS_PER_PAGE;

  const postResponse = await client.queries.postConnection({
    first: posts.length,
    sort: 'date',
  });

  const reversedPosts = postResponse?.data?.postConnection?.edges
    ?.map((edge) => edge.node)
    .reverse();

  const finalisedPostData = reversedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  return (
    <>
      <BlogIndexPageClient
        currentPageIndexNumber={pageIndex}
        postsForPageIndex={finalisedPostData}
        numberOfPages={numPages}
      />
    </>
  );
}
