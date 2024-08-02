import { getDocsNav } from 'utils/docs/getDocProps'
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
  DocsPageTitle,
} from './[...slug]'
import { Breadcrumbs } from 'components/DocumentationNavigation/Breadcrumbs'
import { DocsPagination, LastEdited } from 'components/ui'
import styled from 'styled-components'
import client from 'tina/__generated__/client'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { components } from 'pages/blog/[slug]'
import { getSeoDescription } from 'utils/docs/getSeoDescription'

export const getStaticProps: GetStaticProps = async function (props) {
  const new_results = await client.queries.doc({ relativePath: `product-tour.mdx` })
  const oldNavDocs = await getDocsNav()
  return { props: { new: { new_results }, oldNavDocs } }
}

export default function Page(props) {
  const router = useRouter()
  const { data } = useTina({
    query: props.new?.new_results.query,
    data: props.new?.new_results.data,
    variables: props.new?.new_results.variables,
  })

  const doc_data = data.doc
  const previousPage = {
    slug: doc_data.previous?.id.slice(7, -4),
    title: doc_data.previous?.title,
  }
  const nextPage = {
    slug: doc_data.next?.id.slice(7, -4),
    title: doc_data.next?.title,
  }
  const description = getSeoDescription(doc_data.body)

  const { activeIds: _activeIds, contentRef } = useTocListener(doc_data)
  const activeIds = _activeIds.filter((id) => !!id)
  const activeImg = useRef(null)
  const transitionImg = useRef(null)

  useEffect(() => {
    let imgTransitionTimeout: NodeJS.Timeout
    if (typeof window === 'undefined') return
    if (!activeIds.length) {
      return
    }

    const heading = document.querySelector(
      `h2#${activeIds[0]}, h3#${activeIds[0]}, h4#${activeIds[0]}`
    )
    let imageSrc = null

    if (heading) {
      let sibling = heading.nextElementSibling

      while (sibling) {
        const image = sibling.querySelector('img')
        if (image) {
          imageSrc = image.src
          break
        }
        sibling = sibling.nextElementSibling
      }
    }

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
      activeImg.current.style.opacity = '0'

      imgTransitionTimeout = setTimeout(function () {
        activeImg.current.src = imageSrc
        transitionImg.current.style.opacity = '0'
        activeImg.current.style.opacity = '1'
      }, 350)
    }

    return () => {
      if (imgTransitionTimeout) {
        if (activeImg?.current && transitionImg?.current) {
          activeImg.current.src = imageSrc
          transitionImg.current.style.opacity = '0'
          activeImg.current.style.opacity = '1'
        }

        clearTimeout(imgTransitionTimeout)
      }
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
        title={doc_data.title}
        titleTemplate={'%s | TinaCMS Docs'}
        description={description}
        openGraph={{
          title: doc_data.title,
          description: description,
          images: [openGraphImage(doc_data.title, '| TinaCMS Docs')],
        }}
      />
      <DocsLayout navItems={props.oldNavDocs.data}>
        <DocContainer>
          <DocGridHeader>
            <Breadcrumbs navItems={props.oldNavDocs.data} />
            <DocsPageTitle>{doc_data.title}</DocsPageTitle>
          </DocGridHeader>
          <DocGridContent ref={contentRef}>
            <hr />
            <SplitContent>
              <div id="main-content-container">
                <TinaMarkdown content={doc_data.body} components={components} />
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
            <LastEdited date={doc_data.last_edited} />
            <div className='w-1/2'>
                            <DocsPagination prevPage={previousPage} nextPage={nextPage} />
            </div>
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

  h3 {
    font-size: 1.2rem;
  }

  > * {
    flex: 1;
    margin: 0 10px;
    padding: 10px;
    box-sizing: border-box;
  }

  @media (min-width: ${MAX_SPLIT_IMG_WIDTH + 1}px) {
    #main-content-container > h3:not(:first-child),
    #main-content-container > h2:not(:first-child) {
      margin-top: 4.5rem !important;
    }

    ul {
      list-style: none;
    }

    h2,
    h3,
    h4 {
      color: var(--color-light-dark);

      &:not(.focused) * {
        color: var(--color-light-dark);
      }

      + p,
      + ul {
        padding-left: 1rem;
        border-left: 4px solid var(--color-light-dark);

        color: var(--color-light-dark);
        * {
          color: var(--color-light-dark);
        }
      }

      &.focused {
        color: var(--color-orange);

        + p,
        + ul {
          border-left: 4px solid var(--color-orange);

          color: var(--color-primary);
          * {
            color: var(--color-primary);
          }
        }
      }
    }
  }

  #main-content-container img {
    display: none;
  }

  @media (max-width: ${MAX_SPLIT_IMG_WIDTH}px) {
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
      max-width: 100%;
      max-height: calc(100vh - 100px);
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0%);
      top: 0;
      transition: opacity 0.35s ease-in-out;
    }
  }

  .img-container {
    position: relative;
  }
`
