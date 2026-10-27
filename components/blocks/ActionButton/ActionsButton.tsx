import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import { tinaField } from 'tinacms/dist/react';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import { EYEBROW_LINK } from '@/component/styles/typography';
import { FlushButton, LinkButton } from '../../ui';

// Ghost Blue has no fill and no border, so it reads as a standalone text link
// (“READ MORE →”), not a button: it takes EYEBROW_LINK like every other
// standalone link. Ghost Outline and the filled variants stay buttons (#4964).
const TEXT_LINK_VARIANT = 'ghostBlue';

export const Actions = ({
  items,
  align = 'left',
  flush = false,
  className = '',
}) => {
  const isList = true;
  const ActionButton = flush ? FlushButton : LinkButton;

  return (
    <>
      <div
        className={[
          'items-center',
          isList
            ? 'flex flex-col sm:flex-row md:flex-row lg:flex-row'
            : 'flex flex-row',
          align === 'center' && 'actionGroupCenter',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {items?.map((item, index) => {
          const { variant, label, icon, url, shape } = item;
          {
            const externalUrlPattern = /^((http|https|ftp):\/\/)/;
            const external = externalUrlPattern.test(url);
            const link = url || '#';
            if (variant === TEXT_LINK_VARIANT) {
              return (
                <Link
                  key={sanitizeLabel(label) || `action-link-${index}`}
                  id={sanitizeLabel(label)}
                  href={link}
                  target={external ? '_blank' : '_self'}
                  rel={external ? 'noopener noreferrer' : undefined}
                  data-tina-field={tinaField(item, 'label')}
                  className={`${EYEBROW_LINK} inline-flex items-center gap-1.5 py-2 ${className}`}
                >
                  {label}
                  {icon && (
                    <BiArrowBack className="h-[1.125em] w-auto rotate-180" />
                  )}
                </Link>
              );
            }
            return (
              <ActionButton
                key={sanitizeLabel(label) || `action-button-${index}`}
                id={sanitizeLabel(label)}
                size={item.size ? item.size : 'medium'}
                link={link}
                target={external ? '_blank' : '_self'}
                color={variant === 'default' ? 'seafoam' : variant}
                shape={shape || 'pill'}
                data-tina-field={tinaField(item, 'label')}
                className={className}
              >
                {label}
                {icon && (
                  <BiArrowBack className="h-[1.125em] w-auto opacity-70 ml-2 -mr-1 rotate-180" />
                )}
              </ActionButton>
            );
          }
        })}
      </div>
      <style jsx>{`
        .or-text {
          margin: 0.5rem 1.5rem 0.5rem 0.75rem;
          font-size: 1.125rem;
          color: var(--color-secondary);
          font-weight: bold;
        }

        .actionGroupCenter {
          justify-content: center;
        }

        .icon-class {
          display: inline-block;
          fill: currentColor;
          margin-left: 0.375em;
          height: 1em;
          width: auto;
          transition: opacity ease-out 150ms;
        }
      `}</style>
    </>
  );
};
