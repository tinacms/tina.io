import React, { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import matter from 'gray-matter'
import styled from 'styled-components'
import removeMarkdown from 'remove-markdown'

import {
  Layout,
  Wrapper,
  Hero,
  MarkdownContent,
  RichTextWrapper,
} from '../../components/layout'
import SmallArrow from '../../public/svg/small-arrow.svg'

const Index = props => {
  function formatDate(fullDate) {
    const date = new Date(fullDate)
    const dateOptions = {
      formatMatcher: 'best fit',
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', dateOptions)
  }

  /*
   ** Handle Pagination
   */
  const { currentPage, numPages } = props
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog?page=${currentPage - 1}`
  const nextPage = `/blog?page=${currentPage + 1}`
  const [selectValue, setSelectValue] = useState(currentPage)

  function handleSelectChange(e) {
    e.preventDefault()
    const pageNumber = e.target.value
    setSelectValue(pageNumber)
    if (pageNumber === '1') {
      Router.push('/blog/index.js', '/blog')
    } else {
      Router.push(`/blog?page=${pageNumber}`)
    }
  }

  return (
    <Layout>
      <Hero mini></Hero>
      <BlogWrapper>
        {props.posts.map(post => (
          <Link
            key={post.data.slug}
            href={{ pathname: `/blog/${post.data.slug}` }}
            passHref
          >
            <BlogExcerpt>
              <BlogTitle>{post.data.title}</BlogTitle>
              <RichTextWrapper>
                <BlogMeta>
                  <p>By: {post.data.author}</p>
                  <p>{formatDate(post.data.date)}</p>
                </BlogMeta>
                <MarkdownContent skipHtml={true} content={post.content} />
                <hr />
              </RichTextWrapper>
              <br />
            </BlogExcerpt>
          </Link>
        ))}
      </BlogWrapper>
      <Pagination>
        <div className="prev-next">
          {!isFirst && (
            <Link href={prevPage}>
              <p>← Newer</p>
            </Link>
          )}
          {!isLast && (
            <Link href={nextPage}>
              <p>Older →</p>
            </Link>
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

function orderPosts(posts) {
  function sortByDate(a, b) {
    const dateA = new Date(a.data.date).getTime()
    const dateB = new Date(b.data.date).getTime()
    return dateA < dateB ? 1 : -1
  }
  return posts.sort(sortByDate)
}

function formatExcerpt(content) {
  const plainTextExcerpt = removeMarkdown(content, {
    stripListLeaders: true,
    listUnicodeChar: '',
    gfm: true,
    useImgAltText: false,
  })
    .replace(/(\r\n|\n|\r)/gm, '')
    .substring(0, 200)
    .trimEnd()

  return `${plainTextExcerpt}...`
}

/*
 ** GET INITIAL PROPS ---------------------------------
 */

Index.getInitialProps = async function({ query: { page = 1 } }) {
  // grab all md files
  const blogData = (context => {
    const keys = context.keys()
    const values = keys.map(context)
    const data = keys.map((key: string, index: number) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const value = values[index]
      // Parse yaml metadata & markdownbody in document
      const post = matter(value.default)
      const formattedContent = formatExcerpt(post.content)
      return {
        data: { ...post.data, slug },
        content: formattedContent,
      }
    })

    // for pagination and ordering
    const postsPerPage = 8
    const numPages = Math.ceil(keys.length / postsPerPage)
    const pageIndex = page - 1
    const orderedPosts = orderPosts(data).slice(
      pageIndex,
      pageIndex + postsPerPage
    )

    return { orderedPosts, numPages }
  })((require as any).context('../../content/blog', true, /\.md$/))

  return {
    posts: blogData.orderedPosts,
    numPages: blogData.numPages,
    currentPage: Number(page),
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
  max-width: 80%;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  color: var(--color-secondary);
  @media (min-width: 800px) {
    font-size: 2rem;
  }
`

const BlogExcerpt = styled.a`
  cursor: pointer;
  text-decoration: none;
  &:hover {
    ${BlogTitle} {
      color: var(--color-primary) !important;
    }
  }
  hr {
    opacity: 0.3;
    filter: saturate(0%);
  }
`

const BlogMeta = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-grow: 1;
  margin-bottom: 1.5rem;
  margin-top: -0.5rem;
  opacity: 0.5;
  p {
    margin: 0;
    color: 0;
    display: block;
  }
  p:first-child {
    max-width: 250px;
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
