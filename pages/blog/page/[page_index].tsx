import React from 'react'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { GetStaticProps, GetStaticPaths } from 'next'
import { orderPosts, formatExcerpt, formatDate } from '../../../utils'
import path from 'path'

import {
  Layout,
  Wrapper,
  Hero,
  MarkdownContent,
  RichTextWrapper,
} from 'components/layout'
import { DynamicLink, BlogPagination } from 'components/ui'
import { getMarkdownPreviewProps } from 'utils/getMarkdownPreviewProps'
const Index = (props) => {
  const { currentPage, numPages } = props

  return (
    <Layout>
      <NextSeo
        title="Blog"
        openGraph={{
          title: 'Blog',
        }}
      />
      <div className="p-6">
        <div className="py-12 lg:py-16 last:pb-20 last:lg:pb-32 max-w-prose mx-auto">
          {props.posts.map((post) => (
            <DynamicLink
              key={post.data.slug}
              href={`/blog/${post.data.slug}`}
              passHref
            >
              <a className="w-full group flex flex-col gap-6 lg:gap-8 items-start mb-6 lg:mb-8">
                <h3 className="font-tuner inline-block text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-blue-700/70 via-blue-900/90 to-blue-1000 group-hover:from-orange-300 group-hover:via-orange-500 group-hover:to-orange-700 bg-clip-text text-transparent">
                  {post.data.title}
                </h3>
                <RichTextWrapper>
                  <BlogMeta>
                    <MetaBit>
                      <span>By</span> <strong>{post.data.author}</strong>
                    </MetaBit>
                    <MetaBit>{formatDate(post.data.date)}</MetaBit>
                  </BlogMeta>
                  <MarkdownContent skipHtml={true} content={post.content} />
                  <hr />
                </RichTextWrapper>
              </a>
            </DynamicLink>
          ))}
          <BlogPagination currentPage={currentPage} numPages={numPages} />
        </div>
      </div>
    </Layout>
  )
}

/*
 ** DATA FETCHING ---------------------------------
 */

const POSTS_PER_PAGE = 8

export const getStaticPaths: GetStaticPaths = async function () {
  const fg = require('fast-glob')
  const contentDir = './content/blog/'
  const posts = await fg(`${contentDir}**/*.md`)

  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  var pages = []
  for (var i = 1; i <= numPages; i++) {
    pages.push({
      params: { page_index: i.toString() },
    })
  }

  return { paths: pages, fallback: false }
}

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
  ...ctx
}) {
  // @ts-ignore page_index should always be a single string
  const page = parseInt((ctx.params && ctx.params.page_index) || '1')

  try {
    const files = await getLocalFiles('content/blog')

    const posts = await Promise.all(
      // TODO - potentially making a lot of requests here
      files.map(async (file) => {
        const post = (await getMarkdownPreviewProps(file, preview, previewData))
          .props.file

        // create slug from filename
        const slug = file
          .replace(/^.*[\\\/]/, '')
          .split('.')
          .slice(0, -1)
          .join('.')

        const excerpt = await formatExcerpt(post.data.markdownBody)

        return {
          data: { ...post.data.frontmatter, slug },
          content: excerpt,
        }
      })
    )

    // for pagination and ordering
    const numPages = Math.ceil(posts.length / POSTS_PER_PAGE)
    const pageIndex = page - 1
    const orderedPosts = orderPosts(posts).slice(
      pageIndex * POSTS_PER_PAGE,
      (pageIndex + 1) * POSTS_PER_PAGE
    )

    return {
      props: {
        posts: orderedPosts,
        numPages: numPages,
        currentPage: page,
        preview: !!preview,
      },
    }
  } catch (e) {
    return {
      props: {
        error: { ...e }, //workaround since we cant return error as JSON
      },
    }
  }
}

export default Index

const getLocalFiles = async (filePath: string) => {
  // grab all md files
  const fg = require('fast-glob')
  const glob = path.resolve(filePath, '*')
  const files = await fg(glob)

  return files
}

/**
 *  STYLES -----------------------------------------------------
 */

export const MetaBit = styled.p`
  display: flex;
  margin: 0 !important;

  strong {
    opacity: 0.7;
  }

  span {
    opacity: 0.7;
    margin-right: 0.25rem;
  }
`

export const BlogMeta = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-bottom: 1.5rem;
  margin-top: -0.5rem;

  @media (min-width: 550px) {
    flex-direction: row;
  }
`
