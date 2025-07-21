import type { Metadata } from 'next';
import { envUrl } from '../env-url';
import { getExcerpt } from '../getExcerpt';
import { DEFAULT_SEO } from './defaultSeo';

interface DefaultProps {
  pageTitle: string;
  body: any;
}

export const getSeo = (seo: any, data?: DefaultProps): Metadata => {
  const excerpt = data ? getExcerpt(data.body, 140) : '';

  const SEO = {
    title: seo?.title || `${data?.pageTitle} | TinaCMS`,
    description: seo?.description || `${excerpt}`,
    alternates: {
      canonical: envUrl(seo?.canonicalUrl),
    },
    openGraph: {
      title: seo?.title || `${data?.pageTitle} | TinaCMS`,
      url: envUrl(seo?.canonicalUrl),
      description: seo?.description || `${excerpt}`,
      images: [
        {
          ...DEFAULT_SEO.openGraph?.images?.[0],
          url: seo?.ogImage || envUrl(DEFAULT_SEO.openGraph?.images?.[0]?.url),
        },
      ],
    },
  };

  return {
    ...DEFAULT_SEO,
    ...SEO,
  };
};
