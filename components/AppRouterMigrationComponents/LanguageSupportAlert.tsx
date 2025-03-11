'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePathname } from 'next/navigation';
import { isValidPathCheck } from 'middleware';

export function LanguageSupportAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (!isValidPathCheck(pathName)) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [pathName]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-3 right-3 z-50 max-w-md">
      <Alert
        variant="default"
        className="bg-yellow-100 border-yellow-400 text-yellow-800 cursor-pointer transition-opacity hover:opacity-90"
        style={{ opacity: 1 }}
        onClick={() => setIsVisible(false)}
      >
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="font-medium">Warning</AlertTitle>
        <AlertDescription>
          Current page only supports English version.
        </AlertDescription>
      </Alert>
    </div>
  );
}
