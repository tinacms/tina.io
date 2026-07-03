import { DEFAULT_SEO } from './defaultSeo';
import { getSeo } from './getSeo';

// biome-ignore lint/suspicious/noExplicitAny: loosely typed metadata in tests
const og = (m: ReturnType<typeof getSeo>): any => m.openGraph;

describe('getSeo', () => {
  it('uses the title and description as given', () => {
    const m = getSeo({
      title: 'My Post | TinaCMS Blog',
      description: 'A short summary.',
      canonicalUrl: 'https://tina.io/blog/my-post',
    });
    expect(m.title).toBe('My Post | TinaCMS Blog');
    expect(m.description).toBe('A short summary.');
    expect(og(m).title).toBe('My Post | TinaCMS Blog');
  });

  it('preserves siteName / type / locale from the defaults', () => {
    const m = getSeo({ title: 'X', canonicalUrl: 'https://tina.io/x' });
    const defaults = og({ openGraph: DEFAULT_SEO.openGraph } as ReturnType<
      typeof getSeo
    >);
    expect(og(m).siteName).toBe(defaults.siteName);
    expect(og(m).type).toBe(defaults.type);
    expect(og(m).locale).toBe(defaults.locale);
  });

  it('uses a supplied ogImage verbatim and sets its alt to the title', () => {
    const m = getSeo({
      title: 'My Post | TinaCMS Blog',
      ogImage: '/blog/og/my-post',
      canonicalUrl: 'https://tina.io/blog/my-post',
    });
    expect(og(m).images[0].url).toBe('/blog/og/my-post');
    expect(og(m).images[0].alt).toBe('My Post | TinaCMS Blog');
  });

  it('mirrors a supplied ogImage onto the Twitter card with alt', () => {
    const m = getSeo({
      title: 'My Post | TinaCMS Blog',
      ogImage: '/blog/og/my-post',
    });
    expect(m.twitter?.images).toEqual([
      { url: '/blog/og/my-post', alt: 'My Post | TinaCMS Blog' },
    ]);
  });

  it('does not override the Twitter card when no ogImage is supplied', () => {
    const m = getSeo({ title: 'X' });
    // biome-ignore lint/suspicious/noExplicitAny: loosely typed metadata in tests
    expect((m.twitter as any)?.images).toBeUndefined();
  });

  it('falls back to the default OG image when none is supplied', () => {
    const m = getSeo({ title: 'X' });
    expect(og(m).images[0].url).toBeTruthy();
    expect(og(m).images[0].alt).toBe('Tina - The Markdown CMS'); // default, not overridden
  });
});
