import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import BlogPageClient from './BlogPageClient';

export async function generateStaticParams() {
  const postsResponse = await client.queries.postConnection();

  return (
    postsResponse.data.postConnection.edges?.map((post) => ({
      slug: [post?.node?._sys.filename], 
    })) || []
  );
}


export async function generateMetadata({ params }: { params: { slug: string } }) {
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
