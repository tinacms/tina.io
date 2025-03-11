import React from 'react';
import { AppFooter } from './AppFooter';
import { AppNavBar } from './AppNavBar';
import { LanguageSupportAlert } from './LanguageSupportAlert';

interface LayoutProps {
  children: any | any[];
  color?: 'white' | 'secondary' | 'seafoam';
  sticky?: boolean;
}
export const SiteLayout = ({ children, color, sticky = true }: LayoutProps) => {
  return (
    <>
      <div className="flex flex-col min-h-screen blob-bg font-sans bg-blob-bg bg-[length:100%_100%] bg-top bg-fixed">
        <div className="pb-0 lg:pb-20">
          <AppNavBar sticky={sticky} />
        </div>
        {/* TODO: consult with betty - if we want to add global gutters we can do it here easily */}
        <div className="flex flex-col flex-1">{children}</div>
        <AppFooter />
        <LanguageSupportAlert />
      </div>
    </>
  );
};
