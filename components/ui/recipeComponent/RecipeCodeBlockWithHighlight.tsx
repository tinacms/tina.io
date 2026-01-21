'use client';

import { useEffect, useState } from 'react';
import { shikiSingleton } from '../../tinaMarkdownComponents/code-block/shiki-singelton';
import '../../tinaMarkdownComponents/code-block/code-block.css';
import { CodeToolbar } from './RecipeCodeToolBar';

interface CodeBlockProps {
  value?: string;
  lang?: string;
  children?: React.ReactNode;
  highlightLines: string;
}

const CodeBlockWithHighlightLines = ({
  value,
  lang = 'javascript',
  children,
  highlightLines,
}: CodeBlockProps) => {
  const [html, setHtml] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const codeContent =
    typeof children === 'string' ? children : value || String(children || '');

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setIsLoading(true);

      if (!codeContent || typeof codeContent !== 'string') {
        if (isMounted) {
          setHtml('');
          setIsLoading(false);
        }
        return;
      }

      try {
        const code = await shikiSingleton.codeToHtml(
          codeContent,
          lang,
          true, // dark mode for recipe blocks
          highlightLines,
        );

        if (isMounted) {
          setHtml(code);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          // Fallback to plain text if highlighting fails
          setHtml(`<pre><code>${codeContent}</code></pre>`);
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [codeContent, lang, highlightLines]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeContent).then(
      () => {
        setTooltipVisible(true);
        setTimeout(() => setTooltipVisible(false), 1500);
      },
      (err) => {
        console.error('Failed to copy code:', err);
      },
    );
  };

  if (isLoading) {
    return (
      <div className="codeblock-container">
        <div className="sticky top-0 z-30">
          <CodeToolbar
            lang={lang}
            onCopy={copyToClipboard}
            tooltipVisible={tooltipVisible}
          />
        </div>
        <div className="bg-[#011627] p-4 animate-pulse min-h-[200px]" />
      </div>
    );
  }

  return (
    <div className="codeblock-container">
      <div className="sticky top-0 z-30">
        <CodeToolbar
          lang={lang}
          onCopy={copyToClipboard}
          tooltipVisible={tooltipVisible}
        />
      </div>
      <div
        className="shiki w-full overflow-x-auto bg-[#011627] py-4 px-2 text-sm"
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is trusted and already escaped for XSS safety.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default CodeBlockWithHighlightLines;
