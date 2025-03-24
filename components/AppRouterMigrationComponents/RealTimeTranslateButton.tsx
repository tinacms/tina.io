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
  const [translationError, setTranslationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const pathName = usePathname();
  const translateElementRef = useRef<HTMLDivElement>(null);
  const scriptLoadTimerRef = useRef<NodeJS.Timeout>();
  const translationCheckTimerRef = useRef<NodeJS.Timeout>();
  const translationIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setIsVisible(!isValidPathCheck(pathName));
    return () => {
      // 清理所有定时器
      if (scriptLoadTimerRef.current) clearTimeout(scriptLoadTimerRef.current);
      if (translationCheckTimerRef.current)
        clearTimeout(translationCheckTimerRef.current);
      if (translationIntervalRef.current)
        clearInterval(translationIntervalRef.current);
    };
  }, [pathName]);

  // 检查翻译状态
  useEffect(() => {
    const checkTranslationState = () => {
      try {
        const isBodyTranslated =
          document.body.classList.contains('translated-ltr') ||
          document.body.classList.contains('translated-rtl');

        if (isBodyTranslated && !isTranslated) {
          console.log('Translation detected, updating state...');
          setIsTranslated(true);
          setIsTranslating(false);
          setTranslationError(false);
          setErrorMessage('');
        }
      } catch (error) {
        console.error('Error checking translation state:', error);
      }
    };

    if (isTranslating) {
      const observer = new MutationObserver(checkTranslationState);
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
      });

      return () => observer.disconnect();
    }
  }, [isTranslating, isTranslated]);

  const cleanupTranslation = () => {
    try {
      console.log('Cleaning up translation...');
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

      // 清除翻译相关的Cookie
      const cookies = [
        'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;',
        `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`,
      ];

      const domain = window.location.hostname.split('.').slice(-2).join('.');
      cookies.push(
        `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${domain}; path=/;`
      );

      cookies.forEach((cookie) => {
        document.cookie = cookie;
      });

      setIsTranslated(false);
      setIsTranslating(false);
      setTranslationError(false);
      setErrorMessage('');

      // 移除谷歌翻译脚本
      const script = document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID);
      if (script) {
        script.remove();
      }

      console.log('Translation cleanup completed');
    } catch (error) {
      console.error('Error during translation cleanup:', error);
      handleTranslationError('清理翻译时出错');
    }
  };

  const loadGoogleTranslate = () => {
    console.log('Starting translation process...');
    setIsTranslating(true);
    setTranslationError(false);
    setErrorMessage('');

    try {
      // 清理之前的翻译状态
      cleanupTranslation();

      // 创建翻译容器
      if (!document.getElementById('google_translate_element')) {
        const div = document.createElement('div');
        div.id = 'google_translate_element';
        div.style.display = 'none';
        document.body.appendChild(div);
      }

      // 设置脚本加载超时
      scriptLoadTimerRef.current = setTimeout(() => {
        handleTranslationError('加载翻译脚本超时');
      }, SCRIPT_LOAD_TIMEOUT);

      // 定义全局回调函数
      window.googleTranslateElementInit = () => {
        try {
          console.log('Initializing Google Translate...');
          if (scriptLoadTimerRef.current) {
            clearTimeout(scriptLoadTimerRef.current);
          }

          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'zh-CN',
              autoDisplay: false,
            },
            'google_translate_element'
          );

          // 设置翻译Cookie
          document.cookie = 'googtrans=/en/zh-CN; path=/;';
          document.cookie = `googtrans=/en/zh-CN; domain=${window.location.hostname}; path=/;`;

          // 检查翻译是否成功激活
          let checkCount = 0;
          translationIntervalRef.current = setInterval(() => {
            const isTranslated =
              document.body.classList.contains('translated-ltr') ||
              document.body.classList.contains('translated-rtl');

            if (isTranslated) {
              console.log('Translation successfully activated');
              if (translationIntervalRef.current) {
                clearInterval(translationIntervalRef.current);
              }
              if (translationCheckTimerRef.current) {
                clearTimeout(translationCheckTimerRef.current);
              }
              setIsTranslated(true);
              setIsTranslating(false);
            } else {
              checkCount++;
              console.log(`Checking translation status (${checkCount})...`);
            }
          }, TRANSLATION_CHECK_INTERVAL);

          // 设置翻译超时
          translationCheckTimerRef.current = setTimeout(() => {
            if (translationIntervalRef.current) {
              clearInterval(translationIntervalRef.current);
            }
            handleTranslationError('翻译激活超时，请刷新页面重试');
          }, TRANSLATION_TIMEOUT);
        } catch (error) {
          console.error('Error in googleTranslateElementInit:', error);
          handleTranslationError('初始化翻译工具失败');
        }
      };

      // 加载谷歌翻译脚本
      const script = document.createElement('script');
      script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
      script.src = GOOGLE_TRANSLATE_URL;
      script.async = true;
      script.onerror = () => {
        handleTranslationError('加载翻译脚本失败');
      };

      document.body.appendChild(script);
      console.log('Translation script added to document');
    } catch (error) {
      console.error('Error in loadGoogleTranslate:', error);
      handleTranslationError('启动翻译过程失败');
    }
  };

  const handleTranslationError = (message: string) => {
    console.error('Translation error:', message);
    setIsTranslating(false);
    setTranslationError(true);
    setErrorMessage(message);

    // 清理所有定时器
    if (scriptLoadTimerRef.current) clearTimeout(scriptLoadTimerRef.current);
    if (translationCheckTimerRef.current)
      clearTimeout(translationCheckTimerRef.current);
    if (translationIntervalRef.current)
      clearInterval(translationIntervalRef.current);

    // 清理翻译相关元素
    cleanupTranslation();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-16 left-3 z-40 max-w-md">
      <div ref={translateElementRef}></div>

      {translationError ? (
        <Button color="orange" onClick={handleRefresh} className="text-white">
          <RefreshCw className="h-4 w-4 mr-2" />
          {errorMessage || '翻译失败，点击刷新'}
        </Button>
      ) : isTranslated ? (
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
          onClick={loadGoogleTranslate}
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
