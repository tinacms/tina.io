'use client';

import { Globe, Loader2, RefreshCw } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { isValidPathCheck } from '../../middleware';
import { Button } from '../ui/Button';

// Google翻译API脚本的URL和配置
const GOOGLE_TRANSLATE_URL =
  'https://translate.google.com/translate_a/element.js';
const GOOGLE_TRANSLATE_SCRIPT_ID = 'google-translate-script';
const SCRIPT_LOAD_TIMEOUT = 10000; // 10 seconds
const TRANSLATION_CHECK_INTERVAL = 500; // 0.5 seconds
const TRANSLATION_TIMEOUT = 15000; // 15 seconds

export function RealTimeTranslateButton() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsVisible(!isValidPathCheck(pathName));
  }, [pathName]);

  // 检查翻译状态
  useEffect(() => {
    const isBodyTranslated =
      document.body.classList.contains('translated-ltr') ||
      document.body.classList.contains('translated-rtl');

    if (isBodyTranslated) {
      setIsTranslated(true);
    }
  }, []);

  if (!isVisible) return null;

  const cleanupTranslation = () => {
    const elementsToRemove = [
      '.goog-te-banner-frame',
      '.goog-te-menu-frame',
      '#goog-gt-tt',
      '.goog-te-spinner-pos',
      '.skiptranslate',
    ];

    elementsToRemove.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => el.remove());
    });

    document.body.style.top = '';
    document.body.classList.remove('translated-ltr', 'translated-rtl');

    document.cookie =
      'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    setIsTranslated(false);
    window.location.reload();
  };

  const startTranslation = () => {
    setIsTranslating(true);

    if (!document.getElementById('google_translate_element')) {
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.display = 'none';
      document.body.appendChild(div);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'zh-CN',
          autoDisplay: false,
        },
        'google_translate_element'
      );

      const translateCombo = document.querySelector(
        '.goog-te-combo'
      ) as HTMLSelectElement;
      if (translateCombo) {
        translateCombo.value = 'zh-CN';
        translateCombo.dispatchEvent(new Event('change'));
      }

      const checkTranslation = setInterval(() => {
        if (
          document.body.classList.contains('translated-ltr') ||
          document.body.classList.contains('translated-rtl')
        ) {
          setIsTranslated(true);
          setIsTranslating(false);
          clearInterval(checkTranslation);
        }
      }, 300);

      // 设置超时
      setTimeout(() => {
        clearInterval(checkTranslation);
        if (
          !document.body.classList.contains('translated-ltr') &&
          !document.body.classList.contains('translated-rtl')
        ) {
          setIsTranslating(false);
          alert('翻译加载失败，请刷新页面后重试');
        }
      }, 3000);
    };

    // 加载Google翻译脚本
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js';
    script.async = true;
    script.onerror = () => {
      setIsTranslating(false);
      alert('翻译服务加载失败，请检查网络连接');
    };

    document.body.appendChild(script);
  };

  return (
    <div className="fixed bottom-16 left-3 z-40 max-w-md">
      {isTranslated ? (
        <Button
          color="white"
          className="text-gray-800"
          onClick={cleanupTranslation}
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
              正在加载翻译
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
