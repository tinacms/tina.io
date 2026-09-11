'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { fetchAlgoliaSearchResults } from 'utils/new-search';
import { Dialog, DialogContent } from '@/components/ui/dialog';

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
  query,
  numberOfResults,
  isLoading,
  onResultClick,
}: {
  results: any;
  query: string;
  numberOfResults: number;
  isLoading: boolean;
  onResultClick?: () => void;
}) => {
  return (
    <div className="py-2">
      {results?.blogs?.results.slice(0, 10).map((item: any) => (
        <div
          key={item.objectID}
          className="py-3 px-4 border-b border-gray-100 group hover:bg-gray-50 transition-colors"
        >
          <Link href={`/blog/${item.slug}`} onClick={onResultClick}>
            <h2 className="text-md font-inter font-semibold bg-linear-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:via-orange-400 group-hover:to-orange-600 break-words">
              {highlightText(item._highlightResult.title.value)}
            </h2>
            <p className="text-gray-600 group-hover:text-gray-800 text-xs font-normal line-clamp-2 break-words mt-1">
              {highlightText(item._highlightResult.excerpt?.value || '')}
            </p>
          </Link>
        </div>
      ))}
      <div>
        {numberOfResults > 0 ? (
          <Link
            className="underline"
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

  const numberOfResults = algoliaSearchResults?.blogs?.count || 0;

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <div className="flex justify-between items-center">
          <nav className="relative flex gap-16 px-6">
            <span className="font-inter font-semibold text-sm py-4 text-blue-800">
              BLOGS ({numberOfResults})
            </span>
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
          numberOfResults={numberOfResults}
          query={query}
          isLoading={isLoading}
          onResultClick={onResultClick}
        />
      </div>
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-5xl rounded-2xl text-left p-0">
        <div className="flex flex-col h-full">
          {/* Search Input */}
          <div className="relative px-10 py-6 border-b border-gray-200">
            <input
              ref={inputRef}
              type="text"
              className="w-full py-3 px-6 rounded-full border border-gray-300 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Search blog posts..."
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
                  Search through blog posts
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const SearchBar = ({ className = '' }: { className?: string }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const openModal = () => {
    setIsSearchModalOpen(true);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <input
          type="text"
          className="w-full p-2 pl-6 rounded-full border border-gray-300/20 bg-white/50 shadow-lg cursor-pointer"
          placeholder="Search"
          onClick={openModal}
          onKeyDown={handleInputKeyDown}
          readOnly
        />
        <HiMagnifyingGlass
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-600 text-xl cursor-pointer"
          onClick={openModal}
        />
      </div>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};
