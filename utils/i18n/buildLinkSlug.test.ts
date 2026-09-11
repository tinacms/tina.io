// utils/i18n/buildLinkSlug.test.ts
import { buildBlogLinkSlug } from './buildLinkSlug';

describe('buildBlogLinkSlug', () => {
  it('returns empty string for a missing id', () => {
    expect(buildBlogLinkSlug(undefined, 'en')).toBe('');
  });

  it('returns the English slug unchanged', () => {
    expect(buildBlogLinkSlug('content/blog/hello-world.mdx', 'en')).toBe(
      '/blog/hello-world',
    );
  });

  it('rewrites the zh blog slug', () => {
    expect(buildBlogLinkSlug('content/blog-zh/hello-world.mdx', 'zh')).toBe(
      '/zh/blog/hello-world',
    );
  });
});
