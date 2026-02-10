import { Suspense } from 'react';
import { Metadata } from 'next';
import SearchPageClient from './search-client';

export const metadata: Metadata = {
  title: 'Search TinaCMS – Find Docs, Blog Posts & Resources',
  description:
    'Search the TinaCMS documentation, blog posts, and resources. Find guides, tutorials, and answers to your questions about the Git-backed headless CMS.',
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
