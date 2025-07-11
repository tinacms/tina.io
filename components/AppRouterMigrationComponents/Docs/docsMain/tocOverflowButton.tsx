import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MdMenu } from 'react-icons/md';

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
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsTableOfContentsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {tocData.tocData.length !== 0 && (
        <div className="py-6 w-full" ref={containerRef}>
          <div
            className="py-2 px-4 border-slate-400 bg-linear-to-r from-white/50 to-white/30 rounded-lg shadow-lg cursor-pointer"
            onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
          >
            <span className="flex items-center space-x-2">
              <MdMenu size={20} className="text-orange-500" />
              <span className="text-slate-600 py-1">
                {usePathname().includes('/zh/') ? '目录' : 'Table of Contents'}
              </span>
            </span>
          </div>
          {isTableOfContentsOpen && (
            <div className="w-full relative">
              <TocOverflow tocData={tocData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TocOverflowButton;
