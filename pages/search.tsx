import { GetStaticProps } from 'next';
import client from 'tina/__generated__/client';
import getTableOfContents from 'utils/docs/getTableOfContents';
import { Layout } from 'components/layout';
import { useRouter } from 'next/router';
import { formatTableofContentsData } from 'utils/docs/getDocProps';

import {
  SearchHeader,
  SearchTabs,
} from 'components/docsSearch/SearchComponent';
import { LeftHandSideParentContainer } from 'components/docsSearch/SearchNavigation';

const DocsSearchPage = ({
  tableOfContents,
  formatted,
}: {
  tableOfContents: any;
  formatted: any;
}) => {
  const router = useRouter();
  const searchQuery = router.query.query as string;

  return (
    <Layout>
      <div className="relative my-16 flex justify-center items-center">
        <div className="lg:px-16 w-full max-w-[2000px] lg:grid grid-cols-[1fr_3fr] gap-16">
          <div className="hidden lg:block sticky top-32 h-[calc(100vh)]">
            <LeftHandSideParentContainer tableOfContents={formatted.data} />
          </div>
          <div className="mx-16 lg:mx-0">
            <SearchHeader query={searchQuery} />
            <SearchTabs query={searchQuery} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocsSearchPage;

export const getStaticProps: GetStaticProps = async function () {
  try {
    const slug = 'index';
    const results = await client.queries.doc({ relativePath: `${slug}.mdx` });
    const doc_data = results.data.doc;
    const query = `
      query {
          docsTableOfContents(relativePath: "docs-toc.json") {
            _values
        }
      }
      `;
    const tableOfContents = getTableOfContents(doc_data.body.children);
    const docTocData = await client.request(
      {
        query,
        variables: { relativePath: 'docs-toc.json' },
      },
      {}
    );
    const formatted = formatTableofContentsData(docTocData, null);

    return {
      props: {
        tableOfContents,
        formatted,
      },
    };
  } catch (e) {
    console.error('Error fetching Table of Contents or Docs Navigation:', e);
    return {
      props: {
        tableOfContents: null,
        docsNavigation: null,
      },
    };
  }
};
