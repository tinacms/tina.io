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
  const title = seo?.title || `${data?.pageTitle} | TinaCMS`;
  const description = seo?.description || `${excerpt}`;

  // A custom per-page image (e.g. the dynamic blog OG route) is used verbatim;
  // otherwise fall back to the site default.
  const imageUrl =
    seo?.ogImage || envUrl(DEFAULT_SEO.openGraph?.images?.[0]?.url);

  const SEO: Metadata = {
    title,
    description,
    alternates: {
      canonical: envUrl(seo?.canonicalUrl),
    },
    openGraph: {
      // spread the defaults so type / locale / siteName are preserved
      ...DEFAULT_SEO.openGraph,
      title,
      url: envUrl(seo?.canonicalUrl),
      description,
      images: [
        {
          ...DEFAULT_SEO.openGraph?.images?.[0],
          url: imageUrl,
          ...(seo?.ogImage && { alt: title }),
        },
      ],
    },
  };

  // When a page supplies its own image, mirror it (with alt) onto the Twitter
  // card too.
  if (seo?.ogImage) {
    SEO.twitter = {
      ...DEFAULT_SEO.twitter,
      images: [{ url: seo.ogImage, alt: title }],
    };
  }

  return {
    ...DEFAULT_SEO,
    ...SEO,
  };
};
