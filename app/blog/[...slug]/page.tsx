import BlogPageClient from 'components/blog/BlogPageClient';
import { notFound } from 'next/navigation';
import { generateBlogStaticParams } from 'utils/blog/generateBlogStaticParams';
import { getBlogPost } from 'utils/blog/getBlogPost';
import { getExcerpt } from 'utils/getExcerpt';
import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';

export const dynamicParams = false;

export function generateStaticParams() {
  return generateBlogStaticParams('en');
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugPath = params.slug.join('/');
  const { post } = await getBlogPost('en', slugPath);
  if (!post) {
    console.warn(`No metadata found for slug: ${slugPath}`);
    return notFound();
  }
  const excerpt = getExcerpt(post.body, 140);
  return getSeo(
    {
      title: `${post.title} | TinaCMS Blog`,
      description: excerpt,
      canonicalUrl: `${settings.siteUrl}/blog/${slugPath}`,
    },
    undefined,
    // og:image / twitter:image come from the dynamic opengraph-image.tsx
    { omitOgImage: true },
  );
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugPath = params.slug.join('/');
  try {
    const { post, query, variables } = await getBlogPost('en', slugPath);
    if (!post) {
      console.warn(`No post found for slug: ${slugPath}`);
      return notFound();
    }
    return (
      <BlogPageClient
        data={{ post }}
        variables={variables}
        query={query}
        locale="en"
      />
    );
  } catch (error) {
    console.error(`Error fetching post for slug: ${slugPath}`, error);
    return notFound();
  }
}
