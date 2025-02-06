import { TinaClient } from 'app/tina-client';
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import { getDocsNav } from 'utils/docs/getDocProps';
import getTableOfContents from 'utils/docs/getTableOfContents';
import { getExcerpt } from 'utils/getExcerpt';
import DocsClient from './[...slug]/DocsPagesClient';

export async function generateMetadata() {
  try {
    const { data } = await client.queries.doc({ relativePath: `index.mdx` });
    const excerpt = getExcerpt(data.doc.body, 140);

    return {
      title: `${data.doc.seo?.title || data.doc.title} | TinaCMS Docs`,
      description: data.doc.seo?.description || `${excerpt} || TinaCMS Docs`,
      openGraph: {
        title: data.doc.title,
        description: data.doc.seo?.description || `${excerpt} || TinaCMS Docs`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return notFound();
  }
}

export default async function DocsPage() {
  const slug = 'index'; // Default root document slug for /docs

  try {
    const [results, navDocData] = await Promise.all([
      client.queries.doc({ relativePath: `${slug}.mdx` }),
      getDocsNav(),
    ]);

    const docData = results.data.doc;
    const PageTableOfContents = getTableOfContents(docData.body.children);

    return (
      <TinaClient
        Component={DocsClient}
        props={{
          query: results.query,
          variables: results.variables,
          data: results.data,
          PageTableOfContents,
          DocumentationData: docData,
          NavigationDocsData: navDocData,
        }}
      />
    );
  } catch (error) {
    notFound();
  }
}
