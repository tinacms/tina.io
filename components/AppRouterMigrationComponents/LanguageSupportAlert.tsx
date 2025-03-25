'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { isValidPathCheck, SupportedLocales } from 'middleware';
import { usePathname } from 'next/navigation';

export function LanguageSupportAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const pathName = usePathname();
  const prevPathRef = useRef('');

  const isLocalesPath = (path) => {
    if (!path) return false;
    return Object.values(SupportedLocales).some(
      (locale) => path === `/${locale}` || path.startsWith(`/${locale}/`)
    );
  };

  useEffect(() => {
    const previousPath = prevPathRef.current;
    prevPathRef.current = pathName;

    if (!isValidPathCheck(pathName) && isLocalesPath(previousPath)) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [pathName]);

  if (!isVisible) return null;

  return (
    <Alert
      variant="default"
      className="bg-yellow-100 border-yellow-400 text-yellow-800 cursor-pointer transition-opacity relative pr-8 max-w-md"
    >
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertTitle className="font-medium mb-3">
        <span className="mr-2">警告</span>
        <span>Warning</span>
      </AlertTitle>
      <AlertDescription>
        <p className="mb-1">当前页面仅支持英文版本。</p>
        <p>Current page only supports English version.</p>
      </AlertDescription>
      <button
        className="absolute top-2 right-2 rounded-full hover:bg-yellow-200 flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(false);
        }}
        aria-label="Close"
        style={{ padding: 2 }}
      >
        <X className="h-4 w-4 text-yellow-600" />
      </button>
    </Alert>
  );
}
