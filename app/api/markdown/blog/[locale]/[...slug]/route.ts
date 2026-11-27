import settings from '@/content/settings/config.json';

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
    return notFound();
  }

  const posts = locale === 'zh' ? chinesePosts : englishPosts;
  const key = `./${slug.join('/')}.mdx`;
  if (!posts.keys().includes(key)) {
    return notFound();
  }

  const prefix = locale === 'zh' ? '/zh' : '';
  return new Response(posts(key).default, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Point search engines at the HTML page, which is the same URL.
      Link: `<${settings.siteUrl}${prefix}/blog/${slug.join('/')}>; rel="canonical"`,
      // HTML and MDX share a URL, and Next.js 14 drops Vary: Accept. Keep MDX
      // out of shared caches so a cache that ignores Accept can't serve it to
      // a browser. The worst case is then an agent getting cached HTML.
      'Cache-Control': 'private, no-store',
      Vary: 'Accept',
    },
  });
}

const notFound = () =>
  new Response('Not found', {
    status: 404,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', Vary: 'Accept' },
  });
