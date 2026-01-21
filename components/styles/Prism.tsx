'use client';

import { useEffect, useState } from 'react';
import { shikiSingleton } from '../tinaMarkdownComponents/code-block/shiki-singelton';
import '../tinaMarkdownComponents/code-block/code-block.css';

// Map old prism-react-renderer theme names to Shiki themes
const themeMap: Record<string, boolean> = {
  nightOwl: true,
  github: false,
  dracula: true,
  vsDark: true,
  vsLight: false,
  duotoneDark: true,
  duotoneLight: false,
};

export const Prism = (props: {
  value: string;
  lang?: string;
  theme?: string;
}) => {
  const [html, setHtml] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Determine if dark mode based on theme name
  const isDarkMode = props.theme ? (themeMap[props.theme] ?? true) : true;

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setIsLoading(true);

      if (!props.value || typeof props.value !== 'string') {
        if (isMounted) {
          setHtml('');
          setIsLoading(false);
        }
        return;
      }

      try {
        const code = await shikiSingleton.codeToHtml(
          props.value,
          props.lang || 'text',
          isDarkMode,
        );

        if (isMounted) {
          setHtml(code);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          // Fallback to plain text if highlighting fails
          setHtml(`<pre><code>${props.value}</code></pre>`);
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [props.value, props.lang, isDarkMode]);

  if (isLoading) {
    return (
      <pre
        className="animate-pulse"
        style={{
          fontFamily:
            'SourceCodePro-Regular, Monaco, Menlo, "Ubuntu Mono", Consolas, "source-code-pro", monospace',
          width: '100%',
          border: 'none',
          marginBottom: 0,
          borderRadius: '12px',
          minHeight: '2em',
          backgroundColor: isDarkMode ? '#011627' : '#f6f8fa',
        }}
      />
    );
  }

  return (
    <div
      className="shiki w-full overflow-x-auto text-sm"
      style={{
        fontFamily:
          'SourceCodePro-Regular, Monaco, Menlo, "Ubuntu Mono", Consolas, "source-code-pro", monospace',
        borderRadius: '12px',
      }}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is trusted and already escaped for XSS safety.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
