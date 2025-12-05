import { useEffect, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import 'react-responsive-modal/styles.css';
import { CheckIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
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
  popOverText,
  ...props
}) => {
  const [_copied, setCopied] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const buttonId = id || sanitizeLabel(label);
  const pathName = usePathname();
  const sessionKey = `${pathName}-${buttonId}-popOverText`;

  const clickEvent = () => {
    setCopied(true);
    copyToClipboard(label);
    sessionStorage.setItem(sessionKey, 'true');
    setShowPopover(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const hasSession = sessionStorage.getItem(sessionKey);
    if (hasSession) {
      setShowPopover(true);
    }
  }, [sessionKey]);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="relative border-2 border-seafoam-150 rounded-md bg-white text-black cursor-pointer hover:text-orange-500 transition-colors"
        onClick={clickEvent}
        id={buttonId}
        {...props}
      >
        <div className="group flex items-center pl-4 gap-2">
          <span className="bash flex items-center text-black text-lg select-none group-hover:text-orange-500">
            &gt;
          </span>
          <span className="label font-mono pr-2 text-sm flex items-center mt-0.5 select-text">
            {label}
          </span>
          <span className="flex items-center bg-seafoam-50 h-full px-4 py-3 rounded-tr-md rounded-br-md border-l border-seafoam-150 transition-colors duration-200">
            <BiCopy className="w-5 h-5 opacity-70 group-hover:text-orange-500" />
          </span>
        </div>

        {_copied && (
          <div className="absolute inset-0 bg-white rounded-md flex items-center justify-center gap-2">
            <CheckIcon className="w-5 h-5 text-orange-500" />
            <span className="font-mono text-sm text-orange-600 font-medium">
              Copied to Clipboard
            </span>
          </div>
        )}
      </button>

      {showPopover && popOverText?.children?.length > 0 && (
        <div className="absolute flex flex-row items-center gap-4 top-full left-0 mt-2 z-10 rounded-md bg-white p-4 shadow-md border border-seafoam-150">
          <div className="absolute gap-4 -top-1.5 left-4 w-3 h-3 bg-white border-l border-t border-seafoam-150 transform rotate-45"></div>
          <TinaMarkdown
            content={popOverText}
            components={CodeButtonMarkdownStyle}
          />
          <button
            onClick={() => setShowPopover(false)}
            type="button"
            className="hover:text-orange-500 hover:cursor-pointer"
          >
            <IoMdClose className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
