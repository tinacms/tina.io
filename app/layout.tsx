import dynamic from 'next/dynamic';
import { GoogleTagManager } from '@next/third-parties/google';
import ConsentBanner from 'components/scripts/ConsentBanner';
import { CloudBanner } from 'components/scripts/CloudBanner';
import AdminLink from 'components/scripts/AdminLink';
import '../styles/tailwind.css';
import { SiteLayout } from 'components/scripts/SiteLayout';

const TinaChatBot = dynamic(() => import('../components/scripts/TinaChatBot'), {
  ssr: false,
});

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
        <GoogleTagManager gtmId={process.env.SSW_GTM_ID || ''} />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
