// Dynamic 4:5 Instagram image for a blog post, as a Route Handler. See
// app/blog/og/[...slug] for the on-demand caching strategy.

import { blogSlugSet } from 'utils/blog/blogSlugs';
import { getBlogPost } from 'utils/blog/getBlogPost';
import { renderBlogInstagramImage } from 'utils/og/blogInstagramImage';

export const dynamic = 'force-static';
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string[] } },
) {
  const slugPath = params.slug.join('/');
  if (!(await blogSlugSet('en')).has(slugPath)) {
    return new Response(null, { status: 404 });
  }
  const { post } = await getBlogPost('en', slugPath);
  if (!post) {
    return new Response(null, { status: 404 });
  }
  return renderBlogInstagramImage({
    title: post.title,
    author: post.author,
    seed: slugPath,
  });
}
