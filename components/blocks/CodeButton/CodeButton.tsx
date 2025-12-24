import { useState } from 'react';
import { BiCheck, BiCopy } from 'react-icons/bi';
import 'react-responsive-modal/styles.css';
import { CheckIcon } from '@heroicons/react/24/outline';
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

  const buttonId = id || sanitizeLabel(label);

  const clickEvent = () => {
    setCopied(true);
    copyToClipboard(label);
    setShowHelpText(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative flex flex-col border-2 border-seafoam-150 rounded-md">
      <button
        type="button"
        className={`relative ${_copied || showHelpText ? 'rounded-t-md' : 'rounded-sm'} bg-[#120101] text-seafoam-500 cursor-pointer hover:text-seafoam-300 transition-colors`}
        onClick={clickEvent}
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
            className={`relative flex items-center bg-seafoam-500 h-full px-4 py-3 rounded-tr-sm ${_copied || showHelpText ? '' : 'rounded-br-sm'} border-l border-seafoam-150 ease-out transition-colors duration-200 text-black group-hover:text-black/90`}
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
          className={`bg-[#120101] text-seafoam-500 text-sm border-t border-seafoam-150 rounded-b-md flex items-center justify-between px-2 pb-1 pt-2 overflow-hidden animate-slide-down max-h-[500px]`}
        >
          <TinaMarkdown
            content={helpText}
            components={CodeButtonMarkdownStyle}
          />
          <button
            onClick={() => setShowHelpText(false)}
            type="button"
            className="hover:text-seafoam-300 hover:cursor-pointer"
          >
            <IoMdClose className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
