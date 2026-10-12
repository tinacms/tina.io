'use client';

import { SearchBar } from 'components/search/SearchModal';
import { SearchHeader, SearchTabs } from 'components/search/SearchResults';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPageClient() {
  const [query, setQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const param = searchParams.get('query');
    if (param) {
      setQuery(param);
    }
  }, [searchParams]);

  return (
    <div className="relative my-16 flex justify-center">
      <div className="w-full max-w-(--breakpoint-xl) px-8 lg:px-16">
        <SearchBar className="max-w-md mb-6" />
        <SearchHeader query={query} />
        <SearchTabs query={query} />
      </div>
    </div>
  );
}
