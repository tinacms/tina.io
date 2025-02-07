import { TinaClient } from 'app/tina-client';
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import { ExamplesPageClient } from './examples-client';

export async function generateMetadata() {
  return {
    title: 'Examples | TinaCMS',
    description:
      'Open-Source Examples of TinaCMS with your Favourite Frameworks',
  };
}

async function getExamplesPageData() {
  try {
    const examples = await client.queries.examples({
      relativePath: 'index.json',
    });

    return {
      query: examples.query,
      variables: examples.variables,
      data: examples.data,
    };
  } catch (e) {
    console.error('Error Fetching Examples Data: ', e.message);
    notFound();
  }
}

export default async function ExamplesPage() {
  const examplesData = await getExamplesPageData();

  if (!examplesData) {
    notFound();
  }

  return (
    <TinaClient
      Component={ExamplesPageClient}
      props={{
        query: examplesData.query,
        variables: examplesData.variables,
        data: examplesData.data,
      }}
    />
  );
}