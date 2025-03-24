'use client';

import { Globe, Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isValidPathCheck, SupportedLocales } from '../../middleware';
import { Button } from '../ui/Button';

// TypeScript接口定义
interface GoogleTranslateElementInit {
  new (
    options: {
      pageLanguage: string;
      includedLanguages: string;
      autoDisplay: boolean;
      layout: any;
    },
    elementId: string
  ): any;
}

interface GoogleTranslate {
  translate: {
    TranslateElement: GoogleTranslateElementInit & {
      InlineLayout: {
        SIMPLE: any;
      };
    };
  };
}

// 全局类型声明
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: GoogleTranslate;
  }
}

// Google翻译脚本ID，避免重复添加
const GOOGLE_TRANSLATE_SCRIPT_ID = 'google-translate-script';

export function RealTimeTranslateButton() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathName = usePathname();

  // 确定是否显示翻译按钮
  useEffect(() => {
    // 只在不被支持的路径上显示翻译按钮
    setIsVisible(!isValidPathCheck(pathName));
  }, [pathName]);

  // 当组件卸载时清理翻译状态
  useEffect(() => {
    return () => {
      if (isTranslated) {
        cleanupTranslation();
      }
    };
  }, [isTranslated]);

  if (!isVisible) return null;

  // 清理谷歌翻译添加的元素
  const cleanupTranslation = () => {
    // 移除谷歌翻译小部件
    const gTranslateElements = document.querySelectorAll(
      '.goog-te-menu-frame, .goog-te-banner-frame, #goog-gt-tt'
    );
    gTranslateElements.forEach((el) => el.remove());

    // 恢复被翻译的内容
    document.body.classList.remove('translated-content');
    document.body.style.top = '';

    // 清除谷歌翻译cookie（如需要）
    document.cookie =
      'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    setIsTranslated(false);
  };

  // 加载Google翻译API
  const loadGoogleTranslate = () => {
    // 避免重复加载脚本
    if (document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
      activateTranslation();
      return;
    }

    setIsTranslating(true);

    // 创建Google翻译脚本
    const script = document.createElement('script');
    script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;

    // 添加全局回调函数
    window.googleTranslateElementInit = () => {
      const translateElement = document.createElement('div');
      translateElement.id = 'google_translate_element';
      translateElement.style.display = 'none';
      document.body.appendChild(translateElement);

      // 初始化翻译小部件
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'zh-CN',
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );

      activateTranslation();
    };

    // 处理脚本加载错误
    script.onerror = () => {
      setIsTranslating(false);
      alert(
        '无法加载翻译服务，请稍后再试。\nFailed to load translation service. Please try again later.'
      );
    };

    document.body.appendChild(script);
  };

  // 激活翻译
  const activateTranslation = () => {
    setTimeout(() => {
      try {
        // 尝试直接设置 Google 翻译 Cookie
        document.cookie = 'googtrans=/en/zh-CN; path=/;';
        const domain = window.location.hostname;
        if (domain !== 'localhost') {
          // 为主域和子域都设置 cookie
          const mainDomain = domain.split('.').slice(-2).join('.');
          document.cookie = `googtrans=/en/zh-CN; domain=.${mainDomain}; path=/;`;
          document.cookie = `googtrans=/en/zh-CN; domain=${domain}; path=/;`;
        }

        // 尝试多种方式激活翻译
        const translateWidget = document.getElementById(
          'google_translate_element'
        );
        if (translateWidget) {
          // 方法1: 通过事件触发选择语言
          const selectElement = translateWidget.querySelector(
            '.goog-te-combo'
          ) as HTMLSelectElement;
          if (selectElement) {
            selectElement.value = 'zh-CN';
            selectElement.dispatchEvent(new Event('change'));
            setIsTranslated(true);
          } else {
            // 方法2: 直接查找 iframe 中的中文链接并点击
            const frames = document.querySelectorAll(
              'iframe.goog-te-menu-frame'
            );
            let translationActivated = false;

            frames.forEach((iframe) => {
              try {
                const iframeDocument = (iframe as HTMLIFrameElement)
                  .contentDocument;
                if (iframeDocument) {
                  // 尝试各种可能的选择器
                  const selectors = [
                    'a[href*="zh-CN"]',
                    'div[value="zh-CN"]',
                    '.goog-te-menu2-item div:contains("中文")',
                    'table.goog-te-menu-frame td',
                  ];

                  for (const selector of selectors) {
                    const element = iframeDocument.querySelector(
                      selector
                    ) as HTMLElement;
                    if (element) {
                      element.click();
                      translationActivated = true;
                      break;
                    }
                  }
                }
              } catch (e) {
                console.error('Error accessing iframe content:', e);
              }
            });

            if (translationActivated) {
              setIsTranslated(true);
            }
          }
        }

        // 如果上述方法都失败，尝试强制刷新页面来应用翻译
        if (
          !document.body.classList.contains('translated-ltr') &&
          !document.body.classList.contains('translated-rtl')
        ) {
          // 如果我们设置了 cookie 但页面没有翻译类，可以尝试重新加载页面
          // 这里我们不自动刷新，而是通知用户可能需要刷新
          console.log('Translation may require page refresh');
        } else {
          document.body.classList.add('translated-content');
          setIsTranslated(true);
        }
      } catch (error) {
        console.error('Translation activation error:', error);
      }

      setIsTranslating(false);
    }, 1500); // 增加等待时间，确保翻译组件已完全加载
  };

  return (
    <div className="fixed bottom-3 left-3 z-40 max-w-md">
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
