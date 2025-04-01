import { glob } from 'fast-glob';
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import { getDocsNav, getLearnNav } from 'utils/docs/getDocProps';
import getTableOfContents from 'utils/docs/getTableOfContents';
import { getExcerpt } from 'utils/getExcerpt';
import DocsClient from './DocsPagesClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const contentDir = './content/docs-zh/';
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
    const { data } = await client.queries.docZh({
      relativePath: `${slug}.mdx`,
    });
    const excerpt = getExcerpt(data.docZh.body, 140);

    return {
      title: `${data.docZh.seo?.title || data.docZh.title} | TinaCMS Docs`,
      description: data.docZh.seo?.description || `${excerpt} || TinaCMS Docs`,
      openGraph: {
        title: data.docZh.title,
        description:
          data.docZh.seo?.description || `${excerpt} || TinaCMS Docs`,
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
    const [results, navDocData, navLearnData] = await Promise.all([
      client.queries.docZh({ relativePath: `${slug}.mdx` }),
      getDocsNav(),
      getLearnNav(),
    ]);

    const docData = results.data.docZh;
    const PageTableOfContents = getTableOfContents(docData.body.children);

    const props = {
      query: results.query,
      variables: results.variables,
      data: results.data,
      PageTableOfContents,
      DocumentationData: docData,
      NavigationDocsData: navDocData,
      NavigationLearnData: navLearnData,
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
