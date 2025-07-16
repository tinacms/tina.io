import { Suspense } from 'react';
import SearchPageClient from './search-client';

export default function SearchPage() {
  return (
    <div>
      <Suspense fallback={null}>
        <SearchPageClient />
      </Suspense>
    </div>
  );
}
