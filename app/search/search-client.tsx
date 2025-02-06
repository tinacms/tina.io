'use client';

import {
  SearchHeader,
  SearchTabs,
} from 'components/AppRouterMigrationComponents/Docs/docsSearch/SearchComponent';
import {
  DocsSearchBarHeader,
  LeftHandSideParentContainer,
} from 'components/AppRouterMigrationComponents/Docs/docsSearch/SearchNavigation';
import { notFound, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import client from 'tina/__generated__/client';
import { formatTableofContentsData } from 'utils/docs/getDocProps';
import getTableOfContents from 'utils/docs/getTableOfContents';

async function getSearchPageData() {
  const slug = 'index';
  let tableOfContents, formatted;

  try {
    const results = await client.queries.doc({ relativePath: `${slug}.mdx` });
    const documentData = results.data.doc;
    tableOfContents = getTableOfContents(documentData.body.children);
  } catch (e) {
    console.error('Error Fetching Docs Navigation Data: ', e.message);
    notFound();
  }

  try {
    const query = `
      query {
        docsTableOfContents(relativePath: "docs-toc.json") {
          _values
        }
      }
    `;
    const docTocData = await client.request(
      {
        query,
        variables: { relativePath: 'docs-toc.json' },
      },
      {}
    );
    formatted = formatTableofContentsData(docTocData, null);
  } catch (e) {
    console.error('Error fetching Docs Table of Content Data: ', e.message);
  }

  return {
    props: {
      tableOfContents,
      formatted,
    },
  };
}

export function SearchPageInnerContent({ props }) {
  const [query, setQuery] = useState('');

  const searchParams = useSearchParams();

  useEffect(() => {
    const param = searchParams.get('query');
    if (param) {
      setQuery(param);
    }
  }, [searchParams]);

  return (
    <div className="relative my-16 flex justify-center items-center">
      <div className="lg:px-16 w-full max-w-[2000px] lg:grid grid-cols-[1fr_3fr] gap-16">
        <div className="hidden lg:block sticky top-32 h-[calc(100vh)]">
          <LeftHandSideParentContainer tableOfContents={props.formatted.data} />
        </div>
        <div className="mx-16 lg:mx-0">
          <div className="block lg:hidden">
            <DocsSearchBarHeader
              paddingGlobal={undefined}
              headerColour="orange"
              headerPadding=""
              searchMargin="mb-6"
              searchBarPadding=""
            />
          </div>
          <SearchHeader query={query} />
          <SearchTabs query={query} />
        </div>
      </div>
    </div>
  );
}

export default function SearchPageClient() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSearchPageData().then((data) => setData(data));
  }, []);

  return (
    <div>
      <Suspense fallback={null}>
        <SearchPageInnerContent {...data} />
      </Suspense>
    </div>
  );
}
