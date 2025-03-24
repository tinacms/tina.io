'use client';

import { Globe, Loader2, RefreshCw } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { isValidPathCheck } from '../../middleware';
import { Button } from '../ui/Button';

// Google翻译API脚本的URL
const GOOGLE_TRANSLATE_URL =
  'https://translate.google.com/translate_a/element.js';
const GOOGLE_TRANSLATE_SCRIPT_ID = 'google-translate-script';

export function RealTimeTranslateButton() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [translationError, setTranslationError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathName = usePathname();
  const translateElementRef = useRef<HTMLDivElement>(null);
  const retryCount = useRef(0);

  // 确定是否显示翻译按钮 - 在所有isValidPathCheck为false的页面显示
  useEffect(() => {
    // 显示翻译按钮如果路径检查返回false
    setIsVisible(!isValidPathCheck(pathName));
  }, [pathName]);

  // 检查翻译状态
  useEffect(() => {
    // 检查页面是否已被翻译
    const checkTranslationState = () => {
      const isBodyTranslated =
        document.body.classList.contains('translated-ltr') ||
        document.body.classList.contains('translated-rtl');

      if (isBodyTranslated && !isTranslated) {
        setIsTranslated(true);
        setIsTranslating(false);
      }
    };

    // 初始检查
    checkTranslationState();

    // 设置MutationObserver来监听body类变化
    const observer = new MutationObserver(checkTranslationState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, [isTranslated]);

  // 当组件卸载时清理翻译
  useEffect(() => {
    return () => {
      if (isTranslated) {
        cleanupTranslation();
      }
    };
  }, [isTranslated]);

  if (!isVisible) return null;

  // 清理翻译相关的DOM元素和CSS
  const cleanupTranslation = () => {
    try {
      // 移除Google翻译添加的横幅和UI元素
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

      // 重置body样式
      document.body.style.top = '';
      document.body.classList.remove('translated-ltr', 'translated-rtl');

      // 清除翻译Cookie
      document.cookie =
        'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie =
        'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' +
        window.location.hostname +
        '; path=/;';

      const domain = window.location.hostname.split('.').slice(-2).join('.');
      document.cookie =
        'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.' +
        domain +
        '; path=/;';

      setIsTranslated(false);
    } catch (error) {
      console.error('Error during translation cleanup:', error);
    }
  };

  // 加载Google翻译API - 简化为单一明确的方法
  const loadGoogleTranslate = () => {
    setIsTranslating(true);
    setTranslationError(false);

    // 创建翻译容器如果不存在
    if (!document.getElementById('google_translate_element')) {
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.display = 'none';
      document.body.appendChild(div);
    }

    try {
      // 避免重复加载脚本
      if (document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
        document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID).remove();
      }

      // 定义全局回调函数
      window.googleTranslateElementInit = () => {
        try {
          // 初始化翻译小部件
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'zh-CN',
              autoDisplay: false,
            },
            'google_translate_element'
          );

          // 直接设置Cookie来激活中文翻译
          document.cookie = 'googtrans=/en/zh-CN; path=/;';
          document.cookie =
            'googtrans=/en/zh-CN; domain=' +
            window.location.hostname +
            '; path=/;';

          // 使用一个定时器检查翻译是否成功激活
          const checkInterval = setInterval(() => {
            if (
              document.body.classList.contains('translated-ltr') ||
              document.body.classList.contains('translated-rtl')
            ) {
              setIsTranslated(true);
              setIsTranslating(false);
              clearInterval(checkInterval);
            }
          }, 500);

          // 设置一个超时，如果翻译在一定时间内没有激活，则标记为错误
          setTimeout(() => {
            if (!isTranslated) {
              clearInterval(checkInterval);
              handleTranslationError();
            }
          }, 5000);
        } catch (error) {
          console.error('Error initializing translator:', error);
          handleTranslationError();
        }
      };

      // 创建并加载Google翻译脚本
      const script = document.createElement('script');
      script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
      script.src = GOOGLE_TRANSLATE_URL;
      script.async = true;
      script.onerror = () => handleTranslationError();

      document.body.appendChild(script);
    } catch (error) {
      console.error('Error loading Google Translate:', error);
      handleTranslationError();
    }
  };

  // 处理翻译错误
  const handleTranslationError = () => {
    setIsTranslating(false);
    setTranslationError(true);
  };

  // 页面刷新
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed bottom-16 left-3 z-40 max-w-md">
      <div ref={translateElementRef}></div>

      {translationError ? (
        <Button color="orange" onClick={handleRefresh} className="text-white">
          <RefreshCw className="h-4 w-4 mr-2" />
          翻译失败，点击刷新
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
