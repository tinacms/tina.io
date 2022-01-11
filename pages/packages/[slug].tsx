import React, { useState } from 'react'
import { NextSeo } from 'next-seo'
import { GetStaticProps, GetStaticPaths } from 'next'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { GithubError } from 'next-tinacms-github'
import fs from 'fs'

import { DocsLayout, MarkdownContent } from 'components/layout'
import { DocsPagination } from 'components/ui'
// @ts-ignore
const path = __non_webpack_require__('path')

import { getPackageProps } from '../../utils/docs/getPackageProps'
import { DocsGrid, DocGridToc, DocGridContent } from 'pages/docs/[...slug]'
import { createTocListener } from 'utils'
import Toc from 'components/toc'
import { openGraphImage } from 'utils/open-graph-image'

export default function Packages(props) {
  const router = useRouter()

  if (props.hasError === true) {
    const code = props.errorCode ? props.errorCode : 404
    return <Error statusCode={code} />
  }

  const excerpt = 'A package for Tinacms.'

  const contentRef = React.useRef<HTMLDivElement>(null)
  const isBrowser = typeof window !== `undefined`
  const tocItems = props.tocItems
  const [activeIds, setActiveIds] = useState([])

  React.useEffect(() => {
    if (!isBrowser || !contentRef.current) {
      return
    }
    const activeTocListener = createTocListener(contentRef, setActiveIds)
    window.addEventListener('scroll', activeTocListener)

    return () => window.removeEventListener('scroll', activeTocListener)
  }, [contentRef])

  return (
    <>
      <NextSeo
        title={props.name}
        titleTemplate={'%s | TinaCMS Docs'}
        description={excerpt}
        openGraph={{
          title: props.name,
          description: excerpt,
          images: [openGraphImage(props.name, ' | TinaCMS Docs')],
        }}
      />
      <DocsLayout navItems={props.docsNav}>
        <DocsGrid>
          {!router.isFallback && (
            <DocGridToc>
              <Toc tocItems={tocItems} activeIds={activeIds} />
            </DocGridToc>
          )}
          <DocGridContent ref={contentRef}>
            <MarkdownContent escapeHtml={false} content={props.content} />
            <hr />
            <a href={props.link}>View on GitHub -></a>
            <DocsPagination
              prevPage={props.prevPage}
              nextPage={props.nextPage}
            />
          </DocGridContent>
        </DocsGrid>
      </DocsLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async function(props) {
  const { slug } = props.params

  try {
    return await getPackageProps(props, `${slug}`)
  } catch (e) {
    if (e instanceof GithubError) {
      return {
        props: {
          error: { ...e }, //workaround since we cant return error as JSON
        },
      }
    } else {
      throw e
    }
  }
}

export const getStaticPaths: GetStaticPaths = async function() {
  const filePath = path.resolve(process.cwd(), './content/packages.json')
  const file = await JSON.parse(fs.readFileSync(filePath, 'utf8'))

  return {
    paths: [],
    fallback: false,
  }
}
