import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';
import { getExcerpt } from 'utils/getExcerpt';
import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import BlogPageClient from './BlogPageClient';
import type { BlogPost } from './BlogType';

export const dynamicParams = false;

export async function generateStaticParams() {
  let allPosts = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    try {
      const postsResponse = await client.queries.postZhConnection({ after });

      const edges = postsResponse?.data?.postZhConnection?.edges || [];
      const pageInfo = postsResponse?.data?.postZhConnection?.pageInfo || {
        hasNextPage: false,
        endCursor: null,
      };

      allPosts = allPosts.concat(
        edges.map((post) => ({
          slug: [post?.node?._sys?.filename],
        })),
      );

      hasNextPage = pageInfo.hasNextPage;
      after = pageInfo.endCursor;
    } catch (error) {
      console.error('Error during static params generation:', error);
      notFound();
    }
  }
  return allPosts;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugPath = params.slug.join('/');
  const vars = { relativePath: `${slugPath}.mdx` };

  const { data } = await client.queries.getExpandedPostZhDocument(vars);
  const excerpt = getExcerpt(data.postZh.body, 140);

  if (!data?.postZh) {
    console.warn(`No metadata found for slug: ${slugPath}`);
    return notFound();
  }
  return getSeo({
    title: `${data.postZh.title} | TinaCMS Blog`,
    description: excerpt,
    canonicalUrl: `${settings.siteUrl}/zh/blog/${slugPath}`,
  });
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugPath = params.slug.join('/');
  const vars = { relativePath: `${slugPath}.mdx` };

  try {
    const res = await client.queries.getExpandedPostZhDocument(vars);

    if (!res.data?.postZh) {
      console.warn(`No post found for slug: ${slugPath}`);
      return notFound();
    }

    const fetchedPost = res.data.postZh;

    const postZh: BlogPost = {
      _sys: fetchedPost._sys,
      id: fetchedPost.id,
      title: fetchedPost.title,
      date: fetchedPost.date || '',
      last_edited: fetchedPost.last_edited ?? null,
      author: fetchedPost.author || '',
      seo: fetchedPost.seo
        ? {
            title: fetchedPost.seo.title || 'Default SEO Title',
            description:
              fetchedPost.seo.description || 'Default SEO Description',
          }
        : null,
      prev: fetchedPost.prev ?? null,
      next: fetchedPost.next ?? null,
      body: fetchedPost.body as TinaMarkdownContent,
      giscusProps: {
        giscusRepo: `${process.env.GISCUS_ORG}/${process.env.GISCUS_REPO_NAME}`,
        giscusRepoId: process.env.GISCUS_REPO_ID,
        giscusCategory: process.env.GISCUS_CATEGORY,
        giscusCategoryId: process.env.GISCUS_CATEGORY_ID,
        giscusThemeUrl: process.env.GISCUS_THEME_URL,
      },
    };
    return <BlogPageClient data={{ post: postZh }} />;
  } catch (error) {
    console.error(`Error fetching post for slug: ${slugPath}`, error);
    return notFound();
  }
}
