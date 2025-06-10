import React, { useEffect, useRef, useState } from 'react';
import { FaChevronCircleDown } from 'react-icons/fa';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { customHighlightCSS } from '../styles/RecipeCSS';
import CodeBlockWithHighlightLines from '../ui/recipeComponent/RecipeCodeBlockWithHighlight';

export const RecipeBlock = ({ data }) => {
  const { title, description, codeblock, code, instruction } = data;

  const [highlightLines, setHighlightLines] = useState('');
  const [clickedInstruction, setClickedInstruction] = useState<number | null>(
    null
  );
  //LHSheight is the height used for the instructions block when the screen is >= 1024px
  const [LHSheight, setLHSheight] = useState<string | null>(null);
  const [CodeBlockWidth, setCodeBlockWidth] = useState<string | null>(null);
  const [isBottomOfInstructions, setIsBottomOfInstructions] =
    useState<boolean>(false);

  const codeblockRef = useRef<HTMLDivElement>(null);
  const instructionBlockRefs = useRef<HTMLDivElement>(null);
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
    // gives the moving logic some breathing room
    const linePixelBuffer = 15;

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

  //height used for the instructions container when the screen is < 1024px. Maintains 1:2 ratio of instruction to code
  const smAndMbHeight = LHSheight ? `${Number(LHSheight) / 2}px` : null;

  const calculateInstructionsHeight = () => {
    return instructionRefs.current.reduce((total, ref) => {
      return total + (ref?.offsetHeight || 0);
    }, 0);
  };

  const checkIfScrollable = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return (
        calculateInstructionsHeight() >= parseInt(smAndMbHeight || '0', 10)
      );
    } else {
      return calculateInstructionsHeight() > parseInt(LHSheight || '0', 10);
    }
  };

  return (
    <div className="recipe-block-container relative w-full">
      <div className="title-description px-10">
        <h2 className="font-ibm-plex text-orange-500 text-2xl">
          {title || 'Default Title'}
        </h2>
        <p className="font-light py-2 text-base">
          {description || 'Default Description'}
        </p>
      </div>

      <div className="content-wrapper flex flex-col lg:flex-row px-10 items-stretch">
        <div
          className="instructions bg-gray-800 relative lg:w-1/3 max-h-50vh shrink-0 grow rounded-tl-xl rounded-br-xl lg:rounded-br-none rounded-tr-xl lg:rounded-tr-none lg:rounded-bl-xl flex flex-col"
          ref={instructionBlockRefs}
          style={{
            height:
              typeof window !== 'undefined' && window.innerWidth >= 1024
                ? `${LHSheight}px`
                : `${smAndMbHeight}`,
          }}
        >
          <div className={`${isBottomOfInstructions ? 'hidden' : ''}`}>
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black opacity-60 lg:rounded-bl-xl pointer-events-none"></div>
            <FaChevronCircleDown
              onClick={handleDownArrowClick}
              className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-7 h-7 text-xl text-white cursor-pointer shadow-md
                ${checkIfScrollable() ? '' : 'hidden'}`}
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
                ${clickedInstruction === idx ? 'bg-slate-600' : ''}`}
                onClick={() =>
                  handleInstructionClick(
                    idx,
                    inst.codeLineStart,
                    inst.codeLineEnd
                  )
                }
              >
                <h5 className="font-ibm-plex">{`${idx + 1}. ${
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
          {code ? (
            <CodeBlockWithHighlightLines
              value={code}
              lang="javascript"
              highlightLines={highlightLines}
            />
          ) : codeblock ? (
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
