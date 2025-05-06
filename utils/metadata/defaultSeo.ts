import type { Metadata } from 'next';

import settings from '@/content/settings/config.json';

export const DEFAULT_SEO: Metadata = {
  metadataBase: new URL(settings.siteUrl),
  title: {
    default: settings.title,
    template: '%s',
  },
  generator: 'Next.js',
  applicationName: settings.applicationName,
  publisher: settings.publisher,
  description: settings.description,
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: settings.siteUrl,
    title: settings.title,
    description: settings.description,
    siteName: settings.title,
    images: [
      {
        url: settings?.defaultOGImage,
        width: 1200,
        height: 630,
        alt: 'Tina - The Markdown CMS',
      },
    ],
  },
  twitter: {
    site: settings.social.twitter,
    card: 'summary_large_image',
  },
  keywords: settings.keywords,
};
