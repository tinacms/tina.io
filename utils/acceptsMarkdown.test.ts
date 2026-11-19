import { acceptsMarkdown, getBlogMarkdownRoute } from './acceptsMarkdown';

describe('markdown content negotiation', () => {
  it('only accepts an enabled Markdown media type', () => {
    expect(acceptsMarkdown('text/html, text/markdown')).toBe(true);
    expect(acceptsMarkdown('text/markdown; q=0.0')).toBe(false);
    expect(acceptsMarkdown('text/html')).toBe(false);
  });

  it('only maps source-backed blog post routes', () => {
    expect(getBlogMarkdownRoute('/blog/hello', false)).toBe(
      '/api/markdown/blog/en/hello',
    );
    expect(getBlogMarkdownRoute('/zh/blog/hello', false)).toBe(
      '/api/markdown/blog/zh/hello',
    );
    expect(getBlogMarkdownRoute('/blog/hello', true)).toBe(
      '/api/markdown/blog/zh/hello',
    );
    expect(getBlogMarkdownRoute('/about', false)).toBeNull();
  });
});
