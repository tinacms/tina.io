'use client';

import dynamic from 'next/dynamic';

export const DefaultSeo = dynamic(() => import('next-seo').then((mod) => mod.DefaultSeo), { ssr: false });
export const ChatBaseBot = dynamic(() => import('../components/ui/TinaChatBot'), { ssr: false });
export const CloudBanner = dynamic(() => import('../components/layout/CloudBanner'), { ssr: false });
