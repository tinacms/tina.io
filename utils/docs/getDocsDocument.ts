// utils/docs/getDocsDocument.ts
import client from 'tina/__generated__/client';
import type { Locale } from 'utils/i18n/localeRouteConfig';

/**
 * Fetch a docs document for the given locale and normalize the result.
 * `document` is the locale-agnostic doc node; `query`/`variables`/`data`
 * are passed through verbatim so the client component can call useTina.
 */
export async function getDocsDocument(locale: Locale, slug: string) {
  const relativePath = `${slug}.mdx`;
  if (locale === 'zh') {
    const res = await client.queries.docZh({ relativePath });
    return {
      document: res.data.docZh,
      data: res.data,
      query: res.query,
      variables: res.variables,
    };
  }
  const res = await client.queries.doc({ relativePath });
  return {
    document: res.data.doc,
    data: res.data,
    query: res.query,
    variables: res.variables,
  };
}
