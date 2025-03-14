'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLocaleClient, saveLocale } from 'utils/locale';
import { DEFAULT_LOCALE } from 'middleware';

export const RedirectHandler = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (redirected) return;

    const locale = getLocaleClient();
    if (locale != DEFAULT_LOCALE) {
      const newPath = `/${locale}${pathName}`;
      saveLocale(locale);
      setRedirected(true);
      router.push(newPath);
    }
    saveLocale(locale);
  }, [pathName === '/']);

  return null;
};
