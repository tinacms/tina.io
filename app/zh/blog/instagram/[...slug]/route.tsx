// Dynamic 4:5 Instagram image (zh) for a blog post, as a Route Handler. See
// app/blog/og/[...slug] for why this is a route handler rather than the
// opengraph-image convention.

import { generateBlogStaticParams } from 'utils/blog/generateBlogStaticParams';
import { getBlogPost } from 'utils/blog/getBlogPost';
import { renderBlogInstagramImage } from 'utils/og/blogInstagramImage';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return generateBlogStaticParams('zh');
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string[] } },
) {
  const slugPath = params.slug.join('/');
  const { post } = await getBlogPost('zh', slugPath);
  return renderBlogInstagramImage({
    title: post?.title ?? 'TinaCMS Blog',
    author: post?.author,
    seed: slugPath,
  });
}
