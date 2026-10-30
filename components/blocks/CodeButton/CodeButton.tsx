import Image from 'next/image';
import { type KeyboardEvent, useRef, useState } from 'react';
import { BiCheck, BiCopy, BiLinkExternal } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { type Components, TinaMarkdown } from 'tinacms/dist/rich-text';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import { FOCUS_RING, ICON_BUTTON } from '@/component/styles/buttons';
import {
  COMMAND_MENU,
  COMMAND_MENU_ITEM,
  COMMAND_MENU_RULE,
  MENU_REVEAL,
} from '@/component/styles/menu';
import { BODY_MUTED, LINK, NAV_MENU_LINK } from '@/component/styles/typography';
import { copyToClipboard } from '../../layout/MarkdownContent';

// biome-ignore lint/complexity/noBannedTypes: <TODO>
export const CodeButtonMarkdownStyle: Components<{}> = {
  a: (props) => {
    return <a href={props.url} {...props} className={LINK} />;
  },
};

interface StarterTemplate {
  title: string;
  link: string;
  icon?: string | null;
}

interface CodeButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  id?: string;
  className?: string;
  /** TinaCMS rich text. */
  helpText?: any;
  starterTemplates?: StarterTemplate[] | null;
  children?: React.ReactNode;
}

export const CodeButton = ({
  children: _children,
  label,
  id,
  className = '',
  helpText,
  starterTemplates,
  ...props
}: CodeButtonProps) => {
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

  const fieldRef = useRef<HTMLButtonElement>(null);

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

  const closeMenu = () => {
    setShowHelpText(false);
    setIsExplicitlyShown(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isExpanded) {
      closeMenu();
      fieldRef.current?.focus();
    }
  };

  const closeButton = (
    <button
      onClick={closeMenu}
      type="button"
      aria-label="Close"
      className={ICON_BUTTON}
    >
      <IoMdClose />
    </button>
  );

  return (
    <div
      className={`relative flex flex-col command-field max-w-full ${className}`}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={fieldRef}
        type="button"
        className={`relative w-full rounded-lg text-left cursor-pointer ${FOCUS_RING}`}
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
          <span className="command-label pr-2 flex flex-1 items-center mt-0.5 select-text">
            {label}
          </span>
          <span className="relative flex items-center rounded-r-md command-copy h-full px-4 py-3">
            <BiCopy
              className={`w-5 h-5 duration-200 ${_copied ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
            />
            <BiCheck
              className={`w-5 h-5 absolute inset-0 m-auto duration-200 ${_copied ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'}`}
            />
          </span>
        </div>
      </button>
      {/* Behaves like the nav dropdowns (#4964): one hover area holds the
          field and the menu, the 8px gap is padding (a bridge, not a margin),
          and the menu stays mounted and fades. Closed, it is hidden from the
          keyboard too, and Escape closes it. It is exactly as wide as the
          field, so the two line up and it never runs off a phone screen. */}
      {hasDropdownContent && (
        <div
          data-state={isExpanded ? 'open' : 'closed'}
          className={`${MENU_REVEAL} absolute top-full -inset-x-px z-50 pt-2`}
        >
          <div className={COMMAND_MENU}>
            {hasTemplates && (
              <>
                <div className="flex items-center justify-between gap-4 pl-2">
                  <span className={`${NAV_MENU_LINK} pointer-events-none`}>
                    or deploy instantly...
                  </span>
                  {closeButton}
                </div>
                <ul>
                  {starterTemplates.map((template) => (
                    <li key={template.title}>
                      <a
                        href={template.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${COMMAND_MENU_ITEM} ${NAV_MENU_LINK}`}
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
                          className="text-sm shrink-0"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {helpText?.children?.length > 0 && (
              <div
                className={`${BODY_MUTED} flex items-center justify-between gap-2 px-2 pt-2 pb-1 ${hasTemplates ? `mt-1 ${COMMAND_MENU_RULE}` : ''}`}
              >
                <TinaMarkdown
                  content={helpText}
                  components={CodeButtonMarkdownStyle}
                />
                {!hasTemplates && closeButton}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
