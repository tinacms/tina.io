import 'components/styles/fontImports.css';
import 'styles/tailwind.css';
import React from 'react';
import data from '../content/siteConfig.json';
import ConsentBanner from '../components/ui/ConsentBanner';
import ConsentManager from 'components/ConsentManager';
import { AdminLink } from 'components/AdminLinkManager';
import { DefaultSeo, ChatBaseBot, CloudBanner } from '../components/DynamicClientLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" href="https://tina.io/rss.xml" />
        <meta name="theme-color" content="#E6FAF8" />
      </head>
      <body>
        <ConsentManager />
        <DefaultSeo
          title="The Markdown CMS"
          titleTemplate="%s | Tina"
          description="TinaCMS is a fully open-source headless CMS that supports Git"
          openGraph={{
            type: 'website',
            locale: 'en_CA',
            url: 'https://tina.io',
            site_name: 'Tina',
            images: [
              {
                url: 'https://tina.io/img/tina-og.png',
                width: 1200,
                height: 628,
                alt: 'Tina - The Markdown CMS',
              },
            ],
          }}
          twitter={{
            handle: '@tinacms',
            site: '@tinacms',
            cardType: 'summary_large_image',
          }}
        />
        <ConsentBanner />
        <AdminLink />
        <CloudBanner />
        {children}
        <ChatBaseBot />
      </body>
    </html>
  );
}
