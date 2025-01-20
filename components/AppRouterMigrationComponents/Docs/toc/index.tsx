'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styled, { css } from 'styled-components';
import RightArrowSvg from 'public/svg/right-arrow.svg';
import { getDocId } from 'utils/docs/getDocIds';
import { syncTocScroll } from 'components/AppRouterMigrationComponents/Docs/toc_helper';

interface TocProps {
  tocItems: Array<{ type: string; text: string }>;
  activeIds: string[];
}

export const generateMarkdown = (
  tocItems: Array<{ type: string; text: string }>
) => {
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
  const tocWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(tocWrapperRef.current);
    const syncScrollHander = () => syncTocScroll(tocWrapperRef);
    window.addEventListener('scroll', syncScrollHander);
    syncScrollHander();

    const close = () => setIsOpen(false);
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach((a) => a.addEventListener('click', close));

    return () => {
      allLinks.forEach((a) => a.removeEventListener('click', close));
    };
  }, []);

  if (!tocItems || tocItems.length === 0) {
    return null;
  }

  const tocMarkdown = generateMarkdown(tocItems);

  return (
    <>
      <TocWrapper>
        <TocContent activeIds={activeIds} isOpen={isOpen}>
          <TocDesktopHeader>Table of Contents</TocDesktopHeader>
          <TocTitleList
            ref={tocWrapperRef}
            className="max-h-[70vh] 2xl:max-h-[75vh] p-4 overflow-y-auto"
          >
            <ReactMarkdown
              components={{
                ul: ({ children }) => (
                  <ul className="space-y-1 pt-1">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                a: ({ children, ...props }) => {
                  const isActive = activeIds.includes(props.href?.slice(1)); // Match href with activeIds
                  return (
                    <a
                      {...props}
                      className={`
                        block py-1 px-2 rounded-md
                        ${
                          isActive
                            ? 'text-orange-500 font-medium no-underline hover:bg-gray-50/75 transition-colors duration-150'
                            : 'text-gray-600 hover:text-orange-500 hover:bg-gray-50/75 transition-colors duration-150'
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
          </TocTitleList>
        </TocContent>
      </TocWrapper>
    </>
  );
};

export default ToC;
const TocTitleList = styled.div<{ ref: React.RefObject<HTMLDivElement> }>`
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;

  word-wrap: break-word;
  white-space: normal;
  overflow-wrap: break-word;

  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent,
    black 5%,
    black 95%,
    transparent
  );
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 5%,
    black 95%,
    transparent
  );
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
`;
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
  width: 300px; /* 固定宽度 */
  word-wrap: break-word; /* 如果是长单词，打断换行 */
  white-space: normal; /* 强制内容换行 */
  overflow-wrap: break-word; /* 支持现代浏览器换行规则 */

  @media (min-width: 1200px) {
    position: sticky;
    top: 8rem;
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
    flex-wrap: wrap;
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
