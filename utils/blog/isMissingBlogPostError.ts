import type { Locale } from 'utils/i18n/localeRouteConfig';

export function isMissingBlogPostError(
  error: unknown,
  locale: Locale,
  slugPath: string,
): boolean {
  const collection = locale === 'zh' ? 'blog-zh' : 'blog';
  // Tina's client flattens GraphQL errors into a plain Error. Only accept a
  // single missing-record error for this exact post, not a missing reference.
  return (
    error instanceof Error &&
    error.message.split('Errors:')[1]?.trim() ===
      `Unable to find record content/${collection}/${slugPath}.mdx`
  );
}
