// The on-page copy of the OG image. It leaves out the "New Post" chip.
// See app/blog/og/[...slug] for the caching setup.

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
  if (!(await blogSlugSet('zh')).has(slugPath)) {
    return new Response(null, { status: 404 });
  }
  const { post } = await getBlogPost('zh', slugPath);
  if (!post) {
    return new Response(null, { status: 404 });
  }
  return renderBlogOgImage({
    title: post.title,
    author: post.author,
    seed: slugPath,
    showChip: false,
  });
}
