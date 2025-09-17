import { notFound, redirect } from 'next/navigation';
import client from 'tina/__generated__/client';
import type { DocConnectionQuery } from 'tina/__generated__/types';

export default async function AliasRedirect({
  params,
}: {
  params: { alias: string };
}) {
  console.log('The Params Are', params);
  
  let finalDocument: DocConnectionQuery['docConnection']['edges'][number]['node'];
  try {
    const res = await client.queries.docConnection({
      filter: { alias: { eq: params.alias } },
    });

    const edges = res.data.docConnection.edges;
    if (edges.length === 0) {
      return notFound();
    }
    finalDocument = edges[0].node;
  } catch (error) {
    console.error('Error fetching alias', error);
    return notFound();
  }
  const slug = finalDocument._sys.relativePath.slice(0, -4);
  return redirect(`/docs/${slug}`);
}
