import { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import 'react-responsive-modal/styles.css';
import { CheckIcon } from '@heroicons/react/24/outline';
import type { Components } from 'tinacms/dist/rich-text';
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
  ...props
}) => {
  const [_copied, setCopied] = useState(false);
  const clickEvent = () => {
    setCopied(true);
    copyToClipboard(label);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const buttonId = id || sanitizeLabel(label);

  return (
    <button
      type="button"
      className={`relative border-2 border-seafoam-150 rounded-md bg-white text-black cursor-pointer flex items-center pl-4 gap-2 hover:text-orange-500 transition-colors overflow-hidden`}
      onClick={clickEvent}
      id={buttonId}
      {...props}
    >
      <span className="bash flex items-center text-black text-lg select-none">
        &gt;
      </span>
      <span className="label font-mono pr-2 text-sm flex items-center mt-0.5 select-text">
        {label}
      </span>
      <span className="flex items-center bg-seafoam-50 h-full px-4 py-3 rounded-tr-md rounded-br-md border-l border-seafoam-150 transition-colors duration-200">
        <BiCopy className="w-5 h-5 opacity-70" />
      </span>

      {/* overlay */}
      {_copied && (
        <div className="absolute inset-0 bg-white rounded-md flex items-center justify-center gap-2">
          <CheckIcon className="w-5 h-5 text-orange-500" />
          <span className="font-mono text-sm text-orange-600 font-medium">
            Copied to Clipboard
          </span>
        </div>
      )}
    </button>
  );
};
