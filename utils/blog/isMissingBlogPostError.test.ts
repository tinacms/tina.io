import { isMissingBlogPostError } from './isMissingBlogPostError';

it('only recognizes a single missing-record error for the requested post', () => {
  const missing = (path: string) =>
    new Error(
      `Unable to fetch, please see our FAQ\nErrors: \n\tUnable to find record content/${path}.mdx`,
    );
  expect(isMissingBlogPostError(missing('blog/post'), 'en', 'post')).toBe(true);
  expect(isMissingBlogPostError(missing('blog-zh/post'), 'zh', 'post')).toBe(
    true,
  );
  expect(isMissingBlogPostError(missing('blog/other'), 'en', 'post')).toBe(
    false,
  );
  expect(isMissingBlogPostError(missing('blog/post'), 'zh', 'post')).toBe(
    false,
  );
  expect(
    isMissingBlogPostError(
      new Error('Server responded with status code 503'),
      'en',
      'post',
    ),
  ).toBe(false);
  expect(
    isMissingBlogPostError(
      new Error(`${missing('blog/post').message}\nDatabase unavailable`),
      'en',
      'post',
    ),
  ).toBe(false);
});
