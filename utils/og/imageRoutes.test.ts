jest.doMock('utils/blog/blogSlugs', () => ({
  blogSlugSet: jest.fn(async () => new Set(['post'])),
}));
jest.doMock('utils/blog/getBlogPost', () => ({ getBlogPost: jest.fn() }));
jest.doMock('utils/og/blogOgImage', () => ({ renderBlogOgImage: jest.fn() }));
jest.doMock('utils/og/blogInstagramImage', () => ({
  renderBlogInstagramImage: jest.fn(),
}));

const { getBlogPost } = require('utils/blog/getBlogPost');

// Jest 25's test environment has no fetch Response global.
globalThis.Response ??= class {
  status: number;
  constructor(_body: BodyInit | null, init?: ResponseInit) {
    this.status = init?.status ?? 200;
  }
} as unknown as typeof Response;

for (const locale of ['en', 'zh']) {
  for (const kind of ['og', 'instagram']) {
    describe(`${locale}/${kind}`, () => {
      const routePath = `../../app/${locale === 'zh' ? 'zh/' : ''}blog/${kind}/[...slug]/route`;
      let route: typeof import('../../app/blog/og/[...slug]/route');
      beforeEach(() => {
        (getBlogPost as jest.Mock).mockReset();
        jest.isolateModules(() => {
          route = require(routePath);
        });
      });

      it('skips build-time rendering and propagates service errors', async () => {
        expect(await route.generateStaticParams()).toEqual([]);
        expect(route.dynamicParams).toBe(true);
        const failure = new Error('upstream 503');
        (getBlogPost as jest.Mock).mockRejectedValue(failure);
        await expect(
          route.GET(null, { params: { slug: ['post'] } }),
        ).rejects.toBe(failure);
      });

      it('returns 404 for an unknown slug without querying the post', async () => {
        const res = await route.GET(null, { params: { slug: ['missing'] } });
        expect(res.status).toBe(404);
        expect(getBlogPost).not.toHaveBeenCalled();
      });
    });
  }
}
