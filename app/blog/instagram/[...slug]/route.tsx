// Dynamic 4:5 Instagram image for a blog post, as a Route Handler. See
// app/blog/og/[...slug] for the on-demand caching strategy.

import { getBlogPost } from 'utils/blog/getBlogPost';
import { isMissingBlogPostError } from 'utils/blog/isMissingBlogPostError';
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
  let post: Awaited<ReturnType<typeof getBlogPost>>['post'];
  try {
    ({ post } = await getBlogPost('en', slugPath));
  } catch (error) {
    if (!isMissingBlogPostError(error, 'en', slugPath)) {
      throw error;
    }
    return new Response(null, { status: 404 });
  }
  if (!post) {
    // Unknown slug: 404 rather than render + ISR-cache a generic fallback image.
    return new Response(null, { status: 404 });
  }
  return renderBlogInstagramImage({
    title: post.title,
    author: post.author,
    seed: slugPath,
  });
}
