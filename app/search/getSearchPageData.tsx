import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import { formatTableofContentsData } from 'utils/docs/getDocProps';
import getTableOfContents from 'utils/docs/getTableOfContents';

export async function getSearchPageData() {
  const slug = 'index';
  let tableOfContents, formatted, formattedLearn;

  try {
    const results = await client.queries.doc({ relativePath: `${slug}.mdx` });
    const documentData = results.data.doc;
    tableOfContents = getTableOfContents(documentData.body.children);
  } catch (e) {
    console.error('Error Fetching Docs Navigation Data: ', e.message);
    notFound();
  }

  try {
    const query = `
      query {
        docsTableOfContents(relativePath: "docs-toc.json") {
          _values
        }
      }
    `;
    const docTocData = await client.request(
      {
        query,
        variables: { relativePath: 'docs-toc.json' },
      },
      {},
    );
    formatted = formatTableofContentsData(docTocData, null);
  } catch (e) {
    console.error('Error fetching Docs Table of Content Data: ', e.message);
  }

  try {
    const query = `
      query {
        docsTableOfContents(relativePath: "learn-toc.json") {
          _values
        }
      }
    `;
    const learnTocData = await client.request(
      {
        query,
        variables: { relativePath: 'learn-toc.json' },
      },
      {},
    );
    formattedLearn = formatTableofContentsData(learnTocData, null);
  } catch (e) {
    console.error('Error fetching Learn Table of Content Data: ', e.message);
  }

  return {
    props: {
      tableOfContents,
      formatted,
      formattedLearn,
    },
  };
}
