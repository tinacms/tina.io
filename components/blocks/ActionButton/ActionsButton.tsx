import { tinaField } from 'tinacms/dist/react';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import { levelOf } from '@/component/styles/buttons';
import { ButtonGroup, LinkButton, TextLink } from '../../ui';

// A text link (“READ MORE →”) has no fill or border, so it isn't a button: it
// is a TextLink, which always ends in the arrow. Buttons have none (#4964).
export const Actions = ({
  items,
  align = 'left',
  fill = false,
  className = '',
}) => (
  <ButtonGroup fill={fill} align={align === 'center' ? 'center' : 'left'}>
    {items?.map((item, index) => {
      const { variant, label, url } = item;
      const link = url || '#';
      const id = sanitizeLabel(label);
      if (variant === 'textLink') {
        return (
          <TextLink
            key={id || `action-link-${index}`}
            id={id}
            href={link}
            data-tina-field={tinaField(item, 'label')}
            className={className}
          >
            {label}
          </TextLink>
        );
      }
      return (
        <LinkButton
          key={id || `action-button-${index}`}
          id={id}
          link={link}
          level={levelOf(variant)}
          data-tina-field={tinaField(item, 'label')}
          className={className}
        >
          {label}
        </LinkButton>
      );
    })}
  </ButtonGroup>
);
