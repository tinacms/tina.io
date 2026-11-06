const postSlugs = jest.fn();
jest.doMock(
  'tina/__generated__/client',
  () => ({ __esModule: true, default: { queries: { postSlugs } } }),
  { virtual: true },
);

const page = (filenames: string[]) => ({
  data: {
    postConnection: {
      edges: filenames.map((filename) => ({ node: { _sys: { filename } } })),
      pageInfo: { hasNextPage: false, endCursor: null },
    },
  },
});

let blogSlugSet: typeof import('./blogSlugs').blogSlugSet;
beforeEach(() => {
  postSlugs.mockReset();
  jest.isolateModules(() => {
    ({ blogSlugSet } = require('./blogSlugs'));
  });
});

it('memoizes a successful slug fetch', async () => {
  postSlugs.mockResolvedValue(page(['post']));
  expect((await blogSlugSet('en')).has('post')).toBe(true);
  await blogSlugSet('en');
  expect(postSlugs).toHaveBeenCalledTimes(1);
});

it('retries after a failed or empty fetch', async () => {
  postSlugs
    .mockRejectedValueOnce(new Error('upstream 503'))
    .mockResolvedValueOnce(page([]))
    .mockResolvedValueOnce(page(['post']));
  await expect(blogSlugSet('en')).rejects.toThrow('upstream 503');
  await expect(blogSlugSet('en')).rejects.toThrow('No en blog slugs');
  expect((await blogSlugSet('en')).has('post')).toBe(true);
});
