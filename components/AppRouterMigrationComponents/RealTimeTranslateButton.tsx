'use client';

import { Globe, Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { isValidPathCheck } from '../../middleware';
import { Button } from '../ui/Button';

export function RealTimeTranslateButton(): JSX.Element {
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [originalContent, setOriginalContent] = useState<{
    [key: string]: string;
  }>({});
  const pathName = usePathname();

  // Memoize restoreOriginalContent to prevent unnecessary re-creation
  const restoreOriginalContent = useCallback(() => {
    // Reset states
    setOriginalContent({});
    setIsTranslated(false);

    // Reload the page to get fresh content
    window.location.reload();
  }, []);

  // Check page support and reset state on route change
  useEffect(() => {
    // Reset all states on route change
    setIsTranslated(false);
    setIsTranslating(false);
    setOriginalContent({});

    // Check if current page is supported
    setIsVisible(!isValidPathCheck(pathName));
  }, [pathName]);

  // Hide button if page is not supported
  if (!isVisible) return null;

  const translateText = async (text: string): Promise<string | null> => {
    try {
      // Use Google Translate's free web API
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh&dt=t&q=${encodeURIComponent(
        text
      )}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      // Extract translated text from Google's response format
      const translatedText = data[0]?.map((item: any[]) => item[0]).join('');
      return translatedText || null;
    } catch (error) {
      console.error('Translation error:', error);
      return null;
    }
  };

  const startTranslation = async () => {
    setIsTranslating(true);

    try {
      // Get main content area and only translate elements within it
      const mainContent = document.querySelector('.flex.flex-col.flex-1');
      if (!mainContent) {
        throw new Error('Main content area not found');
      }

      // Get all text elements within main content
      const textElements = Array.from(
        mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span, a')
      ).filter((element) => element.textContent && element.textContent.trim());

      // Store original content
      const tempOriginalContent: { [key: string]: string } = {};
      textElements.forEach((element) => {
        if (element.textContent) {
          const key = Math.random().toString(36);
          tempOriginalContent[key] = element.textContent;
        }
      });

      // Translate all elements
      await Promise.all(
        textElements.map(async (element) => {
          if (element.textContent) {
            const translatedText = await translateText(element.textContent);
            if (translatedText) {
              element.textContent = translatedText;
            }
          }
        })
      );

      setOriginalContent(tempOriginalContent);
      setIsTranslated(true);
    } catch (error) {
      console.error('Translation error:', error);
      alert('翻译失败，请稍后重试');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="bottom-16 left-3 z-40">
      <div className="inline-flex">
        {isTranslated ? (
          <Button
            color="white"
            className="text-gray-800 whitespace-nowrap"
            onClick={restoreOriginalContent}
          >
            <Globe className="h-4 w-4 mr-2 shrink-0" />
            返回英文
          </Button>
        ) : (
          <Button
            color="blue"
            onClick={startTranslation}
            disabled={isTranslating}
            className="whitespace-nowrap"
          >
            {isTranslating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 shrink-0 animate-spin" />
                正在翻译中...
              </>
            ) : (
              <>
                <Globe className="h-4 w-4 mr-2 shrink-0" />
                翻译成中文
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
