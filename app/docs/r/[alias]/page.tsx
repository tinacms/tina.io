import { glob } from 'fast-glob';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { notFound, redirect } from 'next/navigation';
import path from 'path';
import client from 'tina/__generated__/client';
import type { DocConnectionQuery } from 'tina/__generated__/types';

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const contentDir = './content/docs/';
    const files = await glob(`${contentDir}**/*.mdx`);
    const aliasParams = [];

    for (const file of files) {
      try {
        const absolutePath = path.resolve(file);
        const fileContent = readFileSync(absolutePath, 'utf8');
        const { data } = matter(fileContent);

        if (data.alias && typeof data.alias === 'string') {
          aliasParams.push({ alias: data.alias });
        }
      } catch (fileError) {
        console.warn(`Error reading file ${file}:`, fileError);
      }
    }

    console.log('Generated alias params using filesystem:', aliasParams);
    return aliasParams;
  } catch (error) {
    console.error('Error generating static params for alias routes:', error);
    return [];
  }
}

export default async function AliasRedirect({
  params,
}: {
  params: { alias: string };
}) {
  if (!params.alias || typeof params.alias !== 'string') {
    return notFound();
  }

  let finalDocument: DocConnectionQuery['docConnection']['edges'][number]['node'];
  try {
    const res = await client.queries.docConnection({
      filter: { alias: { eq: params.alias } },
    });

    if (!res?.data?.docConnection?.edges) {
      return notFound();
    }

    const edges = res.data.docConnection.edges;
    if (edges.length === 0) {
      return notFound();
    }

    finalDocument = edges[0].node;

    if (!finalDocument?._sys?.relativePath) {
      return notFound();
    }
  } catch (error) {
    console.error('Error fetching alias', error);
    return notFound();
  }

  const slug = finalDocument._sys.relativePath.slice(0, -4);

  if (!slug) {
    return notFound();
  }

  return redirect(`/docs/${slug}`);
}
