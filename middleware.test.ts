// Only the static matcher is under test, and next/server needs Edge runtime
// globals that jsdom lacks. Mock it before loading the module.
jest.doMock('next/server', () => ({}));
const { config } = require('./middleware');

// Next.js anchors the matcher source and tests it against the pathname.
const matcher = new RegExp(`^${config.matcher[0]}$`);

describe('middleware matcher', () => {
  it.each([
    '/',
    '/pricing',
    '/blog/2021-a-year-in-review',
    // Blog slugs that end in a version number must still reach middleware,
    // or tinaio.cn serves the English post.
    '/blog/tinacms-1.4',
    '/blog/tina-v-1.1.3',
    '/blog/tina-version-0.69.13',
    '/blog/og/tinacms-1.4',
  ])('runs on %s', (pathname) => {
    expect(matcher.test(pathname)).toBe(true);
  });

  it.each([
    '/api/contact',
    '/_next/static/chunks/main.js',
    '/admin/index.html',
    '/p/e',
    '/favicon.ico',
    '/img/logo.png',
    '/fonts/inter.woff2',
    '/sitemap.xml',
  ])('skips %s', (pathname) => {
    expect(matcher.test(pathname)).toBe(false);
  });
});
