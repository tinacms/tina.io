import { DocsNavigationList } from 'components/DocumentationNavigation/DocsNavigationList';
import ToC, { generateMarkdown } from 'components/toc';
import Link from 'next/link';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const DirectoryOverflow = ({ tocData }) => {
  return (
    <div className="absolute z-20 bg-white mt-4 rounded-lg w-full p-6 shadow-xl animate-fade-down animate-duration-300 overflow-y-scroll h-96">
      <DocsNavigationList navItems={tocData.tocData} />
    </div>
  );
};

const DirectoryOverflowButton = (tocData) => {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  return (
    <div className="pb-6 w-full px-3">
      <div
        className="py-2 px-4 border-slate-400 bg-gradient-to-r from-white/50 to-white/30 rounded-lg shadow-lg cursor-pointer"
        onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
      >
        <span className="flex items-center space-x-2">
          <MdMenu size={20} className="text-orange-500" />
          <span className="text-slate-600">Topics</span>
        </span>
      </div>
      {isTableOfContentsOpen && (
        <div className="w-full relative">
          <DirectoryOverflow tocData={tocData} />
        </div>
      )}
    </div>
  );
};

export default DirectoryOverflowButton;
