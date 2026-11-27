import client from 'tina/__generated__/client';
import type { Locale } from 'utils/i18n/localeRouteConfig';

export async function fetchBlogSlugs(locale: Locale): Promise<string[]> {
  const slugs: string[] = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    const connection =
      locale === 'zh'
        ? (await client.queries.postZhSlugs({ after })).data.postZhConnection
        : (await client.queries.postSlugs({ after })).data.postConnection;
    for (const edge of connection.edges ?? []) {
      const filename = edge?.node?._sys.filename;
      if (filename) {
        slugs.push(filename);
      }
    }
    hasNextPage = connection.pageInfo.hasNextPage;
    after = connection.pageInfo.endCursor;
  }
  return slugs;
}

const slugSets = new Map<Locale, Promise<Set<string>>>();

// Fetched once per warm instance; a failed or empty fetch is evicted so the next request retries.
export function blogSlugSet(locale: Locale): Promise<Set<string>> {
  let cached = slugSets.get(locale);
  if (!cached) {
    cached = fetchBlogSlugs(locale).then((slugs) => {
      if (slugs.length === 0) {
        throw new Error(`No ${locale} blog slugs returned`);
      }
      return new Set(slugs);
    });
    slugSets.set(locale, cached);
    cached.catch(() => slugSets.delete(locale));
  }
  return cached;
}
