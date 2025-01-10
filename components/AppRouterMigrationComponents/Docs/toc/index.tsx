'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styled, { css } from 'styled-components';
import RightArrowSvg from 'public/svg/right-arrow.svg';
import { getDocId } from 'utils/docs/getDocIds';

interface TocProps {
  tocItems: Array<{ type: string; text: string }>;
  activeIds: string[];
}

export const generateMarkdown = (tocItems: Array<{ type: string; text: string }>) => {
  return tocItems
    .map((item) => {
      const anchor = getDocId(item.text);
      const prefix = item.type === 'h3' ? '  ' : '';
      return `${prefix}- [${item.text}](#${anchor})`;
    })
    .join('\n');
};

const ToC = ({ tocItems, activeIds }: TocProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const close = () => setIsOpen(false);
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach((a) => a.addEventListener('click', close));
    return () => allLinks.forEach((a) => a.removeEventListener('click', close));
  }, []);

  if (!tocItems || tocItems.length === 0) {
    return null;
  }

  const tocMarkdown = generateMarkdown(tocItems);



  return (
    <TocWrapper>
      <TocContent activeIds={activeIds} isOpen={isOpen}>
        <TocDesktopHeader>Table of Contents</TocDesktopHeader>
        <ReactMarkdown
          components={{
            li: ({ children }) => (
              <li className="hover:text-orange-500 transition-colors">{children}</li>
            ),
            a: ({ children, ...props }) => {
              const isActive = activeIds.includes(props.href?.slice(1)); // Match href with activeIds
              return (
                <a
                  {...props}
                  className={`${
                    isActive ? 'text-orange-500 font-bold no-underline' : 'hover:text-orange-500 underline transition-colors'
                  }`}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {tocMarkdown}
        </ReactMarkdown>
      </TocContent>
    </TocWrapper>
  );
};

export default ToC;

const TocDesktopHeader = styled.span`
  display: none;
  font-size: 1rem;
  color: var(--color-secondary);
  opacity: 0.5;
  background: transparent;
  line-height: 1;
  margin-bottom: 1.125rem;

  @media (min-width: 1200px) {
    display: block;
  }
`;

const TocWrapper = styled.div`
  margin-bottom: -0.375rem;
  flex: 0 0 auto;

  @media (min-width: 1200px) {
    position: sticky;
    top: 8rem;
  }
`;

const TocButton = styled.button<{ isOpen: boolean }>`
  display: block;
  padding: 0;
  outline: none;
  border: none;
  color: var(--color-secondary);
  opacity: 0.65;
  background: transparent;
  cursor: pointer;
  transition: opacity 185ms ease-out;
  display: flex;
  align-items: center;
  line-height: 1;
  margin-bottom: 1.125rem;

  span {
    margin-right: 0.5rem;
  }

  svg {
    position: relative;
    width: 1.25rem;
    height: auto;
    fill: var(--color-grey);
    transform-origin: 50% 50%;
    transition: opacity 180ms ease-out, transform 180ms ease-out;
    opacity: 0.5;
  }

  :hover,
  :focus {
    opacity: 1;

    svg {
      opacity: 1;
    }
  }

  ${(props) =>
    props.isOpen &&
    css`
      color: var(--color-orange);

      svg {
        transform: rotate(90deg);
        opacity: 1;
      }
    `}

  @media (min-width: 1200px) {
    display: none;
  }
`;

const TocContent = styled.div<{ isOpen: boolean; activeIds: string[] }>`
  display: block;
  width: 100%;
  line-height: 1.25;
  height: auto;
  max-height: 0;
  overflow: hidden;
  transition: all 400ms ease-out;

  ${(props) =>
    props.isOpen &&
    css`
      transition: all 750ms ease-in;
      max-height: 1500px;
    `}

  @media (min-width: 1200px) {
    max-height: none;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  li {
    margin: 0;
    padding: 0.375rem 0;
  }


  ul ul {
    padding-left: 0.75rem;

    li {
      padding: 0.25rem 0;
    }
  }
`;
