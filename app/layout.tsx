'use client';

import 'components/styles/fontImports.css';
import 'styles/tailwind.css';
import { DefaultSeo } from 'next-seo';
import React, { useEffect } from 'react';
import { useEditState } from 'tinacms/dist/react';
import data from '../content/siteConfig.json';
import ConsentBanner from '../components/ui/ConsentBanner';
import { CloudBanner } from '../components/layout/CloudBanner';
import dynamic from 'next/dynamic';
import ConsentManager from 'components/ConsentManager';


const ChatBaseBot = dynamic(() => import('../components/ui/TinaChatBot'), {ssr: false});

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" href={data.siteUrl + '/rss.xml'} />
        <meta name="theme-color" content="#E6FAF8" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.SSW_GTM_ID}');
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.SSW_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ConsentManager />
        <DefaultSeo
          title={data.seoDefaultTitle}
          titleTemplate={'%s | ' + data.title}
          description={data.description}
          openGraph={{
            type: 'website',
            locale: 'en_CA',
            url: data.siteUrl,
            site_name: data.title,
            images: [
              {
                url: 'https://tina.io/img/tina-og.png',
                width: 1200,
                height: 628,
                alt: `Tina - The Markdown CMS`,
              },
            ],
          }}
          twitter={{
            handle: data.social.twitterHandle,
            site: data.social.twitterHandle,
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

function AdminLink() {
  const { edit } = useEditState();
  const [showAdminLink, setShowAdminLink] = React.useState(false);

  useEffect(() => {
    setShowAdminLink(
      !edit &&
        JSON.parse((window.localStorage.getItem('tinacms-auth') as any) || '{}')?.access_token
    );
  }, [edit]);

  return showAdminLink ? (
    <div className="fixed top-4 right-4 flex items-center justify-between bg-blue-500 text-white px-3 py-1 rounded-full z-50">
      <a
        href={`/admin/index.html#/~${window.location.pathname}`}
        className="text-xs"
      >
        Edit This Page
      </a>
      <button onClick={() => setShowAdminLink(false)} className="ml-2 text-sm">
        xx
      </button>
    </div>
  ) : null;
}
