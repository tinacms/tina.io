import { generateBlogStaticParams } from 'utils/blog/generateBlogStaticParams';
import { getBlogPost } from 'utils/blog/getBlogPost';
import {
  OG_ALT,
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderBlogOgImage,
} from 'utils/og/blogOgImage';

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamicParams = false;

export function generateStaticParams() {
  return generateBlogStaticParams('zh');
}

export default async function Image({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugPath = params.slug.join('/');
  const { post } = await getBlogPost('zh', slugPath);
  return renderBlogOgImage({
    title: post?.title ?? 'TinaCMS Blog',
    author: post?.author,
    seed: slugPath,
  });
}
