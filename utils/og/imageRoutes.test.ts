jest.doMock('utils/blog/getBlogPost', () => ({ getBlogPost: jest.fn() }));
jest.doMock('utils/og/blogOgImage', () => ({ renderBlogOgImage: jest.fn() }));
jest.doMock('utils/og/blogInstagramImage', () => ({
  renderBlogInstagramImage: jest.fn(),
}));

const { getBlogPost } = require('utils/blog/getBlogPost');
for (const locale of ['en', 'zh']) {
  for (const kind of ['og', 'instagram']) {
    const routePath = `../../app/${locale === 'zh' ? 'zh/' : ''}blog/${kind}/[...slug]/route`;
    it(`${locale}/${kind} skips build-time rendering and propagates service errors`, async () => {
      let route: typeof import('../../app/blog/og/[...slug]/route');
      jest.isolateModules(() => {
        route = require(routePath);
      });
      expect(await route.generateStaticParams()).toEqual([]);
      expect(route.dynamicParams).toBe(true);
      const failure = new Error('upstream 503');
      (getBlogPost as jest.Mock).mockRejectedValue(failure);
      await expect(
        route.GET(null, { params: { slug: ['post'] } }),
      ).rejects.toBe(failure);
    });
  }
}
