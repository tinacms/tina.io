import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import { glob } from 'fast-glob';
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import getTableOfContents from 'utils/docs/getTableOfContents';
import { getExcerpt } from 'utils/getExcerpt';
import DocsClient from './docs-client';
export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const contentDir = './content/docs-zh/';
    const files = await glob(`${contentDir}**/*.mdx`);
    return files.map((file) => {
      const path = file.substring(contentDir.length, file.length - 4);
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
  const { data } = await client.queries.docZh({
    relativePath: `${slug}.mdx`,
  });
  const excerpt = getExcerpt(data.docZh.body, 140);
  return getSeo({
    title: `${data.docZh.seo?.title || data.docZh.title} | TinaCMS Docs`,
    description: data.docZh.seo?.description || `${excerpt} || TinaCMS Docs`,
    canonicalUrl: `${settings.siteUrl}/zh/docs ${
      slug === 'index' ? '' : `/${slug}`
    }`,
  });
}

export default async function DocPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join('/');

  try {
    // Only fetch page data - navigation data is provided by layout
    const results = await client.queries.docZh({ relativePath: `${slug}.mdx` });

    const docData = results.data.docZh;
    const PageTableOfContents = getTableOfContents(docData.body.children);

    const props = {
      query: results.query,
      variables: results.variables,
      data: results.data,
      PageTableOfContents,
      DocumentationData: docData,
    };

    // Use DocsClient directly - navigation data will be accessed via context in the component
    return <DocsClient props={props} />;
  } catch (error) {
    console.error('Found an error catching data:', error);
    return notFound();
  }
}
