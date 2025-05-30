import { getJsonPreviewProps } from '@/utils/getJsonPreviewProps';
import { GoogleTagManager } from '@next/third-parties/google';
import AdminLink from 'components/AppRouterMigrationComponents/AdminLink';
import { CloudBanner } from 'components/AppRouterMigrationComponents/CloudBanner';
import ConsentBanner from 'components/AppRouterMigrationComponents/ConsentBanner';
import { SiteLayout } from 'components/AppRouterMigrationComponents/SiteLayout';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import data from '../content/siteConfig.json';
import StyledComponentsRegistry from '../lib/registry';
import '../styles/tailwind.css';
import './global.css';

const TinaChatBot = dynamic(
  () => import('../components/AppRouterMigrationComponents/TinaChatBot'),
  {
    ssr: false,
  }
);

export const metadata = {
  title: {
    template: `%s`,
    default: data.seoDefaultTitle,
  },
  description: data.description,
  icons: {
    icon: '/favicon/favicon.ico',
  },
  openGraph: {
    title: data.seoDefaultTitle,
    description: data.description,
    url: data.siteUrl,
    images: [
      {
        url: 'https://tina.io/img/tina-og.png',
        width: 1200,
        height: 628,
        alt: 'Tina - The Markdown CMS',
      },
    ],
  },
  twitter: {
    title: data.seoDefaultTitle,
    description: data.description,
    card: 'summary_large_image',
    site: data.social.twitterHandle,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const previewProps = await getJsonPreviewProps(
    'content/footer/Master-Footer.json'
  );
  const footerData = previewProps.props.file.data;

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#E6FAF8" />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <meta name="googlebot" content="index,follow" />
          <meta name="robots" content="index,follow" />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.SSW_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <CloudBanner />
          <AdminLink />
          <ConsentBanner />
          <TinaChatBot />
          <SiteLayout footerData={footerData}>{children}</SiteLayout>
        </StyledComponentsRegistry>
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="//js-eu1.hs-scripts.com/25605879.js"
        />
        <GoogleTagManager gtmId={process.env.SSW_GTM_ID || ''} />

        <Script
          id="hotjar"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:5190939,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "pepjushhm5");
            `,
          }}
        />
      </body>
    </html>
  );
}
