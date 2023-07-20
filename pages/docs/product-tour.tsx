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

  const { activeIds: _activeIds, contentRef } = useTocListener(data)
  const activeIds = _activeIds.filter((id) => !!id)
  const activeImg = useRef(null)
  const transitionImg = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!activeIds.length) {
      return
    }
    const imageSrc = (
      document.querySelector(
        `h2#${activeIds[0]} ~ *:has(img) img, ` +
          `h3#${activeIds[0]} ~ *:has(img) img, ` +
          `h4#${activeIds[0]} ~ *:has(img) img`
      ) as any
    )?.src

    // limit activeIds to 1
    const deepestActiveIds = activeIds.slice(0, 1)
    document.querySelectorAll('.focused').forEach((el) => {
      if (deepestActiveIds.indexOf(el.id) === -1) {
        el.classList.remove('focused')
      }
    })

    deepestActiveIds.forEach((id) => {
      const el = document.querySelector(`#${id}`)
      if (el) {
        el.classList.add('focused')
      }
    })

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
        <DocContainer>
          <DocGridHeader>
            <Breadcrumbs navItems={props.docsNav} />
            <DocsPageTitle>{frontmatter.title}</DocsPageTitle>
          </DocGridHeader>
          {/* <DocGridToc>
            <Toc tocItems={tocItems} activeIds={activeIds} />
          </DocGridToc> */}
          <DocGridContent ref={contentRef}>
            <hr />
            <SplitContent>
              <div id="main-content-container">
                <MarkdownContent escapeHtml={false} content={markdownBody} />
              </div>
              <div id="sticky-img-container">
                <div className="img-container">
                  <img
                    ref={activeImg}
                    src="https://res.cloudinary.com/forestry-demo/image/upload/v1645712511/tina-io/docs/your-blocks.gif"
                  />
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
        </DocContainer>
      </DocsLayout>
    </>
  )
}

export const DocContainer = styled.div`
  display: block;
  width: 100%;
  position: relative;
  padding: 1rem 2rem 3rem 2rem;
  margin: 0 auto;
`

const MAX_SPLIT_IMG_WIDTH = 768
const SplitContent = styled.div`
  display: flex;
  position: relative;

  > * {
    flex: 1;
    margin: 0 10px;
    padding: 10px;
    box-sizing: border-box;
  }

  @media (min-width: 769px) {
    #main-content-container > h3:not(:first-child),
    #main-content-container > h2:not(:first-child) {
      margin-top: 4rem !important;
    }

    ul {
      list-style: none;
    }

    h2,
    h3,
    h4 {
      color: var(--color-primary);

      + p,
      + ul {
        padding-left: 1rem;
        border-left: 4px solid var(--color-light-dark);
      }

      &.focused {
        color: var(--color-orange);

        + p,
        + ul {
          border-left: 4px solid var(--color-orange);
        }
      }
    }
  }

  #main-content-container img {
    display: none;
  }

  @media (max-width: 768px) {
    #sticky-img-container {
      display: none;
    }

    #main-content-container img {
      display: initial;
    }
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
