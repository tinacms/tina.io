// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React from 'react';
import { SURFACE } from '@/component/styles/typography';
import { AppNavBar } from './AppNavBar';
import { Footer } from './footer/footer';
import { LanguageSupportAlert } from './LanguageSupportAlert';

interface LayoutProps {
  children: any | any[];
  color?: 'white' | 'secondary' | 'seafoam';
  sticky?: boolean;
  footerData: any;
}

export const SiteLayout = ({
  children,
  sticky = true,
  footerData,
}: LayoutProps) => {
  return (
    <div className={`flex flex-col min-h-screen font-sans ${SURFACE.page}`}>
      <div className="pb-0 md:pb-5 lg:pb-20">
        <AppNavBar sticky={sticky} />
      </div>
      {/* TODO: consult with betty - if we want to add global gutters we can do it here easily */}
      <main className="flex flex-col flex-1">{children}</main>
      <Footer footerData={footerData} />
      <LanguageSupportAlert />
    </div>
  );
};
