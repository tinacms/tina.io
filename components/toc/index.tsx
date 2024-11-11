import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled, { css } from 'styled-components';
import RightArrowSvg from '../../public/svg/right-arrow.svg';
import { getDocId } from 'utils/docs/getDocIds';

interface TocProps {
  tocItems: Array<{ type: string; text: string }>;
  activeIds: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const generateMarkdown = (tocItems: Array<{ type: string; text: string }>) => {
  return tocItems
    .map((item) => {
      const anchor = getDocId(item.text);
      const prefix = item.type === 'h3' ? '  ' : '';
      return `${prefix}- [${item.text}](#${anchor})`;
    })
    .join('\n');
};

const ToC = ({ tocItems, activeIds, isOpen, setIsOpen }: TocProps) => {
  const [isManualOpen, setIsManualOpen] = useState(false);

  useEffect(() => {
    const close = () => setIsOpen(false);
    const allLinks = document.querySelectorAll('a');
    if (allLinks.length > 0) {
      allLinks.forEach((a) => a.addEventListener('click', close));
    }
    return () => {
      if (allLinks.length > 0) {
        allLinks.forEach((a) => a.removeEventListener('click', close));
      }
    };
  }, [setIsOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isManualOpen && window.scrollY > 200) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsOpen, isManualOpen]);

  if (!tocItems || tocItems.length === 0) {
    return null;
  }

  const tocMarkdown = generateMarkdown(tocItems);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setIsManualOpen(true);
  };

  return (
    <TocWrapper>
      <TocButton isOpen={isOpen} onClick={handleToggle}>
        <span>{isOpen ? 'Hide Table of Contents' : ''}</span>
        <RightArrowSvg />
      </TocButton>
      <TocContent activeIds={activeIds} isOpen={isOpen}>
        <TocDesktopHeader>Table of Contents</TocDesktopHeader>
        <ReactMarkdown>{tocMarkdown}</ReactMarkdown>
      </TocContent>
    </TocWrapper>
  );
};

export default ToC;

export const TocDesktopHeader = styled.span`
  display: none;
  font-size: 1rem;
  color: var(--color-secondary);
  opacity: 0.5;
  background: transparent;
  line-height: 1;
  margin-bottom: 1.125rem;
`;

export const TocWrapper = styled.div`
  margin-bottom: -0.375rem;
  flex: 0 0 auto;

  @media (min-width: 1200px) {
    position: sticky;
    top: 1.5rem;
  }
`;

export const TocButton = styled.button<{ isOpen: boolean }>`
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
    transition: transform 400ms ease-out, right 400ms ease-out;
    right: ${(props) => (props.isOpen ? '0' : '-1.5rem')};
    transform: ${(props) => (props.isOpen ? 'rotate(90deg)' : 'rotate(180deg)')};
    background-color: orange;
    border-radius: 0 15px 15px 0;

    @media (min-width: 1200px) {
      right: ${(props) => (props.isOpen ? '0' : '-2.5rem')};
    }
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
        opacity: 1;
      }
    `};
`;

export interface TocContentProps {
  isOpen: boolean;
  activeIds: string[];
}

export const TocContent = styled.div<TocContentProps>`
  display: block;
  width: 100%;
  line-height: 1.25;
  height: auto;
  max-height: 0;
  overflow: hidden;
  transition: all 400ms ease-out;

  ${(props) =>
    props.activeIds &&
    props.activeIds.map(
      (id) =>
        css`
          a[href='#${id}'] {
            color: var(--color-orange);
            text-decoration: none;
          }
        `
    )}

  ${(props) =>
    props.isOpen
      ? css`
          transition: all 400ms ease-in;
          max-height: 1500px;
        `
      : ``};

  /* Top Level Styles */

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  li {
    display: block;
    margin: 0;
    padding: 0.375rem 0 0.375rem 0;
  }

  a {
    color: var(--color-secondary);
  }

  a {
    :not(:focus) {
      :not(:hover) {
        text-decoration-color: transparent !important;
      }
    }
  }

  ul {
    ul {
      padding: 0.125rem 0 0.125rem 0.75rem;

      li {
        padding: 0.25rem 1.5rem 0.25rem 0;

        &:last-child {
          padding-bottom: 0rem;
        }
      }

      a {
        font-size: 0.9375rem;
        font-family: var(--font-primary);
      }
    }
  }
`;
