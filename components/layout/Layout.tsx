'use client';

import { usePathname } from 'next/navigation';
import { DefaultSeo } from 'next-seo';
// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React from 'react';
import { SURFACE } from '@/component/styles/typography';
import { Footer } from './Footer';

interface LayoutProps {
  children: any | any[];
  color?: 'white' | 'secondary' | 'seafoam';
  sticky?: boolean;
}

// biome-ignore lint/correctness/noUnusedFunctionParameters: <TODO>
export const Layout = ({ children, color, sticky = true }: LayoutProps) => {
  const pathname = usePathname();

  return (
    <div className={`flex flex-col min-h-screen font-sans ${SURFACE.page}`}>
      <DefaultSeo
        openGraph={{
          url: `https://tina.io${pathname}`,
        }}
      />
      <div className="pb-0 lg:pb-20"></div>
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </div>
  );
};
