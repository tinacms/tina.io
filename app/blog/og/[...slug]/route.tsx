// Dynamic blog OG image as a Route Handler.
//
// The Next `opengraph-image` file convention can't be used inside the
// `[...slug]` catch-all (it appends a hidden metadata-id segment, which makes
// the catch-all no longer last — "Catch-all must be the last part of the URL").
// So we serve the image from a distinct prefix (/blog/og/<slug>) and point
// `openGraph.images` at it from the post's generateMetadata.
//
// force-static + generateStaticParams pre-renders one image per post at build
// (where the fonts/photos under public/ are readable via fs).

import { generateBlogStaticParams } from 'utils/blog/generateBlogStaticParams';
import { getBlogPost } from 'utils/blog/getBlogPost';
import { renderBlogOgImage } from 'utils/og/blogOgImage';

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
  return renderBlogOgImage({
    title: post?.title ?? 'TinaCMS Blog',
    author: post?.author,
    seed: slugPath,
  });
}
