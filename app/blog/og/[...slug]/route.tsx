// Dynamic blog OG image as a Route Handler.
//
// The Next `opengraph-image` file convention can't be used inside the
// `[...slug]` catch-all (it appends a hidden metadata-id segment, which makes
// the catch-all no longer last — "Catch-all must be the last part of the URL").
// So we serve the image from a distinct prefix (/blog/og/<slug>) and point
// `openGraph.images` at it from the post's generateMetadata.
//
// Render on the first request and cache the image. Returning no static params
// keeps image rendering out of the build. Assets load from disk or the public
// production host at runtime (see utils/og/ogAssets).

import { blogSlugSet } from 'utils/blog/blogSlugs';
import { getBlogPost } from 'utils/blog/getBlogPost';
import { renderBlogOgImage } from 'utils/og/blogOgImage';

export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600;

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
  return renderBlogOgImage({
    title: post.title,
    author: post.author,
    seed: slugPath,
  });
}
