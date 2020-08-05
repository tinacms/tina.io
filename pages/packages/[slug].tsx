import React, { useState } from 'react'
import { NextSeo } from 'next-seo'
import { GetStaticProps, GetStaticPaths } from 'next'
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

export default function Packages(props) {
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
          images: [
            {
              url:
                'https://res.cloudinary.com/forestry-demo/image/upload/l_text:tuner-regular.ttf_90_center:' +
                encodeURIComponent(props.name) +
                ',g_center,x_0,y_50,w_850,c_fit,co_rgb:EC4815/v1581087220/TinaCMS/tinacms-social-empty-docs.png',
              width: 1200,
              height: 628,
              alt: props.name + ` | TinaCMS Docs`,
            },
          ],
        }}
      />
      <DocsLayout navItems={props.docsNav}>
        <DocsGrid>
          <DocGridToc>
            <Toc tocItems={tocItems} activeIds={activeIds} />
          </DocGridToc>
          <DocGridContent ref={contentRef}>
            <MarkdownContent escapeHtml={false} content={props.content} />
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
          previewError: { ...e }, //workaround since we cant return error as JSON
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
    paths: file.packages.map((p: { name: any }) => ({
      params: { slug: p.name },
    })),
    fallback: false,
  }
}
