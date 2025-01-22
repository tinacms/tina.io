import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import BlogPageClient from './BlogPageClient';

export async function generateStaticParams() {
  let allPosts = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    const postsResponse = await client.queries.postConnection({ after });

    const edges = postsResponse?.data?.postConnection?.edges || [];
    const pageInfo = postsResponse?.data?.postConnection?.pageInfo || {
      hasNextPage: false,
      endCursor: null,
    };

    allPosts = allPosts.concat(
      edges.map((post) => ({
        slug: [post?.node?._sys?.filename],
      }))
    );

    hasNextPage = pageInfo.hasNextPage;
    after = pageInfo.endCursor;
  }

  console.log(allPosts);
  const dataSize = new TextEncoder().encode(JSON.stringify(allPosts)).length;
  console.log(`Total posts fetched: ${allPosts.length}`);
  console.log(`Size of allPosts data: ${dataSize} bytes (${(dataSize / 1024).toFixed(2)} KB)`);

  return allPosts;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const vars = { relativePath: `${slug}.mdx` };

  try {
    const { data } = await client.queries.getExpandedPostDocument(vars);

    if (!data?.post) {
      console.warn(`No metadata found for slug: ${slug}`);
      return notFound();
    }

    return {
      title: `${data.post.title} | TinaCMS Blog`,
      openGraph: {
        title: data.post.title,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | TinaCMS',
      description: 'Read our latest blog post.',
    };
  }
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log('the params: ', params);
  const slug = params.slug;
  const vars = { relativePath: `${slug}.mdx` };

  try {
    const res = await client.queries.getExpandedPostDocument(vars);

    if (!res?.data?.post) {
      console.warn(`Post not found for slug: ${slug}`);
      return notFound();
    }

    return <BlogPageClient {...res} />;
  } catch (error) {
    console.error(`Error fetching post for slug: ${slug}`, error);
    return notFound();
  }
}
