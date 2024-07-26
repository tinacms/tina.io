// newtoc.tsx
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import RightArrowSvg from '../../public/svg/right-arrow.svg';
import { TocWrapper, TocButton, TocContent, TocDesktopHeader } from './index';

interface TocProps {
  tocItems: Array<{ type: string, text: string }>;
  activeIds: string[];
}

const generateMarkdown = (tocItems: Array<{ type: string, text: string }>) => {
  return tocItems
    .map(item => {
      const anchor = item.text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const prefix = item.type === 'h3' ? '  ' : '';
      return `${prefix}- [${item.text}](#${anchor})`;
    })
    .join('\n');
};

const NewToc = ({ tocItems, activeIds }: TocProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
  }, []);

  if (!tocItems || tocItems.length === 0) {
    return null;
  }

  const tocMarkdown = generateMarkdown(tocItems);

  return (
    <TocWrapper>
      <TocButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span>{isOpen ? 'Hide' : 'Show'} Table of Contents</span> 
        <RightArrowSvg />
      </TocButton>
      <TocContent activeIds={activeIds} isOpen={isOpen}>
        <TocDesktopHeader>Table of Contents</TocDesktopHeader>
        <ReactMarkdown>{tocMarkdown}</ReactMarkdown>
      </TocContent>
    </TocWrapper>
  );
};

export default NewToc;
