import Image from 'next/image';
import { useState } from 'react';
import { BiCheck, BiCopy } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { type Components, TinaMarkdown } from 'tinacms/dist/rich-text';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import { FOCUS_RING, ICON_BUTTON } from '@/component/styles/buttons';
import {
  BODY_MUTED,
  LABEL,
  LINK,
  SUB_HEADING,
} from '@/component/styles/typography';
import { copyToClipboard } from '../../layout/MarkdownContent';

// biome-ignore lint/complexity/noBannedTypes: <TODO>
export const CodeButtonMarkdownStyle: Components<{}> = {
  a: (props) => {
    return <a href={props.url} {...props} className={LINK} />;
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
      className={`relative flex flex-col command-field max-w-full rounded-lg ${className}`}
    >
      <button
        type="button"
        className={`relative w-full rounded-lg bg-white/50 text-left text-black cursor-pointer hover:text-brand-primary transition-colors ${FOCUS_RING}`}
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
          <span className="label font-mono pr-2 text-sm flex flex-1 items-center mt-0.5 select-text">
            {label}
          </span>
          <span className="relative flex items-center rounded-r-md btn-primary h-full px-4 py-3 ease-out transition-colors duration-200">
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
          className="absolute top-full left-0 right-0 z-50 mt-2 overflow-hidden animate-slide-down rounded-lg border border-neutral-border-subtle bg-white shadow-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {hasTemplates && (
            <div className="px-4 pt-4 pb-2">
              <div className="flex items-center justify-between px-2 pb-2">
                <span className={SUB_HEADING}>or deploy instantly...</span>
                <button
                  onClick={() => {
                    setShowHelpText(false);
                    setIsExplicitlyShown(false);
                  }}
                  type="button"
                  aria-label="Close"
                  className={ICON_BUTTON}
                >
                  <IoMdClose />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {starterTemplates.map((template, index) => (
                  <a
                    key={template.title}
                    href={template.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="menu-item"
                    onMouseEnter={() => setHoveredTemplate(index)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                  >
                    <div className="flex items-center gap-2">
                      {template.icon && (
                        <div className="size-5 rounded-full overflow-hidden bg-strong flex items-center justify-center shrink-0">
                          <Image
                            src={template.icon}
                            alt={template.title || ''}
                            width={20}
                            height={20}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className={LABEL}>{template.title}</span>
                    </div>
                    {hoveredTemplate === index && (
                      <span className={LABEL}>&#x21B5;</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
          {helpText?.children?.length > 0 && (
            <div
              className={`${BODY_MUTED} flex items-center justify-between gap-2 border-t border-neutral-border-subtle px-6 pt-3 pb-4 max-w-min min-w-full`}
            >
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
                  aria-label="Close"
                  className={ICON_BUTTON}
                >
                  <IoMdClose />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
