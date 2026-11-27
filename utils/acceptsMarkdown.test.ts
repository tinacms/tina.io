import { acceptsMarkdown, getBlogMarkdownRoute } from './acceptsMarkdown';

describe('markdown content negotiation', () => {
  it.each([
    [null, false],
    ['*/*', false],
    ['text/*', false],
    ['text/html', false],
    ['text/markdown', true],
    ['Text/Markdown', true],
    ['text/markdown, text/html, */*', true],
    ['text/html, text/markdown', false],
    ['text/html, text/markdown;q=0.9', false],
    ['text/html;q=1, text/markdown;q=0.1', false],
    ['text/html;q=0.1, text/markdown;q=1', true],
    ['text/html, text/markdown;q=0', false],
    ['text/markdown;q=0.000, text/html', false],
    ['text/markdown; charset=utf-8; q=0, text/html', false],
    ['text/markdown;q=0.5', true],
    ['text/html;q=0, text/markdown', true],
  ])('Accept %p prefers Markdown: %p', (accept, expected) => {
    expect(acceptsMarkdown(accept)).toBe(expected);
  });

  it('maps blog post routes to their source MDX', () => {
    expect(getBlogMarkdownRoute('/blog/hello', false)).toBe(
      '/api/markdown/blog/en/hello',
    );
    expect(getBlogMarkdownRoute('/blog/hello/', false)).toBe(
      '/api/markdown/blog/en/hello',
    );
    expect(getBlogMarkdownRoute('/blog/tinacms-1.4', false)).toBe(
      '/api/markdown/blog/en/tinacms-1.4',
    );
    expect(getBlogMarkdownRoute('/zh/blog/hello', false)).toBe(
      '/api/markdown/blog/zh/hello',
    );
    expect(getBlogMarkdownRoute('/blog/hello', true)).toBe(
      '/api/markdown/blog/zh/hello',
    );
  });

  it.each([
    '/about',
    '/blog',
    '/blog/page/2',
    '/zh/blog/page/2',
    '/blog/og/hello',
    '/blog/instagram/hello',
  ])('leaves %s as HTML', (pathname) => {
    expect(getBlogMarkdownRoute(pathname, false)).toBeNull();
  });
});
