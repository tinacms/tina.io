'use client';

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import { formatTableofContentsData } from 'utils/docs/getDocProps';
import getTableOfContents from 'utils/docs/getTableOfContents';
import SearchPageClient from './search-client';

export async function generateMetadata() {
  return {
    title: 'Search Page | Tina',
    description: 'Swiftly Search through the TinaCMS Docs and Blogs',
  };
}

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

export default async function SearchPage() {
  const data = await getSearchPageData();

  
  return (
    <div>
      <Suspense fallback={null}>
        <SearchPageClient {...data} />
      </Suspense>
    </div>
  );
}
