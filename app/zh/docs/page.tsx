import MainDocClient from 'components/Docs/MainDocClient';
import { notFound } from 'next/navigation';
import { generateDocsMetadata } from 'utils/docs/generateDocsMetadata';
import { getDocsDocument } from 'utils/docs/getDocsDocument';
import getTableOfContents from 'utils/docs/getTableOfContents';

export function generateMetadata() {
  return generateDocsMetadata('zh', 'index');
}

export default async function DocsPage() {
  try {
    const { document, data, query, variables } = await getDocsDocument(
      'zh',
      'index',
    );
    const PageTableOfContents = getTableOfContents(document.body.children);
    return (
      <MainDocClient
        props={{
          query,
          variables,
          data,
          PageTableOfContents,
          DocumentationData: document,
        }}
        locale="zh"
      />
    );
  } catch (_error) {
    notFound();
  }
}
