import { notFound, redirect } from 'next/navigation';
import client from 'tina/__generated__/client';
import type { DocConnectionQuery } from 'tina/__generated__/types';

export default async function AliasRedirect({
  params,
}: {
  params: { alias: string };
}) {
  // Validate alias parameter
  if (!params.alias || typeof params.alias !== 'string') {
    return notFound();
  }

  let finalDocument: DocConnectionQuery['docConnection']['edges'][number]['node'];
  try {
    const res = await client.queries.docConnection({
      filter: { alias: { eq: params.alias } },
    });

    // Ensure we have valid response data
    if (!res?.data?.docConnection?.edges) {
      return notFound();
    }

    const edges = res.data.docConnection.edges;
    if (edges.length === 0) {
      return notFound();
    }
    
    finalDocument = edges[0].node;
    
    // Validate the document has required fields
    if (!finalDocument?._sys?.relativePath) {
      return notFound();
    }
  } catch (error) {
    console.error('Error fetching alias', error);
    return notFound();
  }
  
  const slug = finalDocument._sys.relativePath.slice(0, -4);
  
  // Validate slug before redirecting
  if (!slug) {
    return notFound();
  }
  
  return redirect(`/docs/${slug}`);
}
