import type { Metadata } from 'next';
import { envUrl } from '../env-url';
import { getExcerpt } from '../getExcerpt';
import { DEFAULT_SEO } from './defaultSeo';

interface DefaultProps {
  pageTitle: string;
  body: any;
}

interface SeoOptions {
  // When true, omit openGraph.images so a route-level `opengraph-image` file
  // convention is the single source of the og:image / twitter:image tags
  // (avoids emitting a duplicate, conflicting image).
  omitOgImage?: boolean;
}

export const getSeo = (
  seo: any,
  data?: DefaultProps,
  options?: SeoOptions,
): Metadata => {
  const excerpt = data ? getExcerpt(data.body, 140) : '';

  const openGraph: NonNullable<Metadata['openGraph']> = {
    title: seo?.title || `${data?.pageTitle} | TinaCMS`,
    url: envUrl(seo?.canonicalUrl),
    description: seo?.description || `${excerpt}`,
  };

  if (!options?.omitOgImage) {
    openGraph.images = [
      {
        ...DEFAULT_SEO.openGraph?.images?.[0],
        url: seo?.ogImage || envUrl(DEFAULT_SEO.openGraph?.images?.[0]?.url),
      },
    ];
  }

  const SEO = {
    title: seo?.title || `${data?.pageTitle} | TinaCMS`,
    description: seo?.description || `${excerpt}`,
    alternates: {
      canonical: envUrl(seo?.canonicalUrl),
    },
    openGraph,
  };

  return {
    ...DEFAULT_SEO,
    ...SEO,
  };
};
