import matter from 'gray-matter'
import styled, { css } from 'styled-components'
import ReactMarkdown from 'react-markdown'

import Layout from '../../components/layout/Layout'
import Hero from '../../components/layout/Hero'
import Wrapper from '../../components/layout/Wrapper'

export default function BlogTemplate(props) {
  return (
    <Layout pathname="/">
      <Hero>
        <BlogTitle>{props.post.data.title}</BlogTitle>
      </Hero>
      <BlogWrapper>
        <BlogMeta>
          <p>By: {props.post.data.author}</p>
          <p>{props.post.data.date}</p>
        </BlogMeta>
        <ReactMarkdown source={props.post.content} />
      </BlogWrapper>
    </Layout>
  )
}

BlogTemplate.getInitialProps = async function(ctx) {
  const { slug } = ctx.query
  const content = await import(`../../content/blog/${slug}.md`)
  const post = matter(content.default)

  return {
    // fileRelativePath: `src/posts/${slug}.md`,
    post: {
      data: { ...post.data, slug },
      content: post.content,
    },
  }
}

const BlogWrapper = styled(Wrapper)`
  padding: 4rem 2rem;
  max-width: 768px;
`

const BlogTitle = styled(({ children, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <h2 className="h1">{children}</h2>
    </div>
  )
})`
  h2 {
    max-width: 12em;
    text-align: center;
    margin: 0 auto;
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
