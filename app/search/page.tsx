import SearchPageClient from './search-client';

export async function generateMetadata() {
  return {
    title: 'Search | TinaCMS',
    description: 'Search for documentation and examples on TinaCMS',
  };
}

export default async function SearchPage() {
  return (
    <div>
      <SearchPageClient />
    </div>
  );
}
