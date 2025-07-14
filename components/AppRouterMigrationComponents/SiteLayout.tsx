// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React from 'react';
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
    <div className="flex flex-col min-h-screen blob-bg font-sans bg-blob-bg bg-[length:100%_100%] bg-top bg-fixed">
      <div className="pb-0 md:pb-5 lg:pb-20">
        <AppNavBar sticky={sticky} />
      </div>
      {/* TODO: consult with betty - if we want to add global gutters we can do it here easily */}
      <div className="flex flex-col flex-1">{children}</div>
      <Footer footerData={footerData} />
      <LanguageSupportAlert />
    </div>
  );
};
