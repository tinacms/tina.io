// Dynamic blog OG image as a Route Handler.
//
// The Next `opengraph-image` file convention can't be used inside the
// `[...slug]` catch-all (it appends a hidden metadata-id segment, which makes
// the catch-all no longer last — "Catch-all must be the last part of the URL").
// So we serve the image from a distinct prefix (/blog/og/<slug>) and point
// `openGraph.images` at it from the post's generateMetadata.
//
// Rendered on-demand and cached (ISR): the first request for a post's image
// renders it, then it's served from cache. A static export (output: 'export')
// can't generate on-demand, so it must prebuild every image instead — gated on
// the same EXPORT_MODE switch next.config.js uses. Fonts/photos load via
// import.meta.url (see utils/og/ogAssets), so they resolve at build or runtime.

import { generateBlogStaticParams } from 'utils/blog/generateBlogStaticParams';
import { getBlogPost } from 'utils/blog/getBlogPost';
import { renderBlogOgImage } from 'utils/og/blogOgImage';

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
  return renderBlogOgImage({
    title: post?.title ?? 'TinaCMS Blog',
    author: post?.author,
    seed: slugPath,
  });
}
