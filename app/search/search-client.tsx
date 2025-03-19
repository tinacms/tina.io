'use client';

import { useDocsNavigation } from 'components/AppRouterMigrationComponents/Docs/DocsNavigationContext';
import {
  SearchHeader,
  SearchTabs,
} from 'components/AppRouterMigrationComponents/Docs/docsSearch/SearchComponent';
import {
  DocsSearchBarHeader,
  LeftHandSideParentContainer,
} from 'components/AppRouterMigrationComponents/Docs/docsSearch/SearchNavigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSearchPageData } from './getSearchPageData';
export default function SearchPageClient() {
  const [props, setProps] = useState<{
    formatted?: any;
    formattedLearn?: any;
  }>({});
  const [query, setQuery] = useState('');
  const { learnActive, setLearnActive } = useDocsNavigation();

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      const data = await getSearchPageData();
      setProps(data.props);
    }
    fetchData();
  }, []);

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
          <LeftHandSideParentContainer
            tableOfContents={props?.formatted?.data}
            tableOfContentsLearn={props?.formattedLearn?.data}
            learnActive={learnActive}
            setLearnActive={setLearnActive}
          />
        </div>
        <div className="mx-16 lg:mx-0">
          <div className="block lg:hidden">
            <DocsSearchBarHeader
              paddingGlobal={undefined}
              headerColour="orange"
              headerPadding=""
              searchMargin="mb-6"
              searchBarPadding=""
              setLearnActive={setLearnActive}
              learnActive={learnActive}
            />
          </div>
          <SearchHeader query={query} />
          <SearchTabs query={query} />
        </div>
      </div>
    </div>
  );
}
