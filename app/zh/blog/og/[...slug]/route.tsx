// Dynamic blog OG image (zh) as a Route Handler. See app/blog/og/[...slug]
// for why this is a route handler rather than the opengraph-image convention.

import { generateBlogStaticParams } from 'utils/blog/generateBlogStaticParams';
import { getBlogPost } from 'utils/blog/getBlogPost';
import { renderBlogOgImage } from 'utils/og/blogOgImage';

const IS_EXPORT = process.env.EXPORT_MODE === 'static';

export const dynamic = 'force-static';
export const dynamicParams = !IS_EXPORT;

export function generateStaticParams() {
  return IS_EXPORT ? generateBlogStaticParams('zh') : [];
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string[] } },
) {
  const slugPath = params.slug.join('/');
  const { post } = await getBlogPost('zh', slugPath);
  return renderBlogOgImage({
    title: post?.title ?? 'TinaCMS Blog',
    author: post?.author,
    seed: slugPath,
  });
}
