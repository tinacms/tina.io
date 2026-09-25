import { execSync } from 'child_process';

jest.doMock('utils/blog/getBlogPost', () => ({ getBlogPost: jest.fn() }));
jest.doMock('utils/blog/generateBlogStaticParams', () => ({
  generateBlogStaticParams: jest.fn(),
}));
jest.doMock('utils/og/blogOgImage', () => ({ renderBlogOgImage: jest.fn() }));
jest.doMock('utils/og/blogInstagramImage', () => ({
  renderBlogInstagramImage: jest.fn(),
}));

const { getBlogPost } = require('utils/blog/getBlogPost');
const {
  generateBlogStaticParams,
} = require('utils/blog/generateBlogStaticParams');

const originalExportMode = process.env.EXPORT_MODE;
afterAll(() => {
  if (originalExportMode === undefined) {
    delete process.env.EXPORT_MODE;
  } else {
    process.env.EXPORT_MODE = originalExportMode;
  }
});

it('exports both environment variables separately in the package script', () => {
  const command = require('../../package.json')
    .scripts.export.split('&&')[1]
    .trim()
    .replace(
      /next build$/,
      `node -e 'process.stdout.write(JSON.stringify([process.env.EXPORT_MODE, process.env.UNOPTIMIZED_IMAGES]))'`,
    );
  expect(JSON.parse(execSync(command, { encoding: 'utf8' }))).toEqual([
    'static',
    'true',
  ]);
});

for (const locale of ['en', 'zh']) {
  for (const kind of ['og', 'instagram']) {
    const routePath = `../../app/${locale === 'zh' ? 'zh/' : ''}blog/${kind}/[...slug]/route`;
    it(`${locale}/${kind} skips server prerendering, preserves exports and propagates service errors`, async () => {
      for (const mode of ['', 'static']) {
        process.env.EXPORT_MODE = mode;
        let route: typeof import('../../app/blog/og/[...slug]/route');
        jest.isolateModules(() => {
          route = require(routePath);
        });
        (generateBlogStaticParams as jest.Mock).mockResolvedValue([
          { slug: ['post'] },
        ]);
        expect(await route.generateStaticParams()).toEqual(
          mode ? [{ slug: ['post'] }] : [],
        );
        expect(route.dynamicParams).toBe(!mode);
        const failure = new Error('upstream 503');
        (getBlogPost as jest.Mock).mockRejectedValue(failure);
        await expect(
          route.GET(null, { params: { slug: ['post'] } }),
        ).rejects.toBe(failure);
      }
    });
  }
}
