import { useState } from 'react';
import { BiCheck, BiCopy } from 'react-icons/bi';
import 'react-responsive-modal/styles.css';
import { IoMdClose } from 'react-icons/io';
import { type Components, TinaMarkdown } from 'tinacms/dist/rich-text';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import { copyToClipboard } from '../../layout/MarkdownContent';

// biome-ignore lint/complexity/noBannedTypes: <TODO>
export const CodeButtonMarkdownStyle: Components<{}> = {
  a: (props) => {
    return (
      <a
        href={props.url}
        {...props}
        className="underline opacity-80 transition-all duration-200 ease-out hover:text-orange-500"
      />
    );
  },
};

export const CodeButton = ({
  children,
  label,
  id,
  className = '',
  helpText,
  ...props
}) => {
  const [_copied, setCopied] = useState(false);
  const [showHelpText, setShowHelpText] = useState(false);
  const [isExplicitlyShown, setIsExplicitlyShown] = useState(false);

  const buttonId = id || sanitizeLabel(label);

  const clickEvent = () => {
    setCopied(true);
    copyToClipboard(label);
    setShowHelpText(true);
    setIsExplicitlyShown(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleMouseEnter = () => {
    if (helpText?.children?.length > 0) {
      setShowHelpText(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isExplicitlyShown) {
      setShowHelpText(false);
    }
  };

  return (
    <div className="relative flex flex-col border border-brand-primary rounded-md">
      <button
        type="button"
        className={`relative ${_copied || showHelpText ? 'rounded-t-md' : 'rounded-sm'} bg-white/50 text-black cursor-pointer hover:text-brand-primary transition-colors`}
        onClick={clickEvent}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id={buttonId}
        {...props}
      >
        <div className="group flex items-center pl-4 gap-2">
          <span className="bash flex items-center text-lg select-none">
            &gt;
          </span>
          <span className="label font-mono pr-2 text-sm flex items-center mt-0.5 select-text">
            {label}
          </span>
          <span
            className={`relative flex items-center bg-brand-primary h-full px-4 py-3 ${_copied || showHelpText ? '' : 'rounded-br-sm'} border-l border-brand-primary ease-out transition-colors duration-200 text-white group-hover:text-gray-200`}
          >
            <BiCopy
              className={`w-5 h-5 duration-200 ${_copied ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
            />
            <BiCheck
              className={`w-5 h-5 absolute inset-0 m-auto duration-200 ${_copied ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'}`}
            />
          </span>
        </div>
      </button>
      {showHelpText && helpText?.children?.length > 0 && (
        <div
          className="bg-white/50 text-xs border-t border-brand-primary rounded-b-md flex items-center justify-between px-2 pb-1 pt-2 overflow-hidden animate-slide-down max-h-[500px] max-w-min min-w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <TinaMarkdown
            content={helpText}
            components={CodeButtonMarkdownStyle}
          />
          <button
            onClick={() => {
              setShowHelpText(false);
              setIsExplicitlyShown(false);
            }}
            type="button"
            className="hover:text-brand-primary hover:cursor-pointer"
          >
            <IoMdClose className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
