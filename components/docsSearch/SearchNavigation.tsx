import { DocsNavigationList } from 'components/DocumentationNavigation/DocsNavigationList';
import { VersionSelect } from 'components/DocumentationNavigation/VersionSelect';
import { MobileVersionSelect } from 'components/docsMain/docsMobileHeader';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { fetchAlgoliaSearchResults } from 'utils/new-search';

//Helper function for highlighting algolia search hits
const highlightText = (text: string) => {
  const regex = /<em>(.*?)<\/em>/g;
  const segments = [];
  let lastIndex = 0;

  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push(text.substring(lastIndex, match.index));
    }
    segments.push(
      <span key={match.index} className="bg-yellow-200 text-black font-bold">
        {match[1]}
      </span>
    );
    lastIndex = regex.lastIndex;
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
}: {
  results: any;
  activeItem: string;
  query: string;
  numberOfResults: number;
  isLoading: boolean;
}) => {
  const bodyItem = activeItem === 'DOCS' ? results?.docs : results?.blogs;

  return (
    <div className="mt-2 py-2 max-h-[45vh]">
      {bodyItem?.results.slice(0, 10).map((item: any) => (
        <div key={item.objectID} className="py-2 px-4 border-b group">
          <Link href={`/${activeItem.toLowerCase()}/${item.slug}`}>
            <h2 className="text-md font-inter font-semibold bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:via-orange-400 group-hover:to-orange-600 break-words">
              {highlightText(item._highlightResult.title.value)}
            </h2>
            <p className="text-gray-600 group-hover:text-gray-800 text-xs font-light line-clamp-3 break-words">
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
          >
            <div className="pt-2 pb-2 px-4 text-md font-inter font-semibold bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent hover:from-orange-300 hover:via-orange-400 hover:to-orange-600">
              See All {numberOfResults} Results
            </div>
          </Link>
        ) : (
          !isLoading && (
            <div className="pt-4 px-4 text-md font-inter font-semibold text-gray-500">
              No Llamas Found...
            </div>
          )
        )}
      </div>
    </div>
  );
};


export const SearchResultsOverflowTabs = ({ query }) => {
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
  const numberOfResults =
    algoliaSearchResults?.docs?.count + algoliaSearchResults?.blogs?.count;

  return (
    <div className="pt-2 w-full border-b">
      <div className="max-w-screen-xl mx-auto pb-2">
        <div className="flex justify-between items-center">
          {/* Navigation Buttons */}
          <nav className="relative flex gap-16 px-4">
            <button
              ref={(el) => (tabRefs.current[0] = el)}
              className={`font-inter font-semibold text-sm ${
                activeTab === 'DOCS' ? 'text-blue-800' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('DOCS')}
            >
              DOCS ({algoliaSearchResults?.docs?.count})
            </button>
            <button
              ref={(el) => (tabRefs.current[1] = el)}
              className={`font-inter font-semibold text-sm ${
                activeTab === 'BLOG' ? 'text-blue-800' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('BLOG')}
            >
              BLOGS ({algoliaSearchResults?.blogs?.count})
            </button>

            {/* Blue moving underline */}
            <div
              className="absolute -bottom-2 h-0.5 bg-blue-800 transition-all duration-300 ease-in-out"
              style={{
                left: `${left}px`,
                width: `${width}px`,
                transform: 'translateX(-15px)', //To make sure the blue line is in the middle of the component we minus 1/2 of the width of the blue line
              }}
            />
          </nav>
        </div>
        {isLoading && (
          <div className="pt-4 px-4 text-md bg-gradient-to-br from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent font-tuner">
            Mustering all the Llamas...
          </div>
        )}
        <div className="overflow-x-hidden mt-2">
          <SearchResultsOverflowBody
            results={algoliaSearchResults}
            activeItem={activeTab}
            numberOfResults={numberOfResults}
            query={query}
            isLoading={isLoading}
          />
        </div>
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

export const DocsSearchBarHeader = ({
  paddingGlobal,
  headerColour,
  headerPadding,
  searchMargin,
  searchBarPadding,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userHasTyped, setUserHasTyped] = useState(false);
  const [searchOverFlowOpen, setSearchOverflowOpen] = useState(false);
  const router = useRouter();
  const headerStyling =
    headerColour.toLowerCase() === 'blue'
      ? 'from-blue-600/80 via-blue-800/80 to-blue-1000'
      : 'from-orange-400 via-orange-500 to-orange-600';

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOverflowOpen(true);
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      setUserHasTyped(true);
      fetchSearchResults(value);
    } else {
      setUserHasTyped(false);
      setSearchResults(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchOverflowOpen(false);
    }
  };

  const fetchSearchResults = async (query: string) => {
    setIsLoading(true);
    try {
      const results = await fetchAlgoliaSearchResults(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${paddingGlobal} pt-10`}>
      <div className="flex justify-between">
        <h1
          className={`text-4xl pb-4 font-tuner bg-gradient-to-br ${headerStyling} ${headerPadding}  bg-clip-text text-transparent`}
        >
          Docs
        </h1>
        <div className="mr-3">
          <MobileVersionSelect />
        </div>
      </div>
      <div className={`relative ${searchMargin}`}>
        <input
          type="text"
          className={`w-full p-2 pl-6 rounded-full border border-gray-300/20 bg-white/50 shadow-lg ${searchBarPadding}`}
          placeholder="Search"
          onKeyDown={handleKeyDown}
          onChange={handleKeyChange}
          onFocus={() => setSearchOverflowOpen(true)}
        />
        <HiMagnifyingGlass
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-600 text-xl cursor-pointer"
          onClick={() => {
            if (searchTerm.trim()) {
              router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
              setSearchOverflowOpen(false);
            }
          }}
        />
      </div>
      {userHasTyped && searchOverFlowOpen && (
        <SearchResultsOverflow query={searchTerm} />
      )}
    </div>
  );
};

export const LeftHandSideParentContainer = ({ tableOfContents }) => {
  return (
    <div className="rounded-2xl shadow-xl w-full bg-white/50 ">
      <DocsSearchBarHeader
        paddingGlobal="p-4"
        headerColour="blue"
        headerPadding="pl-4"
        searchMargin="mx-3"
        searchBarPadding=""
      />
      <div className="overflow-y-scroll overflow-x-hidden max-h-[62vh] 2xl:max-h-[75vh] pl-4 2xl:pl-0 ">
        <DocsNavigationList navItems={tableOfContents} />
      </div>
    </div>
  );
};
