import React from 'react'
import styled from 'styled-components'
import matter from 'gray-matter'
import { NextSeo } from 'next-seo'
import { readFile } from '../../../utils/readFile'

import { orderPosts, formatExcerpt, formatDate } from '../../../utils'
import {
  Layout,
  Wrapper,
  Hero,
  MarkdownContent,
  RichTextWrapper,
} from '../../../components/layout'
import { DynamicLink, BlogPagination } from '../../../components/ui'

const Index = props => {
  const { currentPage, numPages } = props

  return (
    <Layout>
      <NextSeo
        title="Blog"
        openGraph={{
          title: 'Blog',
        }}
      />
      <Hero mini></Hero>
      <BlogWrapper>
        {props.posts.map(post => (
          <DynamicLink
            key={post.data.slug}
            href={`/blog/${post.data.slug}`}
            passHref
          >
            <BlogExcerpt>
              <BlogTitle>{post.data.title}</BlogTitle>
              <RichTextWrapper>
                <BlogMeta>
                  <p>
                    <span>By</span> {post.data.author}
                  </p>
                  <p>{formatDate(post.data.date)}</p>
                </BlogMeta>
                <MarkdownContent skipHtml={true} content={post.content} />
                <hr />
              </RichTextWrapper>
              <br />
            </BlogExcerpt>
          </DynamicLink>
        ))}
        <BlogPagination currentPage={currentPage} numPages={numPages} />
      </BlogWrapper>
    </Layout>
  )
}

/*
 ** GET INITIAL PROPS ---------------------------------
 */

const POSTS_PER_PAGE = 8

export async function unstable_getStaticPaths() {
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

  return pages
}

export async function unstable_getStaticProps(ctx) {
  let page = (ctx.params && ctx.params.page_index) || '1'

  // grab all md files
  const fg = require('fast-glob')
  const files = await fg(`./content/blog/**/*.md`)
  const posts = await Promise.all(
    files.map(async file => {
      const rawData = await readFile(file)

      // create slug from filename
      const slug = file
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')

      // parse yaml & markdown body
      const post = matter(rawData)

      const excerpt = formatExcerpt(post.content)

      return {
        data: { ...post.data, slug },
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
      currentPage: parseInt(page),
    },
  }
}

export default Index

/**
 *  STYLES -----------------------------------------------------
 */

const BlogWrapper = styled(Wrapper)`
  padding-top: 10rem;
  max-width: 768px;
`

const BlogTitle = styled(({ children, ...styleProps }) => {
  return (
    <h3 className {...styleProps}>
      {children}
    </h3>
  )
})`
  font-family: var(--font-tuner);
  font-weight: regular;
  font-style: normal;
  font-size: 1.5rem;
  color: inherit;
  transition: all 180ms ease-out;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  color: var(--color-secondary);
  @media (min-width: 800px) {
    font-size: 2rem;
    max-width: 80%;
  }
`

const BlogExcerpt = styled.a`
  cursor: pointer;
  text-decoration: none;
  &:hover,
  &:focus {
    outline: none;
    ${BlogTitle} {
      color: var(--color-primary) !important;
    }
  }
  &:focus {
    hr {
      transition: all 230ms ease-out;
      width: 100%;
    }
  }
  hr {
    transition: all 180ms ease-out;
  }
  &:not(:focus) {
    &:not(:hover) {
      hr {
        opacity: 0.3;
        filter: saturate(0%);
      }
    }
  }
`

const BlogMeta = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-bottom: 1.5rem;
  margin-top: -0.5rem;
  opacity: 0.5;
  p {
    margin: 0;
    color: 0;
    display: block;
  }
  span {
    opacity: 0.5;
  }

  @media (min-width: 550px) {
    flex-direction: row;
  }
`

const Pagination = styled.div``

const PaginationSelect = styled.div``
