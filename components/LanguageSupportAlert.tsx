'use client';

import { AlertTriangle, X } from 'lucide-react';
import { SupportedLocales } from 'middleware';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { PageType } from 'utils/hasChineseVersion';
import { hasChineseVersion } from 'utils/hasChineseVersion';
import { ICON_BUTTON } from '@/component/styles/buttons';
import { SURFACE } from '@/component/styles/typography';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function LanguageSupportAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const pathName = usePathname();
  const prevPathRef = useRef('');

  const isLocalesPath = (path) => {
    if (!path) {
      return false;
    }
    return Object.values(SupportedLocales).some(
      (locale) => path === `/${locale}` || path.startsWith(`/${locale}/`),
    );
  };

  const getPageType = (path: string): PageType => {
    if (!path) {
      return 'pages';
    }

    if (path.startsWith('/blog')) {
      return 'blog';
    }
    if (path.startsWith('/whats-new')) {
      return 'whats-new';
    }

    return 'pages';
  };

  useEffect(() => {
    const previousPath = prevPathRef.current;
    prevPathRef.current = pathName;

    const checkChineseVersion = async () => {
      if (isLocalesPath(previousPath) && !isLocalesPath(pathName)) {
        const pageType = getPageType(pathName);
        const hasZhVersion = await hasChineseVersion(pageType, pathName);
        setIsVisible(!hasZhVersion);
      } else {
        setIsVisible(false);
      }
    };

    checkChineseVersion();
    // biome-ignore lint/correctness/useExhaustiveDependencies: <TODO>
  }, [pathName, getPageType, isLocalesPath]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-3 left-3 z-50 max-w-md">
      <Alert
        variant="surface"
        className={`${SURFACE.warning} cursor-pointer transition-opacity relative pr-8`}
      >
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="mb-3">
          <span className="mr-2">警告</span>
          <span>Warning</span>
        </AlertTitle>
        <AlertDescription>
          <p className="mb-1">当前页面仅支持英文版本。</p>
          <p>Current page only supports English version.</p>
        </AlertDescription>
        <button
          type="button"
          className={`${ICON_BUTTON} absolute top-1 right-1`}
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          aria-label="Close"
        >
          <X />
        </button>
      </Alert>
    </div>
  );
}
