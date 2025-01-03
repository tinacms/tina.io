import { Breadcrumbs } from 'components/DocumentationNavigation/Breadcrumbs';
import MainDocsBodyHeader from 'components/docsMain/docsMainBody';
import TocOverflowButton from 'components/docsMain/tocOverflowButton';
import { LeftHandSideParentContainer } from 'components/docsSearch/SearchNavigation';
import { DocsLayout, Layout, MarkdownContent } from 'components/layout';
import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import ToC from 'components/toc/index';
import { DocsPagination, LastEdited, NavToggle } from 'components/ui';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { format } from 'path';
import { doc } from 'prettier';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import client from 'tina/__generated__/client';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { getDocsNav } from 'utils/docs/getDocProps';
import { getSeoDescription } from 'utils/docs/getSeoDescription';
import getTableOfContents from 'utils/docs/getTableOfContents';
import { NotFoundError } from 'utils/error/NotFoundError';
import { openGraphImage } from 'utils/open-graph-image';
import { useTocListener } from 'utils/toc_helpers';
import * as ga from '../../utils/ga';

export function DocTemplate(props) {
  return <_DocTemplate {...props} />;
}

function screenResizer() {
  const [isScreenSmallerThan1200, setIsScreenSmallerThan1200] = useState(false);
  const [isScreenSmallerThan840, setIsScreenSmallerThan840] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsScreenSmallerThan1200(window.innerWidth < 1200);
      setIsScreenSmallerThan840(window.innerWidth < 840);
    };

    updateScreenSize();

    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return { isScreenSmallerThan1200, isScreenSmallerThan840 };
}

function _DocTemplate(props) {
  // fallback workaround
  if (props.notFound) {
    return <Error statusCode={404} />;
  }

  const { data } = useTina({
    query: props.new?.results.query,
    data: props.new?.results.data,
    variables: props.new?.results.variables,
  });

  const router = useRouter();

  const doc_data = data.doc;
  const previousPage = {
    slug: doc_data.previous?.id.slice(7, -4),
    title: doc_data.previous?.title,
  };
  const nextPage = {
    slug: doc_data.next?.id.slice(7, -4),
    title: doc_data.next?.title,
  };
  const TableOfContents = getTableOfContents(doc_data.body.children);
  const description =
    doc_data.seo?.description?.trim() || getSeoDescription(doc_data.body);
  const title = doc_data.seo?.title || doc_data.title;
  const { activeIds, contentRef } = useTocListener(doc_data);
  const lastEdited = props.new.results.data.doc.last_edited;
  const date = lastEdited === null ? null : new Date(lastEdited);
  const formattedDate = date
    ? date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const isScreenSmallerThan1200 = screenResizer().isScreenSmallerThan1200;
  const isScreenSmallerThan840 = screenResizer().isScreenSmallerThan840;
  const gridClass = isScreenSmallerThan840
    ? 'grid-cols-1'
    : isScreenSmallerThan1200
    ? 'grid-cols-[1.25fr_3fr]'
    : 'grid-cols-[1.25fr_3fr_0.75fr]';

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={'%s | TinaCMS Docs'}
        description={description}
        openGraph={{
          title: title,
          description: description,
          images: [openGraphImage(doc_data.title, '| TinaCMS Docs')],
        }}
      />
      <Layout>
        <div className="relative my-6 lg:my-16 flex justify-center items-center">
          <div
            className={`lg:px-16 px-3 w-full max-w-[2000px] grid ${gridClass}`}
          >
            {/* LEFT COLUMN */}
            <div
              className={`block sticky top-32 h-[calc(100vh)] ${
                isScreenSmallerThan840 ? 'hidden' : 'block'
              }`}
            >
              <LeftHandSideParentContainer
                tableOfContents={props.navDocData.data}
              />
            </div>
            {/* MIDDLE COLUMN */}
            <div className="mx-8 max-w-full overflow-hidden break-words px-2">
              <MainDocsBodyHeader
                data={props}
                screenSizing={isScreenSmallerThan840}
              />
              {isScreenSmallerThan1200 && (
                <TocOverflowButton tocData={TableOfContents} />
              )}
              <div ref={contentRef}>
                <TinaMarkdown
                  content={doc_data.body}
                  components={docAndBlogComponents}
                />

                {formattedDate && (
                  <span className="text-slate-500 text-md">
                    {' '}
                    Last Edited: {formattedDate}
                  </span>
                )}

                <DocsPagination prevPage={previousPage} nextPage={nextPage} />
              </div>
            </div>
            {/* RIGHT COLUMN */}
            <div
              className={`pt-28 ${
                isScreenSmallerThan1200 ? 'hidden' : 'block'
              }`}
            >
              <ToC tocItems={TableOfContents} activeIds={activeIds} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default DocTemplate;

/*
 * DATA FETCHING ------------------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function (props) {
  let { slug: slugs } = props.params;

  // @ts-ignore This should maybe always be a string[]?
  const slug = slugs.join('/');

  try {
    const [results, navDocData] = await Promise.all([
      client.queries.doc({ relativePath: `${slug}.mdx` }),
      getDocsNav(),
    ]);
    return {
      props: {
        new: { results },
        navDocData,
      },
    };
  } catch (e) {
    if (e) {
      return {
        props: {
          error: { ...e }, //workaround since we cant return error as JSON
        },
      };
    } else if (e instanceof NotFoundError) {
      return {
        props: {
          notFound: true,
        },
      };
    }
  }
};

export const getStaticPaths: GetStaticPaths = async function () {
  const fg = require('fast-glob');
  const contentDir = './content/docs/';
  const files = await fg(`${contentDir}**/*.mdx`);
  return {
    fallback: false,
    paths: files
      .filter(
        (file) =>
          !file.endsWith('index.mdx') && !file.endsWith('product-tour.mdx')
      )
      .map((file) => {
        const path = file.substring(contentDir.length, file.length - 4);
        return { params: { slug: path.split('/') } };
      }),
  };
};

/*
 * STYLES --------------------------------------------------------------
 */

export const DocsGrid = styled.div`
  display: block;
  width: 100%;
  position: relative;
  padding: 1rem 2rem 3rem 2rem;
  max-width: 768px;
  margin: 0 auto;

  @media (min-width: 500px) {
    padding: 1rem 3rem 4rem 3rem;
  }

  @media (min-width: 1200px) {
    display: grid;
    max-width: none;
    padding: 2rem 0rem 4rem 0rem;
    grid-template-areas:
      '. header header .'
      '. content toc .';
    grid-auto-columns: minmax(0, auto) minmax(300px, 800px)
      clamp(17.5rem, 10rem + 10vw, 21.25rem) minmax(0, auto);
    grid-column-gap: 5rem;
    justify-content: left;
  }
`;

export const DocGridHeader = styled.div`
  grid-area: header;
  width: 100%;
`;

export const DocGridToc = styled.div`
  grid-area: toc;
  width: 100%;

  @media (min-width: 1200px) {
    padding-top: 4.5rem;
  }
`;

interface ContentProps {
  ref: any;
}

export const DocGridContent = styled.div<ContentProps>`
  grid-area: content;
  width: 100%;
`;

export const DocsPageTitle = styled.h1`
  font-size: 2rem;
  line-height: 1.2 !important;
  letter-spacing: 0.1px;
  color: var(--color-orange);
  position: relative;
  font-family: var(--font-tuner);
  font-style: normal;

  margin: 0 0 0 0 !important;

  @media (max-width: 1199px) {
    margin: 0 0 1.25rem 0 !important;
  }
`;

export const DocsNavToggle = styled(NavToggle)`
  position: fixed;
  margin-top: 1.25rem;
  left: 1rem;
  z-index: 500;

  @media (min-width: 999px) {
    display: none;
  }
`;
