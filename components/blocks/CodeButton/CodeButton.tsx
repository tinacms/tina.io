import Image from 'next/image';
import { useState } from 'react';
import { BiCheck, BiCopy } from 'react-icons/bi';
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
  starterTemplates,
  ...props
}) => {
  const [_copied, setCopied] = useState(false);
  const [showHelpText, setShowHelpText] = useState(false);
  const [isExplicitlyShown, setIsExplicitlyShown] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);

  const buttonId = id || sanitizeLabel(label);
  const hasTemplates = starterTemplates && starterTemplates.length > 0;
  const hasDropdownContent = helpText?.children?.length > 0 || hasTemplates;
  const isExpanded = showHelpText && hasDropdownContent;

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
    if (hasDropdownContent) {
      setShowHelpText(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isExplicitlyShown) {
      setShowHelpText(false);
    }
  };

  return (
    <div
      className={`relative flex flex-col border border-brand-primary ${isExpanded ? 'rounded-t-md' : 'rounded-md'}`}
    >
      <button
        type="button"
        className={`relative ${_copied || isExpanded ? 'rounded-t-md' : 'rounded-md'} bg-white/50 text-black cursor-pointer hover:text-brand-primary transition-colors`}
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
            className={`relative flex items-center rounded-tr-sm bg-brand-primary h-full px-4 py-3 ${_copied || isExpanded ? '' : 'rounded-br-sm'} border-l border-brand-primary ease-out transition-colors duration-200 text-white group-hover:text-gray-200`}
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
      {isExpanded && (
        <div
          className="absolute top-full left-[-1px] right-[-0.5px] z-50 overflow-hidden animate-slide-down bg-white border border-brand-primary rounded-b-md border-t border-t-brand-primary"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {hasTemplates && (
            <div className="px-4 pt-4 pb-2">
              <div className="flex items-center justify-between px-2 pb-2">
                <span className="font-mono text-xs text-[#333]">
                  or deploy instantly...
                </span>
                <button
                  onClick={() => {
                    setShowHelpText(false);
                    setIsExplicitlyShown(false);
                  }}
                  type="button"
                  className="hover:text-brand-primary hover:cursor-pointer"
                >
                  <IoMdClose className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {starterTemplates.map((template, index) => (
                  <a
                    key={template.title}
                    href={template.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between px-2 py-2 rounded transition-colors ${
                      hoveredTemplate === index ? 'bg-[#F1F0EE]' : ''
                    }`}
                    onMouseEnter={() => setHoveredTemplate(index)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                  >
                    <div className="flex items-center gap-2">
                      {template.icon && (
                        <div className="size-[15px] rounded-full overflow-hidden bg-[#333] flex items-center justify-center shrink-0">
                          <Image
                            src={template.icon}
                            alt={template.title || ''}
                            width={15}
                            height={15}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="font-ibm-plex text-sm text-black">
                        {template.title}
                      </span>
                    </div>
                    {hoveredTemplate === index && (
                      <span className="text-black text-sm">&#x21B5;</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
          {helpText?.children?.length > 0 && (
            <div className="bg-white/50 text-xs border-t border-brand-primary rounded-b-md flex items-center justify-between px-2 pb-1 pt-2 max-h-[500px] max-w-min min-w-full">
              <TinaMarkdown
                content={helpText}
                components={CodeButtonMarkdownStyle}
              />
              {!hasTemplates && (
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
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
