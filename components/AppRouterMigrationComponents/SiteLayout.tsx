import { getJsonPreviewProps } from '@/utils/getJsonPreviewProps';
import React from 'react';
import client from 'tina/__generated__/client';
import { AppNavBar } from './AppNavBar';
import { AppFooter } from './footer/AppFooter';
import { LanguageSupportAlert } from './LanguageSupportAlert';

interface LayoutProps {
  children: any | any[];
  color?: 'white' | 'secondary' | 'seafoam';
  sticky?: boolean;
}

const getFooterData = async () => {
  const previewProps = await getJsonPreviewProps(
    'content/footer/Master-Footer.json'
  );
  return previewProps;
};

export const SiteLayout = async ({
  children,
  color,
  sticky = true,
}: LayoutProps) => {
  const previewProps = await getFooterData();
  const footerData = previewProps.props.file.data;
  return (
    <>
      <div className="flex flex-col min-h-screen blob-bg font-sans bg-blob-bg bg-[length:100%_100%] bg-top bg-fixed">
        <div className="pb-0 md:pb-5 lg:pb-20">
          <AppNavBar sticky={sticky} />
        </div>
        {/* TODO: consult with betty - if we want to add global gutters we can do it here easily */}
        <div className="flex flex-col flex-1">{children}</div>
        <AppFooter footerData={footerData} />
        <LanguageSupportAlert />
      </div>
    </>
  );
};
