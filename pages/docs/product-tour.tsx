import { getDocProps } from 'utils/docs/getDocProps'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTocListener } from 'utils/toc_helpers'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import * as ga from '../../utils/ga'
import { NextSeo } from 'next-seo'
import { openGraphImage } from 'utils/open-graph-image'
import { DocsLayout, MarkdownContent } from 'components/layout'
import {
  DocGridContent,
  DocGridHeader,
  DocGridToc,
  DocsGrid,
  DocsPageTitle,
} from './[...slug]'
import { Breadcrumbs } from 'components/DocumentationNavigation/Breadcrumbs'
import Toc from 'components/toc'
import { DocsPagination, LastEdited } from 'components/ui'
import styled from 'styled-components'

export const getStaticProps: GetStaticProps = async function (props) {
  return await getDocProps(props, 'product-tour')
}

export default function Page(props) {
  const router = useRouter()

  const data = props.file.data

  const isCloudDocs = router.asPath.includes('tina-cloud')

  const isBrowser = typeof window !== `undefined`

  const frontmatter = data.frontmatter
  const markdownBody = data.markdownBody
  const excerpt = props.file.data.excerpt
  const tocItems = props.tocItems

  const { activeIds, contentRef } = useTocListener(data)

  const activeImg = useRef(null)
  const transitionImg = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!activeIds.length) {
      return
    }
    const imageSrc = (
      document.querySelector(
        `h2#${activeIds[activeIds.length - 1]} ~ *:has(img) img`
      ) as any
    )?.src

    if (activeImg.current.src === imageSrc) return

    if (!activeImg.current.src) {
      activeImg.current.src = imageSrc
    } else {
      transitionImg.current.src = imageSrc
      transitionImg.current.style.opacity = '1'

      setTimeout(function () {
        activeImg.current.src = imageSrc
        transitionImg.current.style.opacity = '0'
      }, 500)
    }
  }, [activeIds, transitionImg, activeImg])

  React.useEffect(() => {
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
        title={frontmatter.title}
        titleTemplate={'%s | TinaCMS Docs'}
        description={excerpt}
        openGraph={{
          title: frontmatter.title,
          description: excerpt,
          images: [openGraphImage(frontmatter.title, '| TinaCMS Docs')],
        }}
      />
      <DocsLayout navItems={props.docsNav}>
        <DocsGrid>
          <DocGridHeader>
            <Breadcrumbs navItems={props.docsNav} />
            <DocsPageTitle>{frontmatter.title}</DocsPageTitle>
          </DocGridHeader>
          <DocGridToc>
            <Toc tocItems={tocItems} activeIds={activeIds} />
          </DocGridToc>
          <DocGridContent ref={contentRef}>
            <hr />
            <SplitContent>
              <div>
                <MarkdownContent escapeHtml={false} content={markdownBody} />
              </div>
              <div id="sticky-img-container">
                <div className="img-container">
                  <img ref={activeImg} />
                  <img ref={transitionImg} />
                </div>
              </div>
            </SplitContent>
            <LastEdited date={frontmatter.last_edited} />
            {(props.prevPage?.slug !== null ||
              props.nextPage?.slug !== null) && (
              <DocsPagination
                prevPage={props.prevPage}
                nextPage={props.nextPage}
              />
            )}
          </DocGridContent>
        </DocsGrid>
      </DocsLayout>
    </>
  )
}

const SplitContent = styled.div`
  display: flex;
  position: relative;

  > * {
    flex: 1;
    margin: 0 10px;
    padding: 10px;
    box-sizing: border-box;
  }

  #sticky-img-container {
    position: sticky;
    top: 10px;
    width: 100%;
    height: fit-content;

    img {
      width: 100%;
      position: absolute;
      top: 0;
      transition: opacity 0.5s ease-in-out;
    }
  }

  .img-container {
    position: relative;
  }
`
