// utils/i18n/buildLinkSlug.test.ts
import { buildBlogLinkSlug, buildDocLinkSlug } from './buildLinkSlug';

describe('buildDocLinkSlug', () => {
  it('returns the English slug unchanged from a doc id', () => {
    expect(buildDocLinkSlug('content/docs/setup/install.mdx', 'en')).toBe(
      '/docs/setup/install',
    );
  });

  // The Chinese site has its own domain and serves prefix-free URLs, so a
  // zh doc id maps to the same public path as its English counterpart.
  it('maps the zh content slug to the shared, prefix-free url slug', () => {
    expect(buildDocLinkSlug('content/docs-zh/setup/install.mdx', 'zh')).toBe(
      '/docs/setup/install',
    );
  });

  it('drops a trailing /index for zh', () => {
    expect(buildDocLinkSlug('content/docs-zh/setup/index.mdx', 'zh')).toBe(
      '/docs/setup',
    );
  });

  it('returns empty string for a missing id', () => {
    expect(buildDocLinkSlug(undefined, 'en')).toBe('');
  });

  it('does NOT trim /index for English (intentional — only zh trims it)', () => {
    expect(buildDocLinkSlug('content/docs/index.mdx', 'en')).toBe(
      '/docs/index',
    );
  });
});

describe('buildBlogLinkSlug', () => {
  it('returns the English slug unchanged', () => {
    expect(buildBlogLinkSlug('content/blog/hello-world.mdx', 'en')).toBe(
      '/blog/hello-world',
    );
  });

  it('maps the zh blog slug to the shared, prefix-free url slug', () => {
    expect(buildBlogLinkSlug('content/blog-zh/hello-world.mdx', 'zh')).toBe(
      '/blog/hello-world',
    );
  });
});
