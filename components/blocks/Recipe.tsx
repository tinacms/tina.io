import 'prism-themes/themes/prism-night-owl.css';
import Prism from 'prismjs';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import React, { useEffect, useRef, useState } from 'react';
import { FaChevronCircleDown } from 'react-icons/fa';
import { MdOutlineContentCopy } from 'react-icons/md';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export const RecipeBlock = ({ data }) => {
  const { title, description, codeblock, instruction } = data;

  const [highlightLines, setHighlightLines] = useState('');
  const [clickedInstruction, setClickedInstruction] = useState<number | null>(
    null
  );
  const [LHSheight, setLHSheight] = useState<string | null>(null);
  const [CodeBlockWidth, setCodeBlockWidth] = useState<string | null>(null);
  const [isBottomOfInstructions, setIsBottomOfInstructions] =
    useState<boolean>(false);

  const codeblockRef = useRef<HTMLDivElement>(null);
  const instructionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = customHighlightCSS;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [highlightLines]);

  useEffect(() => {
    setLHSheight(`${codeblockRef.current?.offsetHeight}`);
    setCodeBlockWidth(`${codeblockRef.current?.offsetWidth}`);
  });

  const checkIfBottom = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    setIsBottomOfInstructions(scrollHeight - scrollTop <= clientHeight + 10);
  };

  const handleInstructionClick = (
    index: number,
    codeLineStart?: number,
    codeLineEnd?: number
  ) => {
    setHighlightLines(`${codeLineStart}-${codeLineEnd}`);
    setClickedInstruction(index === clickedInstruction ? null : index);

    const linePixelheight = 24;
    const linePixelBuffer = 15; // gives the moving logic some breathing room

    if (codeblockRef.current) {
      codeblockRef.current.scrollTo({
        top: linePixelheight * codeLineStart - linePixelBuffer,
        behavior: 'smooth',
      });
    }

    if (window.innerWidth < 1024 && instructionRefs.current[index]) {
      instructionRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  const handleDownArrowClick = () => {
    const lastInstruction =
      instructionRefs.current[instructionRefs.current.length - 1];
    if (lastInstruction) {
      lastInstruction.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  const smAndMbHeight = LHSheight ? `${Number(LHSheight) / 2}px` : null;

  return (
    <div className="recipe-block-container mt-20 relative">
      <div className="title-description px-10">
        <h2 className="font-tuner text-orange-500 text-2xl">
          {title || 'Default Title'}
        </h2>
        <p className="font-light py-2 text-base">
          {description || 'Default Description'}
        </p>
      </div>

      <div className="content-wrapper flex flex-col lg:flex-row px-10 items-stretch">
        <div
          className="instructions bg-gray-800 relative lg:w-1/3 max-h-50vh flex-shrink-0 flex-grow rounded-tl-xl rounded-br-xl rounded-tr-xl lg:rounded-tr-none lg:rounded-bl-xl flex flex-col"
          style={{
            height:
              typeof window !== 'undefined' && window.innerWidth >= 1024
                ? `${LHSheight}px`
                : `${smAndMbHeight}`,
          }}
        >
          <div className={`${isBottomOfInstructions ? 'hidden' : ''}`}>
            <div
              className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-60 lg:rounded-bl-xl pointer-events-none `}
            ></div>
            <FaChevronCircleDown
              onClick={handleDownArrowClick}
              className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-7 h-7 text-xl text-white cursor-pointer shadow-md`}
            />
          </div>

          <div
            className="overflow-auto rounded-tl-xl rounded-bl-xl rounded-tr-xl lg:rounded-tr-none"
            onScroll={checkIfBottom}
          >
            {instruction?.map((inst, idx) => (
              <div
                key={idx}
                ref={(el) => (instructionRefs.current[idx] = el)}
                className={`instruction-item cursor-pointer p-4 border-gray-700 border-y bg-gray-800 text-white 
                ${clickedInstruction === idx ? 'bg-slate-600' : ''} `}
                onClick={() =>
                  handleInstructionClick(
                    idx,
                    inst.codeLineStart,
                    inst.codeLineEnd
                  )
                }
              >
                <h5 className="font-tuner">{`${idx + 1}. ${
                  inst.header || 'Default Header'
                }`}</h5>
                <div
                  className={`overflow-auto transition-all ease-in-out ${
                    clickedInstruction === idx
                      ? 'duration-500 max-h-full opacity-100'
                      : 'duration-0 max-h-0 opacity-0'
                  }`}
                >
                  <span className="mt-2">
                    {inst.itemDescription || 'Default Item Description'}
                  </span>
                </div>
              </div>
            )) || <p>No instructions available.</p>}
          </div>
        </div>

        <div
          ref={codeblockRef}
          className="codeblock bg-gray-800 lg:w-2/3 max-h-50vh overflow-auto lg:rounded-tr-xl rounded-bl-xl lg:rounded-bl-none rounded-br-xl "
        >
          {codeblock ? (
            <div>
              <TinaMarkdown
                key={highlightLines}
                content={codeblock}
                components={{
                  code_block: (props) => (
                    <CodeBlockWithHighlightLines
                      {...props}
                      highlightLines={highlightLines}
                    />
                  ),
                }}
              />
            </div>
          ) : (
            <p>No code block available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeBlock;

interface CodeBlockProps {
  value: any;
  lang?: string;
  children?: React.ReactNode;
  highlightLines: string;
}

export const CodeToolbar = ({
  lang,
  onCopy,
  tooltipVisible,
}: {
  lang?: string;
  onCopy: () => void;
  tooltipVisible: boolean;
}) => (
  <div className="code-toolbar bg-gray-800 text-white px-4 py-2 lg:rounded-t-xl text-sm font-semibold flex justify-between items-center">
    <span className="font-tuner">{lang || 'Unknown'}</span>
    <div className="flex items-center ml-4 space-x-4 relative overflow-visible">
      <button
        onClick={onCopy}
        className={`flex items-center px-2 py-1 bg-gray-800  rounded-md text-sm transition-colors duration-200 space-x-1 relative ${
          tooltipVisible
            ? 'text-white bg-gray-700 rounded-md ml-1'
            : 'hover:bg-gray-700 text-white'
        }`}
      >
        {!tooltipVisible && <MdOutlineContentCopy className="w-4 h-4" />}
        <span>{!tooltipVisible ? 'Copy' : 'Copied!'}</span>
      </button>
    </div>
  </div>
);

const CodeBlockWithHighlightLines = ({
  value,
  lang,
  children,
  highlightLines,
}: CodeBlockProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted) {
      Prism.highlightAll();
    }
  }, [isMounted]);

  useEffect(() => {
    Prism.highlightAll();
  }, [highlightLines]);

  if (!isMounted) {
    return null;
  }

  const copyToClipboard = () => {
    const codeToCopy = typeof children === 'string' ? children : value;
    navigator.clipboard.writeText(codeToCopy).then(
      () => {
        setTooltipVisible(true);
        setTimeout(() => setTooltipVisible(false), 1500);
      },
      (err) => {
        console.error('Failed to copy code:', err);
      }
    );
  };

  return (
    <div className="codeblock-container">
      <div className="sticky top-0 z-30">
        <CodeToolbar
          lang={lang}
          onCopy={copyToClipboard}
          tooltipVisible={tooltipVisible}
        />
      </div>
      <pre
        className="line-numbers"
        data-line={highlightLines}
        style={{
          overflowX: 'hidden',
          maxWidth: '100%',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        <code className={`language-${lang || 'jsx'}`}>
          {typeof children === 'string' || children ? children : value}
        </code>
      </pre>
    </div>
  );
};

const customHighlightCSS = `
  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    color: white;
    background: #111827; 
  }
    
  pre[class*="language-"] > code[class*="language-"] {
    position: relative;
  }

  pre[class*="language-"]{
    padding: 0.5rem;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: #9FFCEF; 
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }

  .line-highlight {
    background: rgba(71, 85, 105, 0.25);
  }

  .line-numbers .line-numbers-rows {
    border-right: 1px solid #6B7280;
  }

  pre[class*="language-"] {
    padding: 1em;
    margin: 0 0 0.5em 0; 
    overflow: auto;
  }

  pre[class*="language-"] ::selection {
    background: white; 
    color: black; 
  }
`;
