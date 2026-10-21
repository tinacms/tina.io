/** @jest-environment node */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

jest.doMock('components/layout/RichTextWrapper', () => ({
  RichTextWrapper: 'div',
}));
jest.doMock('components/ui', () => ({
  DynamicLink: ({ children, href }) => createElement('a', { href }, children),
}));
jest.doMock('tinacms/dist/react', () => ({ tinaField: () => undefined }));
jest.doMock('../VideoEmbed/videoEmbed', () => ({ YouTubeEmbed: () => null }));
jest.doMock('./FeaturedPost', () => ({ FeaturedPost: () => null }));

const { RecentPostsBlock } = require('./RecentPosts');

const makePost = (author?: string | null) => ({
  title: 'October update',
  date: '2026-10-22T00:00:00.000Z',
  _sys: {
    filename: 'october-update',
    path: 'content/blog/october-update.mdx',
  },
  ...(author === undefined ? {} : { author }),
});

const renderPosts = (posts: ReturnType<typeof makePost>[]) =>
  renderToStaticMarkup(
    createElement(RecentPostsBlock, {
      data: {},
      index: 0,
      recentPosts: { edges: posts.map((node) => ({ node })) },
    }),
  );

describe('RecentPostsBlock blog cards', () => {
  it.each([null, undefined, ''])('renders a post with author %s', (author) => {
    const html = renderPosts([makePost(author)]);

    expect(html).toContain('October update');
    expect(html).toContain('href="/blog/october-update"');
    expect(html).toContain('22 OCT, 2026');
    expect(html).not.toContain('By ');
    expect(html).not.toContain('The TinaCMS Team');
  });

  it('keeps a named byline when another post has no author', () => {
    const html = renderPosts([makePost(null), makePost('Jane Example')]);

    expect(html).toContain('By JANE EXAMPLE');
    expect(html.match(/By /g)).toHaveLength(1);
  });
});
