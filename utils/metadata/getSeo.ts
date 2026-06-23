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

  // A custom per-page image (e.g. the dynamic blog OG route) resolves against
  // metadataBase; otherwise fall back to the site default.
  const imageUrl =
    seo?.ogImage || envUrl(DEFAULT_SEO.openGraph?.images?.[0]?.url);

  const SEO: Metadata = {
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
          url: imageUrl,
        },
      ],
    },
  };

  // When a page supplies its own image, mirror it onto the Twitter card too.
  if (seo?.ogImage) {
    SEO.twitter = { ...DEFAULT_SEO.twitter, images: [seo.ogImage] };
  }

  return {
    ...DEFAULT_SEO,
    ...SEO,
  };
};
