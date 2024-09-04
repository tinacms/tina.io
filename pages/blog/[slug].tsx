import { client } from '../../tina/__generated__/client'

import * as React from 'react'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { GetStaticProps, GetStaticPaths } from 'next'
import { formatDate, isRelevantPost } from '../../utils'
import {
  Layout,
  Hero,
  DocsTextWrapper,
} from 'components/layout'
import { fileToUrl } from 'utils/urls'
const fg = require('fast-glob')
import { LastEdited, DocsPagination } from 'components/ui'
import { openGraphImage } from 'utils/open-graph-image'
import { WarningCallout } from '../../utils/shortcodes'
import { useTina } from 'tinacms/dist/react'
import path from 'path'
import {
  TinaMarkdown
} from 'tinacms/dist/rich-text'
import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents'


function BlogTemplate({ file, siteConfig, ...props }) {
  const { data } = useTina({
    query: props.query,
    data: props.data,
    variables: props.vars,
  })

  const { body, excerpt, prev, next, ...frontmatter } = data.post

  const prevPage = React.useMemo(() => {
    if (!prev) return null
    const { name } = path.parse(prev.id)
    return {
      slug: `/blog/${name}`,
      title: prev.title,
    }
  }, [prev])

  const nextPage = React.useMemo(() => {
    if (!next) return null
    const { name } = path.parse(next.id)
    return {
      slug: `/blog/${name}`,
      title: next.title,
    }
  }, [next])

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
      <Hero>{frontmatter.title}</Hero>{' '}
      <div className="p-6">
        <div className="py-12 lg:py-16 last:pb-20 last:lg:pb-32 max-w-prose mx-auto">
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
            <TinaMarkdown components={docAndBlogComponents} content={body} />
            <LastEdited date={frontmatter.last_edited} />
            {(prevPage?.slug !== null || nextPage?.slug !== null) && (
              <DocsPagination prevPage={prevPage} nextPage={nextPage} />
            )}
          </DocsTextWrapper>
        </div>
      </div>
    </Layout>
  )
}

export default BlogTemplate

/*
 ** DATA FETCHING --------------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
  ...ctx
}) {
  const { slug } = ctx.params

  //TODO - move to readFile
  const { default: siteConfig } = await import('../../content/siteConfig.json')

  const vars = { relativePath: `${slug}.mdx` }
  const res = await client.queries.getExpandedPostDocument(vars)

  return {
    props: {
      query: res.query,
      data: res.data,
      vars,
      siteConfig: { title: siteConfig.title || 'TinaCMS' },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async function () {
  const blogs = await fg(`./content/blog/**/*.mdx`)
  return {
    paths: blogs.map((file) => {
      const slug = fileToUrl(file, 'blog')
      return { params: { slug } }
    }),
    fallback: false,
  }
}

/*
 ** STYLES ---------------------------------------------------------
 */

const BlogMeta = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 3rem;
  margin-top: -0.5rem;
  text-align: center;

  @media (min-width: 550px) {
    flex-direction: row;
  }
`

const MetaWrap = styled.span`
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MetaBit = styled.p`
  display: flex;
  margin: 0 !important;

  span {
    opacity: 0.7;
    margin-right: 0.25rem;
  }
`
