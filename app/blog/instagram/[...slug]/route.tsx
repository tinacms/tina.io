// Dynamic 4:5 Instagram image for a blog post, as a Route Handler. See
// app/blog/og/[...slug] for why this is a route handler (force-static so the
// fonts/photos under public/ are readable via fs at build time).

import { generateBlogStaticParams } from 'utils/blog/generateBlogStaticParams';
import { getBlogPost } from 'utils/blog/getBlogPost';
import { renderBlogInstagramImage } from 'utils/og/blogInstagramImage';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return generateBlogStaticParams('en');
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string[] } },
) {
  const slugPath = params.slug.join('/');
  const { post } = await getBlogPost('en', slugPath);
  return renderBlogInstagramImage({
    title: post?.title ?? 'TinaCMS Blog',
    author: post?.author,
    seed: slugPath,
  });
}
