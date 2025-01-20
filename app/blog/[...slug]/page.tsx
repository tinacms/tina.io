import { glob } from 'fast-glob';
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import BlogPageClient from './BlogPageClient';

export async function generateStaticParams() {
  const contentDir = './content/blog/';
  const files = await glob(`${contentDir}**/*.mdx`);
  return files
    .filter((file) => !file.endsWith('index.mdx'))
    .map((file) => {
      const path = file.substring(contentDir.length, file.length - 4); // Remove "./content/blog/" and ".mdx"
      return { slug: path.split('/') };
    });
}

export const dynamicParams = false;

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
  const slug = params.slug;
  const vars = { relativePath: `${slug}.mdx` };
  try {
    const res = await client.queries.getExpandedPostDocument(vars);
    return <BlogPageClient {...res} />;
  } catch (error) {
    console.error(`Error fetching post for slug: ${slug}`, error);
    return notFound();
  }
}