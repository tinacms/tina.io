'use client';

import { DefaultSeo } from 'next-seo';
import { usePathname } from 'next/navigation';

export default function GoogleBot() {
  const pathname = usePathname()
  return (
    <>
      <DefaultSeo
        openGraph={{
          url: `https://tina.io${pathname}`,
        }}
      />
    </>
  );
}
