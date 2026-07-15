// utils/docs/generateDocsMetadata.ts

import { LOCALE_ROUTE_CONFIG, type Locale } from 'utils/i18n/localeRouteConfig';
import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import { getDocsDocument } from './getDocsDocument';

export async function generateDocsMetadata(locale: Locale, slug: string) {
  const { document } = await getDocsDocument(locale, slug);
  const prefix = LOCALE_ROUTE_CONFIG[locale].pathPrefix; // '' or '/zh'
  const canonicalUrl = `${settings.siteUrl}${prefix}/docs${
    slug === 'index' ? '' : `/${slug}`
  }`;

  if (!document.seo) {
    document.seo = {
      __typename: locale === 'zh' ? 'DocZhSeo' : 'DocSeo',
      canonicalUrl,
    };
  } else if (!document.seo.canonicalUrl) {
    document.seo.canonicalUrl = canonicalUrl;
  }

  return getSeo(document.seo, {
    pageTitle: document.title,
    body: document.body,
  });
}
