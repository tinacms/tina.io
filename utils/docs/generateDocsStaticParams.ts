// utils/docs/generateDocsStaticParams.ts
import { glob } from 'fast-glob';
import { notFound } from 'next/navigation';
import { LOCALE_ROUTE_CONFIG, type Locale } from 'utils/i18n/localeRouteConfig';

export async function generateDocsStaticParams(locale: Locale) {
  try {
    const contentDir = LOCALE_ROUTE_CONFIG[locale].docsContentDir;
    const files = await glob(`${contentDir}**/*.mdx`);
    return files
      .filter((file) => !file.endsWith('index.mdx'))
      .map((file) => {
        const path = file.substring(contentDir.length, file.length - 4);
        return { slug: path.split('/') };
      })
      .filter((params) => params.slug[0] !== 'r');
  } catch (error) {
    console.error(error);
    notFound();
  }
}
