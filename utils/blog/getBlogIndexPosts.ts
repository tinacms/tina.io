// utils/blog/getBlogIndexPosts.ts
import { glob } from 'fast-glob';
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import { LOCALE_ROUTE_CONFIG, type Locale } from 'utils/i18n/localeRouteConfig';

export const POSTS_PER_PAGE = 8;

export async function getBlogIndexStaticParams(locale: Locale) {
  const contentDir = LOCALE_ROUTE_CONFIG[locale].blogContentDir;
  const files = await glob(`${contentDir}**/*.mdx`);
  const numFiles = Math.ceil(files.length / POSTS_PER_PAGE);
  return Array.from(Array(numFiles).keys()).map((page) => ({
    page_index: (page + 1).toString(),
  }));
}

export async function getBlogIndexPosts(
  locale: Locale,
  pageIndexParam: string,
) {
  const contentDir = LOCALE_ROUTE_CONFIG[locale].blogContentDir;
  const posts = await glob(`${contentDir}**/*.mdx`);
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pageIndex = parseInt(pageIndexParam, 10) || 1;
  const startIndex = (pageIndex - 1) * POSTS_PER_PAGE;

  let postResponse = null;
  try {
    postResponse =
      locale === 'zh'
        ? await client.queries.postZhConnection({
            first: posts.length,
            sort: 'date',
          })
        : await client.queries.postConnection({
            first: posts.length,
            sort: 'date',
          });
  } catch (err) {
    console.error('Error fetching postConnection:', err);
    notFound();
  }

  const connection =
    locale === 'zh'
      ? postResponse?.data?.postZhConnection
      : postResponse?.data?.postConnection;

  let reversedPosts = [];
  try {
    reversedPosts = connection?.edges
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

  return { pageIndex, numPages, posts: finalisedPostData };
}
