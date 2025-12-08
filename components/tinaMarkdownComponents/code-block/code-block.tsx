import { useEffect, useState } from 'react';
import './code-block.css';
import { MdCheck, MdOutlineContentCopy } from 'react-icons/md';
import { CodeBlockSkeleton } from './code-block-skeleton';
import { shikiSingleton } from './shiki-singelton';

export function CodeBlock({
  value,
  lang = 'ts',
  showCopyButton = true,
  showBorder = true,
  setIsTransitioning,
}: {
  value: string;
  lang?: string;
  showCopyButton?: boolean;
  showBorder?: boolean;
  setIsTransitioning?: (isTransitioning: boolean) => void;
  children?: React.ReactNode;
}) {
  const [html, setHtml] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setIsLoading(true);

      // Guard clause to prevent processing undefined/null/empty values - shiki will throw an error if the value is not a string as it tries to .split all values
      if (!value || typeof value !== 'string') {
        if (isMounted) {
          setHtml('');
          setIsLoading(false);
        }
        return;
      }

      try {
        const code = await shikiSingleton.codeToHtml(value, lang, true);

        if (isMounted) {
          setHtml(code);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          // Fallback to plain text if highlighting fails
          setHtml(`<pre><code>${value}</code></pre>`);
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [value, lang]);

  useEffect(() => {
    if (setIsTransitioning && html !== '') {
      setTimeout(() => setIsTransitioning(false), 200);
    }
  }, [html, setIsTransitioning]);

  if (isLoading && showCopyButton) {
    return <CodeBlockSkeleton />;
  }

  return (
    <div className={`relative w-full my-4 bg-[#011627] rounded-lg`}>
      <p
        className={`absolute top-1 left-0 z-10 px-4 py-1 text-xs font-mono text-white `}
      >
        {lang}
      </p>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(value);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 3000);
        }}
        className="px-2 py-1 text-white rounded transition-colors duration-300 cursor-pointer flex items-center gap-1 absolute top-1 right-0 z-10 mx-2 my-1 text-sm font-mono hover:bg-white/20"
      >
        {isCopied ? <MdCheck /> : <MdOutlineContentCopy />}
      </button>
      <div
        className={`shiki w-full overflow-x-auto bg-background-brand-code py-6 px-2 text-sm ${
          showBorder ? 'border border-neutral-border-subtle/50 shadow-sm' : ''
        } ${showCopyButton ? 'rounded-lg' : 'rounded-b-xl'}`}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is trusted and already escaped for XSS safety.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
