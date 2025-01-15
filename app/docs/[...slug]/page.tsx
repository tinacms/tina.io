import { TinaClient } from 'app/tina-client';
import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { glob } from 'fast-glob';
import { NextSeo } from 'next-seo';
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { getDocsNav } from 'utils/docs/getDocProps';
import getTableOfContents from 'utils/docs/getTableOfContents';
import DocsClient from './DocsPagesClient';

export async function generateStaticParams() {
  const contentDir = './content/docs/';
  const files = await glob(`${contentDir}**/*.mdx`);

  return files
    .filter((file) => !file.endsWith('index.mdx'))
    .map((file) => {
      const path = file.substring(contentDir.length, file.length - 4); // Remove "./content/docs/" and ".mdx"
      return { slug: path.split('/') };
    });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join('/');
  const { data } = await client.queries.doc({ relativePath: `${slug}.mdx` });

  return {
    title: `${data.doc.seo?.title || data.doc.title}  |  🦙 TinaCMS Docs`,
    description: data.doc.seo?.description || '',
    openGraph: {
      title: data.doc.title,
      description: data.doc.seo?.description,
    },
  };
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
