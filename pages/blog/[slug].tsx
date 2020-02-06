import matter from 'gray-matter'
import styled from 'styled-components'
import { formatDate, formatExcerpt } from '../../utils'

import {
  Layout,
  Hero,
  Wrapper,
  MarkdownContent,
  RichTextWrapper,
} from '../../components/layout'
import { NextSeo } from 'next-seo'
import siteData from '../../content/siteConfig.json'

export default function BlogTemplate(props) {
  const frontmatter = props.post.data
  const markdownBody = props.post.content
  const excerpt = formatExcerpt(props.post.content)
  return (
    <Layout pathname="/">
      <NextSeo
        title={frontmatter.title}
        titleTemplate={'%s | ' + siteData.title + ' Blog'}
        description={excerpt}
        openGraph={{
          title: frontmatter.title,
          description: excerpt,
        }}
      />
      <Hero>{frontmatter.title}</Hero>
      <BlogWrapper>
        <RichTextWrapper>
          <BlogMeta>
            <p>By: {frontmatter.author}</p>
            <p>{formatDate(frontmatter.date)}</p>
          </BlogMeta>
          <MarkdownContent escapeHtml={false} content={markdownBody} />
        </RichTextWrapper>
      </BlogWrapper>
    </Layout>
  )
}

BlogTemplate.getInitialProps = async function(ctx) {
  const { slug } = ctx.query
  //TODO - change to fs.readFile once we move to getStaticProps
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
  padding-top: 4rem;
  padding-bottom: 3rem;
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
