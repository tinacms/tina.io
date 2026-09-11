import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchAlgoliaSearchResults } from 'utils/new-search';
import { highlightText } from './SearchModal';

export const SearchHeader = ({ query }: { query: string }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterOptions = ['FilterOp1', 'FilterOp2', 'FilterOp3'];
  const _sortOptions = ['Relevance', 'Newest First', 'Oldest First'];

  const _toggleFilterDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsSortOpen(false);
  };

  const _toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen);
    setIsFilterOpen(false);
  };

  const isExactSearch = query.startsWith('"') && query.endsWith('"');
  const displayQuery = isExactSearch ? query.slice(1, -1) : query;

  return (
    <div className="flex justify-between relative pt-4">
      <div className="flex items-center gap-3">
        <h1 className="font-ibm-plex text-3xl bg-linear-to-br from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
          Results for "{displayQuery}"
        </h1>
        {isExactSearch && (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            Exact Match
          </span>
        )}
      </div>
      <div className="flex text-end gap-6 items-center">
        {/* Filter Button */}
        <div className="relative">
          {/* TODO: Implement Feature and Sort buttons - https://github.com/tinacms/tina.io/issues/2550 */}
          {/* <button
            className="flex items-center gap-1 text-sm"
            onClick={toggleFilterDropdown}
          >
            <MdFilterAlt size={16} /> FILTER
          </button> */}
          {isFilterOpen && (
            <div className="absolute right-0 top-full bg-white shadow-xl rounded-md p-2 px-4 transition ease-out duration-150 z-10 w-40">
              {filterOptions.map((option) => (
                <div
                  key={option}
                  className="py-2 text-left cursor-pointer font-normal"
                  onClick={() => {
                    setIsFilterOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* TODO: Implement Feature and Sort buttons - https://github.com/tinacms/tina.io/issues/2550 */}
        {/* Sort Button */}
        {/* <div className="relative">
          <button
            className="flex items-center gap-1 text-sm"
            onClick={toggleSortDropdown}
          >
            <MdSort size={16} /> SORT
          </button>
          {isSortOpen && (
            <div className="absolute right-0 top-full bg-white shadow-xl rounded-md p-2 px-4 transition ease-out duration-150 z-10 w-40">
              {sortOptions.map((option) => (
                <div
                  key={option}
                  className="py-2 cursor-pointer font-normal text-left"
                  onClick={() => {
                    
                    setIsSortOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export const SearchTabs = ({ query }: { query: string }) => {
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
    <div className="pt-6 w-full">
      <div className="max-w-(--breakpoint-xl) mx-auto pb-2">
        <div className="flex justify-between items-center">
          <nav className="relative flex gap-16 px-4">
            <span className="font-inter text-lg text-blue-800">
              BLOGS ({algoliaSearchResults?.blogs?.count})
            </span>
          </nav>

          {/* Search Results Count */}
          <div className="ml-auto text-end text-lg font-inter text-blue-800">
            {numberOfResults} Results
          </div>
        </div>
        {isLoading && (
          <div className="pt-10 text-2xl bg-linear-to-br from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent font-ibm-plex">
            Mustering all the Llamas...
          </div>
        )}
        <SearchBody results={algoliaSearchResults} />
        {numberOfResults === 0 && isLoading === false && (
          <div className="font-inter font-semibold text-gray-500 text-xl">
            No Results Found...
          </div>
        )}
      </div>
    </div>
  );
};

export const SearchBody = ({ results }: { results: any }) => {
  return (
    <div className="py-10">
      {results?.blogs?.results.map((item: any) => (
        <div key={item.objectID} className="py-4 px-4 border-b group">
          <Link href={`/blog/${item.slug}`}>
            <h2 className="text-xl font-inter font-semibold bg-linear-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:via-orange-400 group-hover:to-orange-600 break-words">
              {highlightText(item._highlightResult.title.value)}
            </h2>
            <p className="text-gray-600 group-hover:text-gray-800 text-sm font-normal line-clamp-3 break-words">
              {highlightText(item._highlightResult.excerpt?.value || '')}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};
