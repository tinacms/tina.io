import React from 'react'
import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

import Layout from '../../components/layout/Layout'
import Wrapper from '../../components/layout/Wrapper'
import Hero from '../../components/layout/Hero'

const Index = props => {
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
              <StyledBlogMetaData>
                <p>By: {post.data.author}</p>
                <p>{post.data.date}</p>
              </StyledBlogMetaData>
              <ReactMarkdown source={post.content} />
              <hr />
              <br />
            </BlogExcerpt>
          </Link>
        ))}
      </BlogWrapper>
    </Layout>
  )
}

const BlogWrapper = styled(Wrapper)`
  padding-top: 10rem;
  max-width: 768px;
`

const BlogTitle = styled(({ children, ...styleProps }) => {
  return <h3 {...styleProps}>{children}</h3>
})`
  font-size: 1.5rem;
  color: inherit;
  transition: all 180ms ease-out;

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

const StyledBlogMetaData = styled('div')`
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-grow: 1;
  margin-bottom: 1.5rem;
  margin-top: -0.5rem;
  opacity: 0.8;
  p {
    margin: 0;
    color: 0;
    display: block;
  }
  p:first-child {
    max-width: 250px;
  }
`

Index.getInitialProps = async function(ctx) {
  const posts = (context => {
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
      console.log(JSON.stringify(post))
      return {
        data: { ...post.data, slug },
        content: post.content.substring(0, 300),
      }
    })

    return data
  })((require as any).context('../../content/blog', true, /\.md$/))

  return {
    posts,
  }
}

export default Index
