import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import { BUTTON_GROUP, levelOf } from '@/component/styles/buttons';
import { EYEBROW_LINK } from '@/component/styles/typography';
import { cn } from '@/lib/utils';
import { ButtonArrow, FlushButton, LinkButton } from '../../ui';

// A text link (“READ MORE →”) has no fill or border, so it isn't a button: it
// takes EYEBROW_LINK and always ends in an arrow; buttons have none (#4964).
// `ghostBlue` is the pre-#4964 name for the same option.
const isTextLink = (variant?: string) =>
  variant === 'textLink' || variant === 'ghostBlue';

export const Actions = ({
  items,
  align = 'left',
  flush = false,
  className = '',
}) => {
  const ActionButton = flush ? FlushButton : LinkButton;

  return (
    <div
      className={cn(BUTTON_GROUP, align === 'center' && 'sm:justify-center')}
    >
      {items?.map((item, index) => {
        const { variant, label, url } = item;
        const externalUrlPattern = /^((http|https|ftp):\/\/)/;
        const external = externalUrlPattern.test(url);
        const link = url || '#';
        if (isTextLink(variant)) {
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
              <ButtonArrow />
            </Link>
          );
        }
        return (
          <ActionButton
            key={sanitizeLabel(label) || `action-button-${index}`}
            id={sanitizeLabel(label)}
            link={link}
            target={external ? '_blank' : '_self'}
            level={levelOf(variant)}
            data-tina-field={tinaField(item, 'label')}
            className={className}
          >
            {label}
          </ActionButton>
        );
      })}
    </div>
  );
};
