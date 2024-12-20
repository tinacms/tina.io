import { GoogleTagManager } from '@next/third-parties/google';
import AdminLink from 'components/AppRouterMigrationComponents/AdminLink';
import { CloudBanner } from 'components/AppRouterMigrationComponents/CloudBanner';
import ConsentBanner from 'components/AppRouterMigrationComponents/ConsentBanner';
import { SiteLayout } from 'components/AppRouterMigrationComponents/SiteLayout';
import dynamic from 'next/dynamic';
import '../styles/tailwind.css';

const TinaChatBot = dynamic(
  () => import('../components/AppRouterMigrationComponents/TinaChatBot'),
  {
    ssr: false,
  }
);

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
