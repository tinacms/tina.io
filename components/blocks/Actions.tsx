import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { BiArrowBack, BiCopy } from 'react-icons/bi';
import { copyToClipboard } from '../../components/layout/MarkdownContent';
import { LinkButton, ModalButton } from '../../components/ui';
import { tinaField } from 'tinacms/dist/react';
import { EmailForm } from 'components/forms';
import { DemoForm } from 'components/modals/BookDemo';


export const sanitizeLabel = (label) => {
  return label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
};

const modals = {
  'BookDemo.tsx': <DemoForm/>,
  'EmailForm.tsx': <EmailForm/>,
};

export const Actions = ({ items, align = 'left' }) => {
  const [open, setOpen] = useState(false);
  const [ModalContent, setModalContent] = useState(null);

  const openModal = (modal) => {
    setModalContent(modals[modal]);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const isList = items.length >= 2;

  return (
    <>
      <div
        className={[
          'actionGroup',
          'items-center',
          isList ? 'flex flex-col sm:flex-row md:flex-row lg:flex-row' : 'flex flex-row',
          align === 'center' && 'actionGroupCenter',
        ].filter(Boolean).join(' ')}
      >
        {items &&
          items.map((item) => {
            const { variant, label, icon, url, buttonType, modal } = item;

            
            if (buttonType === 'command') {
              return (
                <React.Fragment key={label}>
                  <span className="or-text">or</span>
                  <CodeButton label={label} id={sanitizeLabel(label)} data-tina-field={tinaField(item, 'label')}>
                    {label}
                  </CodeButton>
                </React.Fragment>
              );
            } 
            
            else if (buttonType === 'modal') {
              return (
                <ModalButton
                  key={label}
                  color={variant}
                  className={`modal-button ${variant}`}
                  onClick={() => openModal(modal)}
                  data-tina-field={tinaField(item, 'label')}
                >
                  {label}
                  {icon && <BiArrowBack className="icon-class" />}
                </ModalButton>
              );
            } 
            
            else {
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
      <Modal open={open} onClose={closeModal} center>
        {ModalContent}
      </Modal>
      <style jsx>{`
        .actionGroup {
          margin: 0 -0.75rem -0.5rem -0.75rem;
        }

        .or-text {
          margin: 0.5rem 1.5rem 0.5rem 0.75rem;
          font-size: 1.125rem;
          color: var(--color-secondary);
          font-weight: bold;
        }

        .actionGroupCenter {
          justify-content: center;
        }

        .modal-button {
          font-size: 1.125rem;
          color: var(--color-orange);
          padding: 0;
        }

        .icon-class {
          display: inline-block;
          fill: currentColor;
          margin-left: 0.375em;
          height: 1em;
          width: auto;
          transition: opacity ease-out 150ms;
        }

        .modal-button:hover .icon-class {
          opacity: 0.85;
        }
      `}</style>
    </>
  );
};

export const CodeButton = ({ children, label, id, ...props }) => {
  const [copied, setCopied] = useState(false);

  const clickEvent = () => {
    setCopied(true);
    copyToClipboard(children);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <button className="code-button event-cmd-button" onClick={clickEvent} id={id} {...props}>
        <span id={id} className={`success-message ${copied ? `visible` : ``}`}>
          Copied to clipboard!
        </span>
        <span className="text">
          <span className="bash">&gt;</span> {children}
        </span>
        <span className="icon">
          <BiCopy />
        </span>
      </button>
      <style jsx>{`
        .bash {
          opacity: 0.5;
          margin-right: 0.25rem;
        }

        .success-message {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          text-align: center;
          color: var(--color-orange);
          font-family: var(--font-tuner);
          font-weight: regular;
          font-style: normal;
          background: white;
          z-index: 10;
          transition: opacity 180ms ease-out;
          opacity: 0;
        }

        .visible {
          opacity: 1;
        }

        .icon {
          width: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-seafoam);
          border-left: 1px solid #b4f4e0;
          color: var(--color-orange);
          align-self: stretch;
          opacity: 0.5;
          transition: opacity 180ms ease-out;
        }

        .text {
          padding: 0.75rem 1rem;
          font-size: 1rem;
        }

        .code-button {
          display: flex;
          font-weight: bold;
          overflow: hidden;
          font-size: 1rem;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 150ms ease-out;
          width: max-content;
          align-items: center;
          background-color: white;
          color: var(--color-secondary);
          font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
          padding: 0;
          border: 1px solid #b4f4e0;
          font-weight: regular;
          font-style: normal;
          text-decoration: none !important;
          white-space: nowrap;
          opacity: 1;
          line-height: 1;

          &:hover,
          &:focus {
            color: var(--color-orange);
            text-decoration: none;
            transform: translate3d(-1px, -2px, 0);
            transition: transform 180ms ease-out;

            .icon {
              opacity: 1;
            }
          }
          &:focus {
            box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px inset,
              rgba(236, 72, 21, 0.7) 0px 0px 0px 3px,
              rgba(0, 0, 0, 0.12) 0px 2px 3px;
          }
          &:focus,
          &:active {
            outline: none;
          }
          &:active {
            filter: none;
          }
        }
      `}</style>
    </>
  );
};
