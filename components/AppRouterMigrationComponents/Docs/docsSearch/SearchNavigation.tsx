'use client';

import { MobileVersionSelect } from 'components/AppRouterMigrationComponents/Docs/docsMain/docsMobileHeader';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { Modal } from 'react-responsive-modal';
import { fetchAlgoliaSearchResults } from 'utils/new-search';
import { DocsNavigationList } from '../DocumentationNavigation/DocsNavigationList';

// Helper function for highlighting Algolia search hits
export const highlightText = (text: string) => {
  const regex = /<em>(.*?)<\/em>/g;
  const segments = [];
  let lastIndex = 0;

  let match: RegExpExecArray | null = regex.exec(text);
  while (match !== null) {
    if (match.index > lastIndex) {
      segments.push(text.substring(lastIndex, match.index));
    }
    segments.push(
      <span key={match.index} className="bg-orange-200 text-black font-bold">
        {match[1]}
      </span>,
    );
    lastIndex = regex.lastIndex;
    match = regex.exec(text);
  }
  if (lastIndex < text.length) {
    segments.push(text.substring(lastIndex));
  }
  return segments;
};

export const SearchResultsOverflowBody = ({
  results,
  activeItem,
  query,
  numberOfResults,
  isLoading,
  onResultClick,
}: {
  results: any;
  activeItem: string;
  query: string;
  numberOfResults: number;
  isLoading: boolean;
  onResultClick?: () => void;
}) => {
  const bodyItem = activeItem === 'DOCS' ? results?.docs : results?.blogs;

  return (
    <div className="py-2">
      {bodyItem?.results.slice(0, 10).map((item: any) => (
        <div
          key={item.objectID}
          className="py-3 px-4 border-b border-gray-100 group hover:bg-gray-50 transition-colors"
        >
          <Link
            href={`/${activeItem.toLowerCase()}/${item.slug}`}
            onClick={onResultClick}
          >
            <h2 className="text-md font-inter font-semibold bg-linear-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:via-orange-400 group-hover:to-orange-600 break-words">
              {highlightText(item._highlightResult.title.value)}
            </h2>
            <p className="text-gray-600 group-hover:text-gray-800 text-xs font-light line-clamp-2 break-words mt-1">
              {highlightText(item._highlightResult.excerpt?.value || '')}
            </p>
          </Link>
        </div>
      ))}
      <div>
        {numberOfResults > 0 ? (
          <Link
            className="block"
            href={`/search?query=${encodeURIComponent(query)}`}
            onClick={onResultClick}
          >
            <div className="pt-3 pb-3 px-4 text-md font-inter font-semibold bg-linear-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent hover:from-orange-300 hover:via-orange-400 hover:to-orange-600 border-t border-gray-100">
              See All {numberOfResults} Results
            </div>
          </Link>
        ) : (
          !isLoading && (
            <div className="pt-8 px-4 text-center text-md font-inter font-semibold text-gray-500">
              No Llamas Found...
            </div>
          )
        )}
      </div>
    </div>
  );
};

export const SearchResultsOverflowTabs = ({
  query,
  onResultClick,
}: {
  query: string;
  onResultClick?: () => void;
}) => {
  const [activeTab, setActiveTab] = useState('DOCS');
  const [algoliaSearchResults, setAlgoliaSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setAlgoliaSearchResults(null);
      if (query) {
        const results = await fetchAlgoliaSearchResults(query);
        setAlgoliaSearchResults(results);
      }
      setIsLoading(false);
    };

    fetchResults();
  }, [query]);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeTabIndex = activeTab === 'DOCS' ? 0 : 1;
  const activeTabElement = tabRefs.current[activeTabIndex];
  const left = activeTabElement?.offsetLeft || 0;
  const width = (activeTabElement?.offsetWidth || 0) + 30;
  const docsCount = algoliaSearchResults?.docs?.count || 0;
  const blogsCount = algoliaSearchResults?.blogs?.count || 0;
  const numberOfResults = docsCount + blogsCount;

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <div className="flex justify-between items-center">
          {/* Navigation Buttons */}
          <nav className="relative flex gap-16 px-6">
            <button
              type="button"
              // biome-ignore lint/suspicious/noAssignInExpressions: <TODO>
              ref={(el) => (tabRefs.current[0] = el)}
              className={`font-inter font-semibold text-sm py-4 ${
                activeTab === 'DOCS' ? 'text-blue-800' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('DOCS')}
            >
              DOCS ({docsCount})
            </button>
            <button
              type="button"
              // biome-ignore lint/suspicious/noAssignInExpressions: <TODO>
              ref={(el) => (tabRefs.current[1] = el)}
              className={`font-inter font-semibold text-sm py-4 ${
                activeTab === 'BLOG' ? 'text-blue-800' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('BLOG')}
            >
              BLOGS ({blogsCount})
            </button>

            {/* Blue moving underline */}
            <div
              className="absolute bottom-0 h-0.5 bg-blue-800 transition-all duration-300 ease-in-out"
              style={{
                left: `${left}px`,
                width: `${width}px`,
                transform: 'translateX(-15px)',
              }}
            />
          </nav>
        </div>
      </div>
      {isLoading && (
        <div className="pt-8 px-6 text-center text-md bg-linear-to-br from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent font-ibm-plex">
          Mustering all the Llamas...
        </div>
      )}
      <div className="overflow-x-hidden">
        <SearchResultsOverflowBody
          results={algoliaSearchResults}
          activeItem={activeTab}
          numberOfResults={numberOfResults}
          query={query}
          isLoading={isLoading}
          onResultClick={onResultClick}
        />
      </div>
    </div>
  );
};

export const SearchResultsOverflow = ({ query }) => {
  return (
    <div className="absolute pt-2 left-0 right-0 mx-7 mt-2 bg-white z-20 shadow-2xl rounded-md">
      <SearchResultsOverflowTabs query={query} />
    </div>
  );
};

export const SearchModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      classNames={{
        overlay: 'bg-gray-900 bg-opacity-50',
        modal:
          'search-modal bg-white w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-4xl rounded-2xl text-left overflow-hidden',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Search Input */}
        <div className="relative px-10 py-6 border-b border-gray-200">
          <input
            ref={inputRef}
            type="text"
            className="w-full py-3 px-6 rounded-full border border-gray-300 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Search docs and blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={handleSearchClick}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-orange-600 text-xl cursor-pointer hover:text-orange-700"
            aria-label="Search"
          >
            <HiMagnifyingGlass />
          </button>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {searchTerm.trim() ? (
            <SearchResultsOverflowTabs
              query={searchTerm}
              onResultClick={onClose}
            />
          ) : (
            <div className="p-12 text-center text-gray-500">
              <HiMagnifyingGlass className="mx-auto text-5xl mb-4 text-gray-300" />
              <p className="text-lg font-inter font-medium">
                Start typing to search...
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Search through docs and blog posts
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export const DocsSearchBarHeader = ({
  paddingGlobal,
  headerPadding,
  searchMargin,
  searchBarPadding,
  learnActive = false,
  setLearnActive = (_value: boolean) => {},
}) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const pathName = usePathname();
  const isZh = pathName.includes('/zh/');

  const handleInputClick = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <>
      <div className={`${paddingGlobal} pt-8`}>
        <div className="flex gap-8 max-w-sm">
          <h1
            className={`${
              !learnActive ? 'opacity-100' : 'opacity-50 cursor-pointer'
            } hover:opacity-100 text-3xl pb-2 font-ibm-plex bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 ${headerPadding} bg-clip-text text-transparent`}
            onClick={() => setLearnActive(false)}
          >
            {isZh ? '文档' : 'Docs'}
          </h1>
          <h1
            className={`${
              learnActive ? 'opacity-100' : 'opacity-50 cursor-pointer'
            } hover:opacity-100 text-3xl pb-2 font-ibm-plex bg-linear-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 ${headerPadding} bg-clip-text text-transparent`}
            onClick={() => setLearnActive(true)}
          >
            {isZh ? '学习' : 'Learn'}
          </h1>
          <div className="mr-3"></div>
        </div>
        <div className="flex justify-between mb-4 md:ml-4">
          <MobileVersionSelect />
        </div>
        <div className={`relative ${searchMargin}`}>
          <input
            type="text"
            className={`w-full p-2 pl-6 rounded-full border border-gray-300/20 bg-white/50 shadow-lg cursor-pointer ${searchBarPadding}`}
            placeholder="Search"
            onClick={handleInputClick}
            readOnly
          />
          <HiMagnifyingGlass
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-600 text-xl cursor-pointer"
            onClick={handleInputClick}
          />
        </div>
      </div>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};

export const LeftHandSideParentContainer = ({
  tableOfContents,
  tableOfContentsLearn,
  learnActive,
  setLearnActive,
}) => {
  return (
    <div className="rounded-2xl shadow-xl w-full bg-white/50 h-5/6 overflow-y-hidden relative">
      <div className="absolute -bottom-1 left-0 right-0 h-8 bg-linear-to-t from-white/90 to-transparent pointer-events-none z-40"></div>
      <DocsSearchBarHeader
        paddingGlobal="p-4"
        headerPadding="pl-4"
        searchMargin="mx-3"
        searchBarPadding=""
        learnActive={learnActive}
        setLearnActive={setLearnActive}
      />
      <div className="overflow-y-hidden overflow-x-hidden h-full pl-4 2xl:pl-0 relative">
        <div className="h-full relative overflow-hidden">
          <div
            className="flex w-[200%] h-full absolute top-0 left-0"
            style={{
              transform: learnActive ? 'translateX(-50%)' : 'translateX(0)',
              transition: 'transform 500ms ease-in-out',
            }}
          >
            <div
              className="w-1/2 shrink-0 h-full"
              style={{
                opacity: learnActive ? 0.3 : 1,
                transition: 'opacity 400ms ease-in-out',
                pointerEvents: learnActive ? 'none' : 'auto',
              }}
            >
              <div className="h-full overflow-y-auto pb-44 relative">
                <DocsNavigationList
                  color={'orange'}
                  navItems={tableOfContents}
                />
              </div>
            </div>
            <div
              className="w-1/2 shrink-0 h-full"
              style={{
                opacity: learnActive ? 1 : 0.3,
                transition: 'opacity 400ms ease-in-out',
                pointerEvents: learnActive ? 'auto' : 'none',
              }}
            >
              <div className="h-full overflow-y-auto pb-44 relative">
                <DocsNavigationList
                  color={'blue'}
                  navItems={tableOfContentsLearn}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
