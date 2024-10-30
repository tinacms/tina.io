import { TinaMarkdown } from 'tinacms/dist/rich-text';
import React, { useEffect, useState, useRef } from 'react';
import Prism from 'prismjs';
import 'prism-themes/themes/prism-night-owl.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';
import 'prismjs/plugins/line-highlight/prism-line-highlight';

// Custom CSS to override line highlight color
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

  //Change color of line highlight
  pre[class*="language-"] .line-highlight {
  background: rgba(71, 85, 105, 0.3); 
  box-shadow: inset 5px 0 0 0 rgba(71, 85, 105, 1);
    z-index: 0;
  }

  // Change colour of row numbers 
.line-numbers-rows > span:before {
    content: counter(linenumber);
    color: #9FFCEF; 
    display: block;
    padding-right: 0.8em;
    text-align: right;
}

  // Change colour of line between numbers and code 
  .line-numbers .line-numbers-rows {
  border-right: 1px solid #6B7280
  }

  /* Remove top padding on code */
  pre[class*="language-"] {
    padding: 1em;
    margin: 0 0 0.5em 0; 
    overflow: auto;
}

/* Sets the background of selected text to white */
pre[class*="language-"] ::selection {
  background: white; 
  color: black; 
}
`;

interface RecipeBlockProps {
  data: {
    title?: string;
    description?: string;
    codeblock?: any;
    instruction?: {
      header?: string;
      itemDescription?: string;
      codeLineStart?: number;
      codeLineEnd?: number;
    }[];
  };
  index: number;
}

const RecipeBlock = ({ data }: RecipeBlockProps) => {
  const { title, description, codeblock, instruction } = data;

  const [highlightLines, setHighlightLines] = useState('7-10');
  const [clickedInstruction, setClickedInstruction] = useState<number | null>(
    null
  );


  useEffect(() => {
    console.log(`Highlighting lines: ${highlightLines}`);
    // Inject the custom CSS into the document head
    const style = document.createElement('style');
    style.textContent = customHighlightCSS;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [highlightLines]);

  const handleInstructionClick = (
    index: number,
    codeLineStart?: number,
    codeLineEnd?: number
  ) => {
    setHighlightLines(`${codeLineStart}-${codeLineEnd}`);
    setClickedInstruction(index === clickedInstruction ? null : index);

  };

  return (
    <div className="recipe-block-container mt-20">
      <div className="title-description">
        <h2 className="font-bold text-3xl">{title || 'Default Title'}</h2>
        <p className="font-semibold text-2xl">
          {description || 'Default Description'}
        </p>
      </div>
      <div className="content-wrapper flex px-10">
        <div className="instructions w-1/3 rounded-tl-xl rounded-bl-xl overflow-hidden flex flex-col sticky top-20 h-full">
          {instruction?.map((inst, idx) => (
            <div
              key={idx}
              className={`instruction-item cursor-pointer p-4 border-gray-700 bg-gray-800 text-white 
                ${clickedInstruction === idx ? 'bg-slate-600' : ''} `}
              onClick={() =>
                handleInstructionClick(
                  idx,
                  inst.codeLineStart,
                  inst.codeLineEnd
                )
              }
            >
              <h3 className="font-tuner">{`${idx + 1}. ${
                inst.header || 'Default Header'
              }`}</h3>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  clickedInstruction === idx
                    ? 'max-h-40 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="mt-2">
                  {inst.itemDescription || 'Default Item Description'}
                </p>
              </div>
            </div>
          )) || <p>No instructions available.</p>}
        </div>

        <div className="codeblock bg-gray-900 w-2/3 rounded-tr-xl rounded-br-xl">
          {codeblock ? (
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

import { MdOutlineContentCopy } from 'react-icons/md';

const CodeToolbar = ({
  lang,

  onCopy,
  tooltipVisible,
}: {
  lang?: string;

  onCopy: () => void;
  tooltipVisible: boolean;
}) => (
  <div className="code-toolbar bg-gray-800 text-white px-4 py-2 rounded-t-xl text-sm font-semibold flex justify-between items-center">
    <span className="font-tuner">{lang || 'Unknown'}</span>
    <div className="flex items-center ml-4 space-x-4 relative">
      <button
        onClick={onCopy}
        className="flex items-center px-2 py-1 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 transition-colors duration-200 space-x-1 relative"
      >
        <MdOutlineContentCopy className="w-4 h-4" />
        <span>Copy</span>
        {tooltipVisible && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded-md">
            Copied!
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        )}
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
  const [tooltipVisible, setTooltipVisible] = useState(false); // Tooltip visibility state

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
        // Show tooltip on successful copy
        setTooltipVisible(true);
        setTimeout(() => setTooltipVisible(false), 1500); // Hide tooltip after 1.5 seconds
      },
      (err) => {
        console.error('Failed to copy code:', err);
      }
    );
  };

  return (
    <div className="codeblock-container">
      <CodeToolbar
        lang={lang}
        onCopy={copyToClipboard}
        tooltipVisible={tooltipVisible}
      />

      {/* Code block with conditional wrapping styles */}
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
