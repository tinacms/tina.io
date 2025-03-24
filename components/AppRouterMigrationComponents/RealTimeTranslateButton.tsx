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

  // 确定是否显示翻译按钮 - 只在docs页面显示
  useEffect(() => {
    if (pathName.startsWith('/docs/')) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
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

  // 加载Google翻译API
  const loadGoogleTranslate = () => {
    setIsTranslating(true);
    setTranslationError(false);
    retryCount.current = 0;

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
          const translateElement = new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'zh-CN',
              autoDisplay: false,
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            'google_translate_element'
          );

          // 等待翻译组件加载完成后尝试激活翻译
          setTimeout(() => {
            activateTranslation();
          }, 1000);
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

  // 激活中文翻译
  const activateTranslation = () => {
    try {
      // 尝试方法1: 直接设置Cookie
      document.cookie = 'googtrans=/en/zh-CN; path=/;';
      document.cookie =
        'googtrans=/en/zh-CN; domain=' + window.location.hostname + '; path=/;';

      setTimeout(() => {
        // 检查是否已翻译成功
        if (
          document.body.classList.contains('translated-ltr') ||
          document.body.classList.contains('translated-rtl')
        ) {
          setIsTranslated(true);
          setIsTranslating(false);
          return;
        }

        // 尝试方法2: 通过UI交互自动选择中文
        const doUIActivation = () => {
          // 找到并点击翻译控件
          const selectGoogleObj = document.querySelector(
            '.goog-te-combo'
          ) as HTMLSelectElement;
          if (selectGoogleObj) {
            selectGoogleObj.value = 'zh-CN';
            selectGoogleObj.dispatchEvent(new Event('change'));
            setIsTranslated(true);
            setIsTranslating(false);
            return true;
          }

          // 尝试在iframe中找到链接
          const frameList = document.querySelectorAll(
            'iframe.goog-te-menu-frame'
          );
          for (let i = 0; i < frameList.length; i++) {
            try {
              const doc = (frameList[i] as HTMLIFrameElement).contentDocument;
              if (doc) {
                const links = doc.querySelectorAll('a');
                for (let j = 0; j < links.length; j++) {
                  if (
                    links[j].textContent?.includes('中文') ||
                    links[j].innerHTML?.includes('中文') ||
                    links[j].href?.includes('zh-CN')
                  ) {
                    links[j].click();
                    setIsTranslated(true);
                    setIsTranslating(false);
                    return true;
                  }
                }
              }
            } catch (e) {
              console.warn('Error accessing iframe:', e);
            }
          }

          return false;
        };

        // 如果UI交互方法失败，重试几次
        if (!doUIActivation()) {
          retryCount.current += 1;
          if (retryCount.current < 3) {
            setTimeout(activateTranslation, 1000);
          } else {
            handleTranslationError();
          }
        }
      }, 1000);
    } catch (error) {
      console.error('Error during translation activation:', error);
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
