import matter from 'gray-matter'
import styled, { css } from 'styled-components'

import {
  Layout,
  Hero,
  HeroTitle,
  Wrapper,
  MarkdownContent,
  RichTextWrapper,
} from '../../components/layout'

export default function BlogTemplate(props) {
  return (
    <Layout pathname="/">
      <Hero>{props.post.data.title}</Hero>
      <BlogWrapper>
        <RichTextWrapper>
          <BlogMeta>
            <p>By: {props.post.data.author}</p>
            <p>{props.post.data.date}</p>
          </BlogMeta>
          <MarkdownContent content={props.post.content} />
        </RichTextWrapper>
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

const BlogMeta = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-grow: 1;
  margin-bottom: 1.5rem;
  margin-top: -0.5rem;
  opacity: 0.5;
  p {
    margin: 0 !important;
  }
`
