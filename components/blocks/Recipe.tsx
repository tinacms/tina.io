import { TinaMarkdown } from 'tinacms/dist/rich-text';
import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prism-themes/themes/prism-night-owl.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';
import 'prismjs/plugins/line-highlight/prism-line-highlight';

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
  const [clickedInstruction, setClickedInstruction] = useState<number | null>(null); 

  useEffect(() => {
    console.log(`Highlighting lines: ${highlightLines}`);
  }, [highlightLines]);

  const handleInstructionClick = (index: number, codeLineStart?: number, codeLineEnd?: number) => {
    setHighlightLines(`${codeLineStart}-${codeLineEnd}`);
    setClickedInstruction(index === clickedInstruction ? null : index); 
  };

  return (
    <div className="recipe-block-container">
      <div className="title-description">
        <h2 className="font-bold text-3xl">{title || 'Default Title'}</h2>
        <p className="font-semibold text-2xl">{description || 'Default Description'}</p>
      </div>
      <div className="content-wrapper flex">
        <div className="instructions w-1/3 flex flex-col">
          {instruction?.map((inst, idx) => (
            <div
              key={idx}
              className="instruction-item mb-4 cursor-pointer p-4 border rounded-lg bg-gray-500 text-white" 
              onClick={() =>
                handleInstructionClick(idx, inst.codeLineStart, inst.codeLineEnd)
              }
            >
              <h3 className="font-bold">{`${idx + 1}. ${inst.header || 'Default Header'}`}</h3> 
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  clickedInstruction === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="mt-2">{inst.itemDescription || 'Default Item Description'}</p>
              </div>
            </div>
          )) || <p>No instructions available.</p>}
        </div>

        <div className="codeblock w-2/3">
          {codeblock ? (
            <TinaMarkdown
              key={highlightLines}
              content={codeblock}
              components={{
                code_block: (props) => (
                  console.log('props i found', props),
                  console.log('highlighted lines', highlightLines),
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

const CodeBlockWithHighlightLines = ({
  value,
  lang,
  children,
  highlightLines,
}: CodeBlockProps) => {
  const [isMounted, setIsMounted] = useState(false);

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

  return (
    <pre className="line-numbers" data-line={highlightLines}>
      <code className={`language-${lang || 'jsx'}`}>
        {typeof children === 'string' || children ? children : value}
      </code>
    </pre>
  );
};
