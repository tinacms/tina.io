import matter from 'gray-matter'
import styled from 'styled-components'
import { formatDate } from '../../utils'
import { readFile } from '../../utils/readFile'

import {
  Layout,
  Hero,
  Wrapper,
  MarkdownContent,
  RichTextWrapper,
} from '../../components/layout'
const fg = require('fast-glob')

export default function BlogTemplate(props) {
  const frontmatter = props.post.data
  const markdownBody = props.post.content
  return (
    <Layout pathname="/">
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

export async function unstable_getStaticProps(ctx) {
  const { slug } = ctx.params
  //TODO - change to fs.readFile once we move to getStaticProps
  const content = await readFile(`content/blog/${slug}.md`)
  const post = matter(content)

  return {
    props: {
      // fileRelativePath: `src/posts/${slug}.md`,
      post: {
        data: { ...post.data, slug },
        content: post.content,
      },
    },
  }
}

export async function unstable_getStaticPaths() {
  const blogs = await fg(`./content/blog/**/*.md`)
  return blogs.map(file => {
    const slug = file
      .split('/blog/')[1]
      .replace(/ /g, '-')
      .slice(0, -3)
      .trim()
    return { params: { slug } }
  })
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
