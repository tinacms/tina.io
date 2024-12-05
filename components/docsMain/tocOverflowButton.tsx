import Link from 'next/link';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { getDocId } from 'utils/docs/getDocIds';


const TocOverflow = ({ tocData }) => {
  return (
    <div className="absolute z-10 bg-white mt-4 rounded-lg w-full p-6 shadow-lg animate-fade-down animate-duration-300 max-h-96 overflow-y-scroll">
      {tocData.tocData.map((item, index) => {
        const textIndentation =
          item.type === 'h3' ? 'ml-4' : item.type === 'h4' ? 'ml-8' : '';
        

        const linkHref = `#${item.text.replace(/\s+/g, '-').toLowerCase()}`;
        
        return (
          <Link
            key={index}
            href={linkHref}
            className={`block hover:text-orange-500 transition-colors pl-6 ${textIndentation} pb-1`}
          >
            {item.text}
          </Link>
        );
      })}
    </div>
  );
};

const TocOverflowButton = (tocData) => {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  return (
    <div className="py-6 w-full">
      <div
        className="py-2 px-4 border-slate-400 bg-gradient-to-r from-white/50 to-white/30 rounded-lg shadow-lg cursor-pointer"
        onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
      >
        <span className="flex items-center space-x-2">
          <MdMenu size={20} className="text-orange-500" />
          <span className="text-slate-600 py-1">Table of Contents</span>
        </span>
      </div>
      {isTableOfContentsOpen && (
        <div className="w-full relative">
          <TocOverflow tocData={tocData} />
        </div>
      )}
    </div>
  );
};

export default TocOverflowButton;
