import { generateBlogStaticParams } from 'utils/blog/generateBlogStaticParams';
import { getBlogPost } from 'utils/blog/getBlogPost';
import { isMissingBlogPostError } from 'utils/blog/isMissingBlogPostError';
import { renderBlogInstagramImage } from 'utils/og/blogInstagramImage';

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
  let post: Awaited<ReturnType<typeof getBlogPost>>['post'];
  try {
    ({ post } = await getBlogPost('zh', slugPath));
  } catch (error) {
    if (!isMissingBlogPostError(error, 'zh', slugPath)) {
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
