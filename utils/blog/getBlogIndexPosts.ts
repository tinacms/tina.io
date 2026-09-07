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

  // Tina sorts oldest first, but the page shows newest first. Read the cursors
  // once, then read only the posts this page shows.
  let cursors: string[] = [];
  try {
    const vars = { first: posts.length, sort: 'date' };
    const edges =
      locale === 'zh'
        ? (await client.queries.postZhCursors(vars))?.data?.postZhConnection
            ?.edges
        : (await client.queries.postCursors(vars))?.data?.postConnection?.edges;
    cursors = (edges ?? []).map((edge) => edge?.cursor ?? '');
  } catch (err) {
    console.error('Error fetching post cursors:', err);
    notFound();
  }

  const total = cursors.length;
  const count = Math.min(POSTS_PER_PAGE, total - startIndex);
  if (count <= 0) {
    return { pageIndex, numPages, posts: [] };
  }
  const firstOnPage = total - startIndex - count;
  const after = firstOnPage > 0 ? cursors[firstOnPage - 1] : null;

  let pagePosts = [];
  try {
    const vars = { first: count, after, sort: 'date' };
    const edges =
      locale === 'zh'
        ? (await client.queries.postZhPage(vars))?.data?.postZhConnection?.edges
        : (await client.queries.postPage(vars))?.data?.postConnection?.edges;
    pagePosts = (edges ?? [])
      .map((edge) => edge?.node)
      .filter(Boolean)
      .reverse();
  } catch (err) {
    console.error('Error fetching posts for page:', err);
    notFound();
  }

  return { pageIndex, numPages, posts: pagePosts };
}
