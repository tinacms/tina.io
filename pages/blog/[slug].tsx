import { ExperimentalGetTinaClient } from '../../.tina/__generated__/types'

import * as React from 'react'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { GetStaticProps, GetStaticPaths } from 'next'
import { formatDate, isRelevantPost } from '../../utils'
import {
  Layout,
  Hero,
  Wrapper,
  MarkdownContent,
  DocsTextWrapper,
} from 'components/layout'
import { fileToUrl } from 'utils/urls'
import { getPageRef } from 'utils/docs/getDocProps'
const fg = require('fast-glob')
import { LastEdited, DocsPagination } from 'components/ui'
import { openGraphImage } from 'utils/open-graph-image'
import { WarningCallout } from '../../utils/shortcodes'
import { useTina } from 'tinacms/dist/edit-state'

function BlogTemplate({ file, siteConfig, prevPage, nextPage, ...props }) {
  const { data, isLoading } = useTina({
    query: props.query,
    data: props.data,
    variables: props.vars,
  })

  const { body, excerpt, ...frontmatter } = data.getPostDocument.data

  React.useEffect(() => {
    //console.log(body)
  }, [body])

  const warningMessage =
    data.warningMessage ||
    (!isRelevantPost(frontmatter) &&
      '**Update:** The Tina API has been evolving, and the content in this post is outdated. For help getting started with Tina, we suggest checking out our [getting started doc](/docs/setup-overview/).')

  return (
    <Layout>
      <NextSeo
        title={frontmatter.title}
        titleTemplate={'%s | ' + siteConfig.title + ' Blog'}
        description={excerpt}
        openGraph={{
          title: frontmatter.title,
          description: excerpt,
          images: [
            frontmatter.opengraph?.image ||
              openGraphImage(
                frontmatter.title,
                ' | TinaCMS Blog',
                frontmatter.author
              ),
          ],
        }}
      />
      <Hero>{frontmatter.title}</Hero>
      <BlogWrapper>
        <DocsTextWrapper>
          <BlogMeta>
            <MetaWrap>
              <MetaBit>{formatDate(frontmatter.date)}</MetaBit>
              <MetaBit>
                <span>By</span> <strong>{frontmatter.author}</strong>
              </MetaBit>
            </MetaWrap>
          </BlogMeta>
          {warningMessage && <WarningCallout text={warningMessage} />}
          <MarkdownContent skipHtml={false} escapeHtml={false} content={body} />
          <LastEdited date={frontmatter.last_edited} />
          {/* {(prevPage?.slug !== null || nextPage?.slug !== null) && (
            <DocsPagination prevPage={prevPage} nextPage={nextPage} />
          )} */}
        </DocsTextWrapper>
      </BlogWrapper>
    </Layout>
  )
}

export default BlogTemplate

/*
 ** DATA FETCHING --------------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
  ...ctx
}) {
  const { slug } = ctx.params

  //TODO - move to readFile
  const { default: siteConfig } = await import('../../content/siteConfig.json')

  const client = ExperimentalGetTinaClient()
  const vars = { relativePath: `${slug}.md` }
  const res = await client.getPostDocument(vars)

  return {
    props: {
      query: res.query,
      data: res.data,
      vars,
      // nextPage: await getPageRef(
      //   currentBlog.props.file.data.frontmatter.next,
      //   preview,
      //   previewData
      // ),
      // prevPage: await getPageRef(
      //   currentBlog.props.file.data.frontmatter.prev,
      //   preview,
      //   previewData
      // ),
      nextPage: null,
      prevPage: null,
      siteConfig: { title: siteConfig.title },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async function() {
  const blogs = await fg(`./content/blog/**/*.md`)
  return {
    paths: blogs.map(file => {
      const slug = fileToUrl(file, 'blog')
      return { params: { slug } }
    }),
    fallback: false,
  }
}

/*
 ** STYLES ---------------------------------------------------------
 */

const BlogWrapper = styled(Wrapper)`
  padding-top: 4rem;
  padding-bottom: 3rem;
  max-width: 768px;
`

const BlogMeta = styled.div`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 3rem;
  margin-top: -0.5rem;

  @media (min-width: 550px) {
    flex-direction: row;
  }
`

const MetaWrap = styled.span`
  opacity: 0.8;
`

const MetaBit = styled.p`
  display: flex;
  margin: 0 !important;

  span {
    opacity: 0.7;
    margin-right: 0.25rem;
  }
`
