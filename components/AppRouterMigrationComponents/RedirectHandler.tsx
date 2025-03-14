'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLocaleClient, saveLocale } from 'utils/locale';
import { DEFAULT_LOCALE } from 'middleware';

export const RedirectHandler = () => {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName !== '/') return;

    const locale = getLocaleClient();
    if (locale != DEFAULT_LOCALE) {
      console.log('Current Path:', pathName);
      const newPath = `/${locale}${pathName}`;
      saveLocale(locale);
      console.log('Redirect to:', newPath);
      router.push(newPath);
    }
    saveLocale(locale);
  }, [pathName, router]);

  return null;
};
