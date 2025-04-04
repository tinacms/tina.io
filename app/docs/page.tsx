import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import getTableOfContents from 'utils/docs/getTableOfContents';
import { generateMetadata as generateMetadataDocs } from './[...slug]/page';
import MainDocClient from './doc-client';

export async function generateMetadata() {
  return generateMetadataDocs({ params: { slug: ['index'] } });
}

export default async function DocsPage() {
  const slug = 'index'; // Default root document slug for /docs

  try {
    const results = await client.queries.doc({ relativePath: `${slug}.mdx` });
    const docData = results.data.doc;
    const PageTableOfContents = getTableOfContents(docData.body.children);

    return (
      <MainDocClient
        props={{
          query: results.query,
          variables: results.variables,
          data: results.data,
          PageTableOfContents,
          DocumentationData: docData,
        }}
      />
    );
  } catch (error) {
    notFound();
  }
}
