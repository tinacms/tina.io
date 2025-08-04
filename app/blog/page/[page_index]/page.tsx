import { glob } from 'fast-glob';
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import BlogIndexPageClient from './BlogIndexPageClient';

const POSTS_PER_PAGE = 8;

export const dynamicParams = false;

export async function generateStaticParams() {
  const contentDir = './content/blog/';
  const files = await glob(`${contentDir}**/*.mdx`);
  const numFiles = Math.ceil(files.length / POSTS_PER_PAGE);
  return Array.from(Array(numFiles).keys()).map((page) => ({
    page_index: (page + 1).toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { page_index: string };
}) {
  const title = 'TinaCMS Blog';
  const description =
    'Stay updated with the TinaCMS blog. Get tips, guides and the latest news on content management and development';
  const pageIndex = params.page_index;
  const url = `https://tinacms.org/blog/page/${pageIndex}`;
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
    },
  };
}

export default async function BlogPaginationPage({
  params,
}: {
  params: { page_index: string };
}) {
  const contentDir = './content/blog/';
  const posts = await glob(`${contentDir}**/*.mdx`);
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pageIndex = parseInt(params.page_index) || 1;
  const startIndex = (pageIndex - 1) * POSTS_PER_PAGE;

  let postResponse = null;
  try {
    postResponse = await client.queries.postConnection({
      first: posts.length,
      sort: 'date',
    });
  } catch (err) {
    console.error('Error fetching postConnection:', err);
    notFound();
  }

  let reversedPosts = [];
  try {
    reversedPosts = postResponse?.data?.postConnection?.edges
      ?.map((edge) => edge?.node)
      ?.filter(Boolean)
      ?.reverse();
  } catch (err) {
    console.error('Error processing posts:', err);
    notFound();
  }

  const finalisedPostData = reversedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  return (
    <BlogIndexPageClient
      currentPageIndexNumber={pageIndex}
      postsForPageIndex={finalisedPostData}
      numberOfPages={numPages}
    />
  );
}
