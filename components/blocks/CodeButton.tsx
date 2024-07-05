import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { BiCopy } from 'react-icons/bi';
import { copyToClipboard } from '../../components/layout/MarkdownContent';

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
      <button
        className="code-button event-cmd-button"
        onClick={clickEvent}
        id={id}
        {...props}
      >
        <div className="content">
          <span className="text">
            <span className="bash">&gt;</span> {children}
          </span>
          <span className="label">{label}</span>
          <span className="icon">
            <BiCopy />
          </span>
        </div>
        <span id={id} className={`success-message ${copied ? 'visible' : ''}`}>
          Copied to clipboard!
        </span>
      </button>
      <style jsx>{`
        .bash {
          opacity: 0.5;
          margin-right: 0.25rem;
        }

        .label {
          margin-right: 0.5rem;
          position: relative;
          z-index: 1;
        }

        .success-message {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
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
          align-items: center;
          justify-content: center;
          font-weight: bold;
          overflow: hidden;
          font-size: 1rem;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 150ms ease-out;
          width: max-content;
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
          position: relative;

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

        .content {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};
