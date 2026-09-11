import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchPageClient from './search-client';

export const metadata: Metadata = {
  title: 'Search the TinaCMS Blog',
  description:
    'Search TinaCMS blog posts for guides, tutorials, release roundups and news about the Git-backed headless CMS.',
};

export default function SearchPage() {
  return (
    <div>
      <Suspense fallback={null}>
        <SearchPageClient />
      </Suspense>
    </div>
  );
}
