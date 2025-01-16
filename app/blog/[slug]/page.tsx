import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import BlogPageClient from './BlogPageClient';

export async function generateStaticParams() {
  const postsResponse = await client.queries.postConnection();
  return (
    postsResponse.data.postConnection.edges?.map((post) => ({
      slug: post?.node?._sys.filename,
    })) || []
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const vars = { relativePath: `${slug}.mdx` };

  let data;
  try {
    ({ data } = await client.queries.getExpandedPostDocument(vars));
  } catch (error) {
    console.error('Error generating metadata:', error);
    return notFound();
  }
  if (!data?.post) {
    return notFound();
  }

  return {
    title: `${data.post.title} | TinaCMS Blog`,
    description: data.post.excerpt ?? data.post.title,
    openGraph: {
      title: data.post.title,
      description: data.post.excerpt ?? data.post.title,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const vars = { relativePath: `${slug}.mdx` };

  let res;
  try {
    res = await client.queries.getExpandedPostDocument(vars);
  } catch (error) {
    console.error('Error fetching post:', error);
    return notFound();
  }
  if (!res?.data?.post) {
    return notFound();
  }

  return <BlogPageClient {...res} />;
}
