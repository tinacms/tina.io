import Image from 'next/image';
import { useState } from 'react';
import { BiCheck, BiCopy, BiLinkExternal } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { type Components, TinaMarkdown } from 'tinacms/dist/rich-text';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import { FOCUS_RING, ICON_BUTTON } from '@/component/styles/buttons';
import { MENU_ITEM, MENU_PANEL } from '@/component/styles/menu';
import { BODY_MUTED, LINK, NAV_MENU_LINK } from '@/component/styles/typography';
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
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`relative w-full rounded-lg bg-white/50 text-left text-black cursor-pointer hover:text-brand-primary transition-colors ${FOCUS_RING}`}
        onClick={clickEvent}
        onMouseEnter={handleMouseEnter}
        aria-expanded={hasDropdownContent ? isExpanded : undefined}
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
      {/* Same menu as the nav dropdowns (#4964): one hover area holds the
          field and the menu, the 8px gap is padding (a bridge, not a margin),
          and the menu stays mounted and fades. */}
      {hasDropdownContent && (
        <div
          className={`absolute top-full left-0 z-50 min-w-full w-max pt-2 transition-opacity duration-200 ease-in-out ${
            isExpanded
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className={MENU_PANEL}>
            {hasTemplates && (
              <>
                <div className="flex items-center justify-between gap-4 pl-2">
                  <span className={`${NAV_MENU_LINK} pointer-events-none`}>
                    or deploy instantly...
                  </span>
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
                <ul>
                  {starterTemplates.map((template) => (
                    <li key={template.title}>
                      <a
                        href={template.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${MENU_ITEM} group ${NAV_MENU_LINK}`}
                      >
                        {template.icon && (
                          <span className="size-5 rounded-full overflow-hidden bg-strong flex items-center justify-center shrink-0">
                            <Image
                              src={template.icon}
                              alt=""
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                          </span>
                        )}
                        {template.title}
                        <BiLinkExternal
                          aria-hidden="true"
                          className="text-blue-200 text-sm group-hover:text-blue-400 inline"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {helpText?.children?.length > 0 && (
              <div
                className={`${BODY_MUTED} flex items-center justify-between gap-2 px-2 pt-2 pb-1 ${hasTemplates ? 'mt-1 border-t border-white' : ''}`}
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
        </div>
      )}
    </div>
  );
};
