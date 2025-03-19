import { TinaClient } from 'app/tina-client';
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import { getDocsNav, getLearnNav } from 'utils/docs/getDocProps';
import getTableOfContents from 'utils/docs/getTableOfContents';
import DocsClient from './[...slug]/DocsPagesClient';
import { generateMetadata as generateMetadataDocs } from './[...slug]/page';

export async function generateMetadata() {
  return generateMetadataDocs({ params: { slug: ['index'] } });
}

export default async function DocsPage() {
  const slug = 'index'; // Default root document slug for /docs

  try {
    const [results, navDocData, navLearnData] = await Promise.all([
      client.queries.doc({ relativePath: `${slug}.mdx` }),
      getDocsNav(),
      getLearnNav(),
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
          NavigationLearnData: navLearnData,
        }}
      />
    );
  } catch (error) {
    notFound();
  }
}
