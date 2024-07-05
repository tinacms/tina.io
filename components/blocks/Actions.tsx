import 'react-responsive-modal/styles.css';
import { BiArrowBack } from 'react-icons/bi';
import { LinkButton } from '../../components/ui';
import { tinaField } from 'tinacms/dist/react';

export const sanitizeLabel = (label) => {
  return label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
};

export const Actions = ({ items, align = 'left' }) => {
const isList = true;

  return (
    <>
      <div
        className={[
          'items-center',
          isList ? 'flex flex-col sm:flex-row md:flex-row lg:flex-row' : 'flex flex-row',
          align === 'center' && 'actionGroupCenter',
        ].filter(Boolean).join(' ')}
      >
        {items &&
          items.map((item) => {
            const { variant, label, icon, url, buttonType } = item;
            {
              const externalUrlPattern = /^((http|https|ftp):\/\/)/;
              const external = externalUrlPattern.test(url);
              return (
                <LinkButton
                  key={label}
                  id={sanitizeLabel(label)}
                  size={item.size ? item.size : 'medium'}
                  link={url}
                  target={external ? '_blank' : '_self'}
                  color={variant}
                  data-tina-field={tinaField(item, 'label')}
                >
                  {label}
                  {icon && <BiArrowBack className="h-[1.125em] w-auto opacity-70 ml-2 -mr-1 -mt-1 rotate-180" />}
                </LinkButton>
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
