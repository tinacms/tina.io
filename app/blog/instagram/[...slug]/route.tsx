// Dynamic 4:5 Instagram image for a blog post, as a Route Handler. See
// app/blog/og/[...slug] for the on-demand-ISR / static-export split.

import { generateBlogStaticParams } from 'utils/blog/generateBlogStaticParams';
import { getBlogPost } from 'utils/blog/getBlogPost';
import { renderBlogInstagramImage } from 'utils/og/blogInstagramImage';

const IS_EXPORT = process.env.EXPORT_MODE === 'static';

export const dynamic = 'force-static';
export const dynamicParams = !IS_EXPORT;

export function generateStaticParams() {
  return IS_EXPORT ? generateBlogStaticParams('en') : [];
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
