// utils/blog/generateBlogStaticParams.ts
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import type { Locale } from 'utils/i18n/localeRouteConfig';

export async function generateBlogStaticParams(locale: Locale) {
  let allPosts: { slug: string[] }[] = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    try {
      if (locale === 'zh') {
        const res = await client.queries.postZhConnection({ after });
        const connection = res?.data?.postZhConnection;
        const edges = connection?.edges || [];
        const pageInfo = connection?.pageInfo || {
          hasNextPage: false,
          endCursor: null,
        };
        allPosts = allPosts.concat(
          edges.map((post) => ({ slug: [post?.node?._sys?.filename] })),
        );
        hasNextPage = pageInfo.hasNextPage;
        after = pageInfo.endCursor;
      } else {
        const res = await client.queries.postConnection({ after });
        const connection = res?.data?.postConnection;
        const edges = connection?.edges || [];
        const pageInfo = connection?.pageInfo || {
          hasNextPage: false,
          endCursor: null,
        };
        allPosts = allPosts.concat(
          edges.map((post) => ({ slug: [post?.node?._sys?.filename] })),
        );
        hasNextPage = pageInfo.hasNextPage;
        after = pageInfo.endCursor;
      }
    } catch (error) {
      console.error('Error during static params generation:', error);
      notFound();
    }
  }
  return allPosts;
}
