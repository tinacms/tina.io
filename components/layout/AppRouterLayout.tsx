'use client';

import { DefaultSeo } from 'next-seo';
import { usePathname } from 'next/navigation'; // Use this instead of next/router
import React from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: any | any[];
  color?: 'white' | 'secondary' | 'seafoam';
  sticky?: boolean;
}

export const Layout = ({ children, color, sticky = true }: LayoutProps) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col min-h-screen bg-blob-bg bg-no-repeat bg-top bg-cover bg-fixed font-sans">
        <DefaultSeo
          openGraph={{
            url: 'https://tina.io' + pathname,
          }}
        />
        <div className="pb-0 lg:pb-20">
          <Navbar sticky={sticky} />
        </div>
        <div className="flex flex-col flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
};
