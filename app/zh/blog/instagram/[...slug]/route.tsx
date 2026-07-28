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
