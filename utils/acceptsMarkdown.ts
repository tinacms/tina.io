import Negotiator from 'negotiator';

// Pick between HTML and Markdown the same way TinaDocs does, so q-values,
// wildcards and case are respected. A missing header or a bare wildcard gets
// HTML, and Markdown is only chosen when the client prefers it.
export function acceptsMarkdown(accept: string | null) {
  const type = new Negotiator({
    headers: { accept: accept ?? '*/*' },
  }).mediaType(['text/html', 'text/markdown']);
  return type === 'text/markdown';
}

// Only a single-segment slug is a blog post. Listing pages (`/blog/page/2`),
// OG images (`/blog/og/<slug>`) and Instagram cards keep their HTML/image
// responses whatever the client accepts.
export function getBlogMarkdownRoute(
  pathname: string,
  isChineseDomain: boolean,
) {
  const match = pathname.match(/^\/(?:(zh)\/)?blog\/([^/]+)\/?$/);
  if (!match || match[2] === 'page') {
    return null;
  }

  const locale = isChineseDomain || match[1] ? 'zh' : 'en';
  return `/api/markdown/blog/${locale}/${match[2]}`;
}
