import DocsClient from 'components/Docs/DocsClient';
import { notFound } from 'next/navigation';
import { generateDocsMetadata } from 'utils/docs/generateDocsMetadata';
import { generateDocsStaticParams } from 'utils/docs/generateDocsStaticParams';
import { getDocsDocument } from 'utils/docs/getDocsDocument';
import getTableOfContents from 'utils/docs/getTableOfContents';

export const dynamicParams = false;

export function generateStaticParams() {
  return generateDocsStaticParams('en');
}

export function generateMetadata({ params }: { params: { slug: string[] } }) {
  return generateDocsMetadata('en', params.slug.join('/'));
}

export default async function DocPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join('/');
  try {
    const { document, data, query, variables } = await getDocsDocument(
      'en',
      slug,
    );
    const PageTableOfContents = getTableOfContents(document.body.children);
    const props = {
      query,
      variables,
      data,
      PageTableOfContents,
      DocumentationData: document,
    };
    return <DocsClient props={props} locale="en" />;
  } catch (error) {
    console.error('Found an error catching data:', error);
    return notFound();
  }
}
