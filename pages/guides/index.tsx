import { getGuideNavProps } from 'utils/guide_helpers'
import { readMarkdownFile } from 'utils/getMarkdownFile'
import { getDocsNav } from 'utils/docs/getDocProps'
import React from 'react'
import { DocsLayout, Wrapper, MarkdownContent } from 'components/layout'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'

const GuideTemplate = ({ markdownFile, navItems }) => {
  const { frontmatter, markdownBody, excerpt } = markdownFile.data

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
      {/**TODO: force nav scroll to guides */}
      <DocsLayout navItems={navItems}>
        <GuideWrapper narrow>
          <h1>{frontmatter.title}</h1>
          <hr />
          <MarkdownContent escapeHtml={false} content={markdownBody} />
        </GuideWrapper>
      </DocsLayout>
    </>
  )
}

const GuideWrapper = styled(Wrapper)`
  padding-top: 2rem;
  padding-bottom: 3rem;
`

export default GuideTemplate

export const getStaticProps = async ({ preview }) => {
  // @ts-ignore
  const path = __non_webpack_require__('path')
  // the following line will cause all content files to be available in a serverless context
  path.resolve(process.cwd(), './content/')
  return {
    props: {
      slug: '/guides',
      markdownFile: await readMarkdownFile(
        path.resolve(process.cwd(), './content/guides/index.md')
      ),
      allGuides: await getGuideNavProps(),
      navItems: await getDocsNav(preview, {}),
    },
  }
}
