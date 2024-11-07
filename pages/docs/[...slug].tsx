import { Breadcrumbs } from 'components/DocumentationNavigation/Breadcrumbs'
import { DocsLayout, MarkdownContent } from 'components/layout'
import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents'
import ToC from 'components/toc/index'
import { DocsPagination, LastEdited, NavToggle } from 'components/ui'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { doc } from 'prettier'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import client from 'tina/__generated__/client'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { getDocsNav } from 'utils/docs/getDocProps'
import { getSeoDescription } from 'utils/docs/getSeoDescription'
import getTableOfContents from 'utils/docs/getTableOfContents'
import { NotFoundError } from 'utils/error/NotFoundError'
import { openGraphImage } from 'utils/open-graph-image'
import { useTocListener } from 'utils/toc_helpers'
import SetupOverview from '../../components/layout/setup-overview'
import * as ga from '../../utils/ga'

export function DocTemplate(props) {
  if (props.new.results.data.doc._sys.filename.includes('setup-overview')) {
    return <SetupOverview {...props} />
  }
  return <_DocTemplate {...props} />
}

function _DocTemplate(props) {

  // fallback workaround
  if (props.notFound) {
    return <Error statusCode={404} />
  }

  const { data } = useTina({
    query: props.new?.results.query,
    data: props.new?.results.data,
    variables: props.new?.results.variables,
  })

  const router = useRouter()
  const doc_data = data.doc
  const previousPage = {
    slug: doc_data.previous?.id.slice(7, -4),
    title: doc_data.previous?.title,
  }
  const nextPage = {
    slug: doc_data.next?.id.slice(7, -4),
    title: doc_data.next?.title,
  }
  const TableOfContents = getTableOfContents(doc_data.body.children)
  const description = doc_data.seo?.description?.trim() || getSeoDescription(doc_data.body);
  const title = doc_data.seo?.title || doc_data.title;

  const { activeIds, contentRef } = useTocListener(doc_data)

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])


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
      <DocsLayout navItems={props.navDocData.data}>
        <DocsGrid>
          <DocGridHeader>
            <Breadcrumbs navItems={props.navDocData.data} />
            <DocsPageTitle>{doc_data.title}</DocsPageTitle>
          </DocGridHeader>
          <DocGridToc>
            <ToC tocItems={TableOfContents} activeIds={activeIds} />
          </DocGridToc>
          <DocGridContent ref={contentRef}>
            <hr />
            <TinaMarkdown content={doc_data.body} components={docAndBlogComponents} />
            <LastEdited date={doc_data.last_edited} />
            <DocsPagination prevPage={previousPage} nextPage={nextPage} />
          </DocGridContent>
        </DocsGrid>
      </DocsLayout>
    </>
  )
}

export default DocTemplate

/*
 * DATA FETCHING ------------------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function (props) {
  let { slug: slugs } = props.params

  // @ts-ignore This should maybe always be a string[]?
  const slug = slugs.join('/')

  try {
    const [results, navDocData] = await Promise.all([
      client.queries.doc({ relativePath: `${slug}.mdx` }),
      getDocsNav() 
    ])
    return {
      props: {
        new: { results },
        navDocData,
      },
    }
  } catch (e) {
    if (e) {
      return {
        props: {
          error: { ...e }, //workaround since we cant return error as JSON
        },
      }
    } else if (e instanceof NotFoundError) {
      return {
        props: {
          notFound: true,
        },
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async function () {
  const fg = require('fast-glob')
  const contentDir = './content/docs/'
  const files = await fg(`${contentDir}**/*.mdx`)
  return {
    fallback: false,
    paths: files
      .filter(
        (file) =>
          !file.endsWith('index.mdx') && !file.endsWith('product-tour.mdx')
      )
      .map((file) => {
        const path = file.substring(contentDir.length, file.length - 4)
        return { params: { slug: path.split('/') } }
      }),
  }
}

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
`

export const DocGridHeader = styled.div`
  grid-area: header;
  width: 100%;
`

export const DocGridToc = styled.div`
  grid-area: toc;
  width: 100%;

  @media (min-width: 1200px) {
    padding-top: 4.5rem;
  }
`

interface ContentProps {
  ref: any
}

export const DocGridContent = styled.div<ContentProps>`
  grid-area: content;
  width: 100%;
`

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
`

export const DocsNavToggle = styled(NavToggle)`
  position: fixed;
  margin-top: 1.25rem;
  left: 1rem;
  z-index: 500;

  @media (min-width: 999px) {
    display: none;
  }
`
