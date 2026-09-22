import { acceptsMarkdown } from './acceptsMarkdown';
import { htmlToMarkdown } from './markdownContent';

describe('markdown content negotiation', () => {
  it('only accepts an enabled Markdown media type', () => {
    expect(acceptsMarkdown('text/html, text/markdown')).toBe(true);
    expect(acceptsMarkdown('text/markdown; q=0.0')).toBe(false);
    expect(acceptsMarkdown('text/html')).toBe(false);
  });

  it('converts the main page content without surrounding chrome', () => {
    const html = `
      <nav>Navigation</nav>
      <main><h1>Hello</h1><p>Useful <strong>content</strong>.</p></main>
      <footer>Footer</footer>
    `;

    expect(htmlToMarkdown(html)).toBe('# Hello\n\nUseful **content**.\n');
  });
});
