import { NextSeo } from 'next-seo'
import styled from 'styled-components'
import React from 'react'

import { getGuideNavProps } from 'utils/guide_helpers'
import { getMarkdownPreviewProps } from 'utils/getMarkdownFile'
import { getDocsNav } from 'utils/docs/getDocProps'
import { createTocListener } from 'utils'
import { DocsLayout, Wrapper, MarkdownContent } from 'components/layout'
import {
  DocGridToc,
  DocGridContent,
  DocsGrid,
  DocGridHeader,
  DocsPageTitle,
} from '../docs/[...slug]'
import Toc from 'components/toc'

const GuideTemplate = ({ markdownFile, navItems, tocItems }) => {
  const { frontmatter, markdownBody, excerpt } = markdownFile.data
  const [activeIds, setActiveIds] = React.useState([])
  const isBrowser = typeof window !== `undefined`
  const contentRef = React.useRef<HTMLDivElement>(null)

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
        title={frontmatter.title}
        titleTemplate={'%s | TinaCMS Docs'}
        description={excerpt}
        openGraph={{
          title: frontmatter.title,
          description: excerpt,
          images: [
            {
              url:
                'https://res.cloudinary.com/forestry-demo/image/upload/l_text:tuner-regular.ttf_90_center:' +
                encodeURIComponent('TinaCMS Guides') +
                ',g_center,x_0,y_50,w_850,c_fit,co_rgb:EC4815/v1581087220/TinaCMS/tinacms-social-empty-docs.png',
              width: 1200,
              height: 628,
              alt: 'TinaCMS Guides',
            },
          ],
        }}
      />
      <DocsLayout navItems={navItems}>
        <DocsGrid>
          <DocGridHeader>
            <DocsPageTitle>{frontmatter.title}</DocsPageTitle>
          </DocGridHeader>
          <DocGridToc>
            <Toc tocItems={tocItems} activeIds={activeIds} />
          </DocGridToc>
          <DocGridContent ref={contentRef}>
            <hr />
            <MarkdownContent escapeHtml={false} content={markdownBody} />
          </DocGridContent>
        </DocsGrid>
      </DocsLayout>
    </>
  )
}

const GuideWrapper = styled(Wrapper)`
  padding-top: 2rem;
  padding-bottom: 3rem;
`

export default GuideTemplate

export const getStaticProps = async ctx => {
  const {
    props: { preview, file: markdownFile, tocItems },
  } = await getMarkdownPreviewProps(
    `content/guides/index.md`,
    ctx.preview,
    ctx.previewData
  )

  return {
    props: {
      slug: '/guides',
      markdownFile,
      tocItems,
      allGuides: await getGuideNavProps(),
      navItems: await getDocsNav(preview, {}),
    },
  }
}
