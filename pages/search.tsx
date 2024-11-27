import { GetStaticProps } from 'next';
import client from 'tina/__generated__/client';
import getTableOfContents from 'utils/docs/getTableOfContents';
import { Layout } from 'components/layout';
import { useRouter } from 'next/router';

import { MdSort } from 'react-icons/md';
import { MdFilterAlt } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { fetchAlgoliaSearchResults } from 'utils/new-search';
import Link from 'next/link';

const SearchHeader = ({ query }: { query: string }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterOptions = ['FilterOp1', 'FilterOp2', 'FilterOp3'];
  const sortOptions = ['Relevance', 'Newest First', 'Oldest First'];

  const toggleFilterDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsSortOpen(false);
  };

  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex justify-between relative">
      <div className="font-tuner text-3xl bg-gradient-to-br from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
        Results for "{query}"
      </div>
      <div className="flex text-end gap-6 items-center">
        {/* Filter Button */}
        <div className="relative">
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
                  className="py-2 text-left cursor-pointer font-light"
                  onClick={() => {
                    console.log(`Selected: ${option}`);
                    setIsFilterOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sort Button */}
        <div className="relative">
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
                  className="py-2 cursor-pointer font-light text-left"
                  onClick={() => {
                    console.log(`Selected: ${option}`);
                    setIsSortOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchSlider = ({ query }: { query: string }) => {
  const [activeTab, setActiveTab] = useState('DOCS');
  const [algoliaSearchResults, setAlgoliaSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      if (query) {
        const results = await fetchAlgoliaSearchResults(query);
        setAlgoliaSearchResults(results);
        console.log('Search Results:', algoliaSearchResults?.docs);
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

  return (
    <div className="pt-6 w-full border-b">
      <div className="max-w-screen-xl mx-auto pb-2">
        <div className="flex justify-between items-center">
          {/* Navigation Buttons */}
          <nav className="relative flex gap-16 px-4">
            <button
              ref={(el) => (tabRefs.current[0] = el)}
              className={`font-inter text-lg ${
                activeTab === 'DOCS' ? 'text-blue-800' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('DOCS')}
            >
              DOCS ({algoliaSearchResults?.docs?.count})
            </button>
            <button
              ref={(el) => (tabRefs.current[1] = el)}
              className={`font-inter text-lg ${
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

          {/* Search Results Count */}
          <div className="ml-auto text-end text-lg font-inter text-blue-800">
            {algoliaSearchResults?.docs?.count +
              algoliaSearchResults?.blogs?.count}{' '}
            Results
          </div>
        </div>
        {isLoading && <div className='pt-10 text-2xl bg-gradient-to-br from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent font-tuner'>Loading...</div>}
        <SearchBody results={algoliaSearchResults} activeItem={activeTab} />
      </div>
    </div>
  );
};

const SearchBody = ({ results, activeItem }: { results: any; activeItem: string }) => {
  const bodyItem = activeItem === 'DOCS' ? results?.docs : results?.blogs;
  return (
    <div className="py-10">
      {bodyItem?.results.map((item: any) => (
        <div key={item.objectID} className="py-4 px-4 border-b group">
          <Link href={`/${activeItem.toLowerCase()}/${item.slug}`}>
            <h2 className="text-xl font-inter font-semibold bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:via-orange-400 group-hover:to-orange-600 break-words">
              {item.title}
            </h2>
            <p className="text-gray-600 group-hover:text-gray-800 text-sm font-light line-clamp-3 break-words">
              {item.excerpt}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};


const DocsPage = ({ TableOfContents }: { TableOfContents: any }) => {
  const router = useRouter();
  const searchQuery = router.query.query as string;

  return (
    <Layout>
      <div className="relative my-16">
        <div className="lg:px-16 w-full grid grid-cols-[1fr_3fr] gap-24">
          <div className="bg-red-500/10"></div>
          <div className="">
            <SearchHeader query={searchQuery} />
            <SearchSlider query={searchQuery} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocsPage;

export const getStaticProps: GetStaticProps = async function () {
  try {
    const slug = 'index';
    const results = await client.queries.doc({ relativePath: `${slug}.mdx` });
    const doc_data = results.data.doc;
    const TableOfContents = getTableOfContents(doc_data.body.children);

    return {
      props: {
        TableOfContents,
      },
    };
  } catch (e) {
    console.error('Error fetching Table of Contents:', e);
    return {
      props: {
        TableOfContents: null,
      },
    };
  }
};
