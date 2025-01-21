import './global.css'
import { GoogleTagManager } from '@next/third-parties/google';
import AdminLink from 'components/AppRouterMigrationComponents/AdminLink';
import { CloudBanner } from 'components/AppRouterMigrationComponents/CloudBanner';
import ConsentBanner from 'components/AppRouterMigrationComponents/ConsentBanner';
import { SiteLayout } from 'components/AppRouterMigrationComponents/SiteLayout';
import dynamic from 'next/dynamic';
import data from '../content/siteConfig.json';
import '../styles/tailwind.css';
import GoogleBot from 'components/AppRouterMigrationComponents/GoogleBot';

const TinaChatBot = dynamic(
  () => import('../components/AppRouterMigrationComponents/TinaChatBot'),
  {
    ssr: false,
  }
);

export const metadata = {
  title: data.seoDefaultTitle,
  descripton: data.description,
  icons:
  {
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
  twitter:{
    title: data.seoDefaultTitle,
    description: data.description,
    card: 'summary_large_image',
    site: data.social.twitterHandle,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CloudBanner />
        <AdminLink />
        <ConsentBanner />
        <TinaChatBot />
        <GoogleBot/>
        <GoogleTagManager gtmId={process.env.SSW_GTM_ID || ''} />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
