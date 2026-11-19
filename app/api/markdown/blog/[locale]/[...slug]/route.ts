import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type MarkdownContext = {
  keys: () => string[];
  (key: string): { default: string };
};

// @ts-expect-error require.context is provided by Webpack.
const englishPosts = require.context(
  '!!raw-loader!../../../../../../content/blog',
  true,
  /\.mdx$/,
) as MarkdownContext;
// @ts-expect-error require.context is provided by Webpack.
const chinesePosts = require.context(
  '!!raw-loader!../../../../../../content/blog-zh',
  true,
  /\.mdx$/,
) as MarkdownContext;

export async function GET(
  _request: Request,
  { params }: { params: { locale: string; slug: string[] } },
) {
  const { locale, slug } = params;
  if (locale !== 'en' && locale !== 'zh') {
    return NextResponse.json({ error: 'Unknown locale' }, { status: 404 });
  }

  const posts = locale === 'zh' ? chinesePosts : englishPosts;
  const key = `./${slug.join('/')}.mdx`;
  if (!posts.keys().includes(key)) {
    return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
  }

  return new NextResponse(posts(key).default, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
