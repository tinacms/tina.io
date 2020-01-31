import React from 'react'
import Link from 'next/link'
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
import RichText from '../../components/styles/RichText'

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

Index.getInitialProps = async function() {
  const rawPosts = (context => {
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

    return data
  })((require as any).context('../../content/blog', true, /\.md$/))

  const orderedPosts = orderPosts(rawPosts)

  return {
    posts: orderedPosts,
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
    <h3 class {...styleProps}>
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
