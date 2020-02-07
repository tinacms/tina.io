import React, { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
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
import SmallArrow from '../../../public/svg/small-arrow.svg'
import { DynamicLink } from '../../../components/ui/DynamicLink'

const Index = props => {
  /*
   ** Handle Pagination
   */
  const { currentPage, numPages } = props
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog/page/${currentPage - 1}`
  const nextPage = `/blog/page/${currentPage + 1}`
  const [selectValue, setSelectValue] = useState(currentPage)

  function handleSelectChange(e) {
    e.preventDefault()
    const pageNumber = e.target.value
    setSelectValue(pageNumber)
    if (pageNumber === '1') {
      Router.push('/blog/index.js', '/blog')
    } else {
      Router.push(`/blog/page/${pageNumber}`)
    }
  }

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
      </BlogWrapper>
      <Pagination>
        <div className="prev-next">
          {!isFirst && (
            <DynamicLink href={prevPage}>
              <p>← Newer</p>
            </DynamicLink>
          )}
          {!isLast && (
            <DynamicLink href={nextPage}>
              <p>Older →</p>
            </DynamicLink>
          )}
        </div>
        <div className="list-numbers">
          <ul>
            <PaginationSelect>
              <p>Page</p>
              <div className="select">
                <select
                  aria-label="Pagination Dropdown"
                  value={selectValue}
                  onChange={handleSelectChange}
                >
                  {Array.from({ length: numPages }, (_, i) => (
                    <option
                      arial-label={`Go to Page ${i + 1}`}
                      aria-current={i + 1 === currentPage ? true : false}
                      value={i + 1}
                    >
                      {i + 1}
                    </option>
                  ))}
                </select>
                <SmallArrow />
              </div>
              <p> of {numPages}</p>
            </PaginationSelect>
          </ul>
        </div>
      </Pagination>
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

const Pagination = styled.div`
  max-width: 704px;
  width: 100%;
  margin: 0 auto 1.5rem auto;
  display: flex;
  padding: 0 32px;
  justify-content: space-between;
  align-items: center;
  div.prev-next {
    display: flex;
    align-items: center;
    p {
      margin-right: 24px;
    }
  }
  p {
    margin-bottom: 0;
    cursor: pointer;
  }
  div.list-numbers {
    display: flex;
    align-items: center;
  }
  ul {
    display: flex;
    justify-content: space-evenly;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: 3px 8px 6px 8px;
      border-radius: 5px;
      margin-right: 8px;
      a {
        text-decoration: none;
      }
    }

    li:first-of-type {
      margin-left: 8px;
    }

    span.page-dots {
      align-self: flex-end;
      padding-bottom: 6px;
      color: rgba(0, 0, 0, 0.3);
    }
    li.current-li {
      a {
        color: var(--color-primary);
      }
    }
  }
  @media (min-width: 704px) {
    padding: 0;
  }
`

const PaginationSelect = styled.div`
  display: flex;
  div.select {
    border: 1px solid var(--color-seafoam);
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 2px 5px 3px 5px;
    margin: 0 8px;
    position: relative;
  }
  select {
    margin-right: 3px;
    padding-right: 6px;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: medium none;
    font-size: 18px;
  }
  option {
    color: inherit;
    padding: 8px;
    font-family: sans-serif;
  }
  svg {
    width: 8px;
    position: absolute;
    right: 6px;
    pointer-events: none;
  }
  p {
    padding-top: 2px;
    margin-bottom: 0;
  }
`
