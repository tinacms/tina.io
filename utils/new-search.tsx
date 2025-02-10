import algoliasearch from 'algoliasearch';

const DEFAULT_ALGOLIA_APP_ID = '80HKRA52OJ';
const DEFAULT_ALGOLIA_SEARCH_KEY = 'f13c10ad814c92b85f380deadc2db2dc';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || DEFAULT_ALGOLIA_APP_ID,
  (process.env.GATSBY_ALGOLIA_SEARCH_KEY ||
    DEFAULT_ALGOLIA_SEARCH_KEY) as string
);

interface SearchResults {
  docs: { results: any[]; count: number };
  blogs: { results: any[]; count: number };
}

export const fetchAlgoliaSearchResults = async (
  query: string
): Promise<SearchResults> => {
  try {
    console.log('Raw query:', query);
    const searchParams = {
      hitsPerPage: 50,
      attributesToHighlight: ['title', 'excerpt'],
      advancedSyntax: true,
    };

    const [docsResults, blogsResults] = await Promise.all([
      searchClient.initIndex('Tina-Docs-Next').search(query, searchParams),
      searchClient.initIndex('Tina-Blogs-Next').search(query, searchParams),
    ]);

    return {
      docs: { results: docsResults.hits, count: docsResults.nbHits },
      blogs: { results: blogsResults.hits, count: blogsResults.nbHits },
    };
  } catch (error) {
    console.error('Error fetching Algolia search results:', error);
    return {
      docs: { results: [], count: 0 },
      blogs: { results: [], count: 0 },
    };
  }
};
