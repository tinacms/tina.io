'use client';

import { Globe, Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isValidPathCheck } from '../../middleware';
import { Button } from '../ui/Button';

export function RealTimeTranslateButton() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [originalContent, setOriginalContent] = useState<{
    [key: string]: string;
  }>({});
  const pathName = usePathname();

  useEffect(() => {
    setIsVisible(!isValidPathCheck(pathName));
  }, [pathName]);

  if (!isVisible) return null;

  const translateText = async (text: string) => {
    try {
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: 'zh',
          format: 'text',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return null;
    }
  };

  const startTranslation = async () => {
    setIsTranslating(true);

    try {
      // Get all text elements
      const textElements = Array.from(
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span, a')
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

  const restoreOriginalContent = () => {
    const textElements = Array.from(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span, a')
    );
    const keys = Object.keys(originalContent);
    let keyIndex = 0;

    textElements.forEach((element) => {
      if (
        element.textContent &&
        element.textContent.trim() &&
        keyIndex < keys.length
      ) {
        element.textContent = originalContent[keys[keyIndex]];
        keyIndex++;
      }
    });

    setOriginalContent({});
    setIsTranslated(false);
  };

  return (
    <div className="fixed bottom-16 left-3 z-40 max-w-md">
      {isTranslated ? (
        <Button
          color="white"
          className="text-gray-800"
          onClick={restoreOriginalContent}
        >
          <Globe className="h-4 w-4 mr-2" />
          返回英文
        </Button>
      ) : (
        <Button
          color="blue"
          onClick={startTranslation}
          disabled={isTranslating}
        >
          {isTranslating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              正在翻译中...
            </>
          ) : (
            <>
              <Globe className="h-4 w-4 mr-2" />
              翻译成中文
            </>
          )}
        </Button>
      )}
    </div>
  );
}
