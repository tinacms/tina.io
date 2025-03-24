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
      // 查找并点击中文选项
      const translateIframe = document.querySelector(
        '.goog-te-menu-frame'
      ) as HTMLIFrameElement;
      if (translateIframe && translateIframe.contentDocument) {
        const zhButton = translateIframe.contentDocument.querySelector(
          'a[href*="zh-CN"]'
        ) as HTMLAnchorElement;
        if (zhButton) {
          zhButton.click();
          document.body.classList.add('translated-content');
          setIsTranslated(true);
        }
      }
      setIsTranslating(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-3 right-3 z-50">
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
