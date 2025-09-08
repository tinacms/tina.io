'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled, { css } from 'styled-components';
import { getDocId } from 'utils/docs/getDocIds';
import { IoMdBook } from "react-icons/io";

interface TocProps {
  tocItems: Array<{ type: string; text: string }>;
  activeId: string;
}

export const generateMarkdown = (
  tocItems: Array<{ type: string; text: string }>,
) => {
  return tocItems
    .map((item) => {
      const anchor = getDocId(item.text);
      const prefix = item.type === 'h3' ? '  ' : '';
      return `${prefix}- [${item.text}](#${anchor})`;
    })
    .join('\n');
};

const ToC = ({ tocItems, activeId }: TocProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const tocWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = () => setIsOpen(false);
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach((a) => a.addEventListener('click', close));

    return () => {
      allLinks.forEach((a) => a.removeEventListener('click', close));
    };
  }, []);

  useEffect(() => {
    if (tocWrapperRef.current && activeId) {
      const tocList = tocWrapperRef.current;

      const activeLink = tocList.querySelector(`a[href="#${activeId}"]`);

      if (activeLink) {
        const activeTop = (activeLink as HTMLElement).offsetTop;
        const activeHeight = (activeLink as HTMLElement).offsetHeight;
        const listHeight = tocList.clientHeight;

        tocList.scrollTo({
          top: activeTop - listHeight / 2 + activeHeight / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [activeId]);

  if (!tocItems || tocItems.length === 0) {
    return null;
  }

  const tocMarkdown = generateMarkdown(tocItems);
  const isZhPath =
    typeof window !== 'undefined'
      ? window.location.pathname.includes('/zh/')
      : // biome-ignore lint/correctness/useHookAtTopLevel: <TODO>
        usePathname().includes('/zh/');

  return (
    <TocWrapper>
      <TocContent activeId={activeId} isOpen={isOpen}>
        <h3 className='text-foreground flex items-center gap-2'>
          <IoMdBook size={20} />
          {isZhPath ? '在此页面上' : 'On This Page'}
        </h3>
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
                const isActive = activeId === props.href?.slice(1); // Match href with activeId

                const handleClick = (
                  e: React.MouseEvent<HTMLAnchorElement>,
                ) => {
                  e.preventDefault();
                  const href = props.href;
                  if (href?.startsWith('#')) {
                    const targetId = href.slice(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      const elementPosition =
                        targetElement.getBoundingClientRect().top;
                      const offsetPosition =
                        elementPosition + window.pageYOffset - 100;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                      });
                    }
                  }
                };

                return (
                  <a
                    type="button"
                    {...props}
                    // biome-ignore lint/a11y/useValidAnchor: <TODO>
                    onClick={handleClick}
                    className={`
                        block py-1 px-2 rounded-md transition-colors duration-150 cursor-pointer
                        ${
                          isActive
                            ? 'text-orange-500 font-medium no-underline'
                            : 'text-foreground hover:text-orange-500'
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

const TocWrapper = styled.div`
  margin-bottom: -0.375rem;
  flex: 0 0 auto;
  width: 300px; /* fix width */
  word-wrap: break-word; /* break the long word */
  white-space: normal;
  overflow-wrap: break-word; /* suppport Chrome */

  @media (min-width: 1200px) {
    position: sticky;
    top: 8rem;
  }
`;

const TocContent = styled.div<{ isOpen: boolean; activeId: string }>`
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
