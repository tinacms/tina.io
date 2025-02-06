import { glob } from 'fast-glob';
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import { getDocsNav } from 'utils/docs/getDocProps';
import getTableOfContents from 'utils/docs/getTableOfContents';
import DocsClient from './DocsPagesClient';
import { getExcerpt } from 'utils/getExcerpt';

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const contentDir = './content/docs/';
    const files = await glob(`${contentDir}**/*.mdx`);
    return files
      .filter((file) => !file.endsWith('index.mdx'))
      .map((file) => {
        const path = file.substring(contentDir.length, file.length - 4); // Remove "./content/docs/" and ".mdx"
        return { slug: path.split('/') };
      });
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join('/');
  try {
    const { data } = await client.queries.doc({ relativePath: `${slug}.mdx` });
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

export default async function DocPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join('/');

  try {
    const [results, navDocData] = await Promise.all([
      client.queries.doc({ relativePath: `${slug}.mdx` }),
      getDocsNav(),
    ]);

    const docData = results.data.doc;
    const PageTableOfContents = getTableOfContents(docData.body.children);

    const props = {
      query: results.query,
      variables: results.variables,
      data: results.data,
      PageTableOfContents,
      DocumentationData: docData,
      NavigationDocsData: navDocData,
    };

    return (
      <div>
        <DocsClient props={props} />
      </div>
    );
  } catch (error) {
    console.error('Found an error catching data:', error);
    return notFound();
  }
}
