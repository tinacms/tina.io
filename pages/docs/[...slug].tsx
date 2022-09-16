import React from 'react'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { DocsLayout } from 'components/layout'
import { NavToggle, DocsPagination, LastEdited } from 'components/ui'
import Toc from '../../components/toc'
import { openGraphImage } from 'utils/open-graph-image'
import { useRouter } from 'next/router'
import { CloudDisclaimer } from 'components/cloud-beta-disclaimer'
import * as ga from '../../utils/ga'
import { Breadcrumbs } from 'components/DocumentationNavigation/Breadcrumbs'
import { useTocListener } from 'utils/toc_helpers'
import SetupOverview from '../../components/layout/setup-overview'
import { client } from '../../.tina/__generated__/client'
import { AsyncReturnType } from 'utils/asyncReturnType'
import { formatExcerpt } from 'utils'
import { getDocsNav } from 'utils/docs/getDocProps'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

export function DocTemplate(
  props: AsyncReturnType<typeof getStaticProps>['props']
) {
  if (props.variables.relativePath.includes('setup-overview')) {
    return <SetupOverview {...props} />
  }
  return <_DocTemplate {...props} />
}

function _DocTemplate(props: AsyncReturnType<typeof getStaticProps>['props']) {
  const data = props.data

  const router = useRouter()
  const isCloudDocs = router.asPath.includes('tina-cloud')

  const { activeIds, contentRef } = useTocListener(data)

  React.useEffect(() => {
    const handleRouteChange = url => {
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
        title={data.doc.title}
        titleTemplate={'%s | TinaCMS Docs'}
        description={props.excerpt}
        openGraph={{
          title: data.doc.title,
          description: props.excerpt,
          images: [openGraphImage(data.doc.title, '| TinaCMS Docs')],
        }}
      />
      <DocsLayout navItems={props.docsNav}>
        <DocsGrid>
          <DocGridHeader>
            <Breadcrumbs navItems={props.docsNav} />
            <DocsPageTitle>{data.doc.title}</DocsPageTitle>
          </DocGridHeader>
          <DocGridToc>
            <Toc tocItems={props.tocItems} activeIds={activeIds} />
          </DocGridToc>
          <DocGridContent ref={contentRef}>
            <hr />
            {isCloudDocs ? <CloudDisclaimer /> : null}
            <TinaMarkdown content={data.doc.body} />
            <LastEdited date={data.doc.last_edited} />
            {(props.data.doc.prev !== null || props.data.doc.next !== null) && (
              <DocsPagination
                prevPage={
                  props.data.doc.prev && {
                    title: props.data.doc.prev.title,
                    slug: props.data.doc.prev.id,
                  }
                }
                nextPage={
                  props.data.doc.next && {
                    title: props.data.doc.next.title,
                    slug: props.data.doc.next.id,
                  }
                }
              />
            )}
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

export const getStaticProps = async function(props) {
  let slug = props.params.slug.join('/')
  const tinaProps = await client.queries.doc({ relativePath: `${slug}.md` })
  const docsNav = await getDocsNav(false, {})

  return {
    props: {
      ...tinaProps,
      excerpt: await formatExcerpt(
        tinaProps.data.doc.body.children.map(c => c.value).join('\n')
      ),
      docsNav: docsNav.data,
      tocItems: getTocItems(tinaProps.data.doc.body),
    },
  }
}

const getTocItems = ({
  children,
  ...richTextProps
}: {
  children: { type: string; children: any[] }[]
}) => {
  return {
    children: children.filter(
      c => c.type == 'h1' || c.type == 'h2' || c.type == 'h3' || c.type == 'h4'
    ),
    ...richTextProps,
  }
}

export const getStaticPaths = async () => {
  const docListData = await client.queries.docConnection()

  return {
    paths: docListData.data.docConnection.edges.map(post => ({
      params: { slug: post.node._sys.filename.split('/') },
    })),
    fallback: 'blocking',
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
    padding: 1rem 3rem 3rem 3rem;
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
    grid-column-gap: 3rem;
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
