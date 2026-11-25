import Link from 'next/link';
// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React from 'react';
import { INK } from '@/component/styles/typography';
import TinaIconSvg from '../../public/svg/tina-icon.svg';

export const TinaIcon = ({
  link = '/',
  className = '',
  children = null,
  color = 'white',
}) => {
  return (
    <Link href={link} className={className}>
      <span className="flex items-center">
        <TinaIconSvg
          className={`${children ? 'w-8' : 'w-16'} h-auto fill-current ${
            color === 'orange' ? INK.brand : INK.logoOnDark
          }`}
        />
        {children && (
          <span
            className={`text-2xl leading-tight mt-2.5 ml-2 font-ibm-plex ${
              color === 'orange' ? INK.brand : INK.logoOnDark
            }`}
          >
            {children} TinaCMS
          </span>
        )}
      </span>
    </Link>
  );
};
