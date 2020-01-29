import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/layout/Layout'
import Header from '../../components/layout/Header'

export default function BlogTemplate(props) {
  return (
    <Layout pathname="/">
      <Header />
      <h1>{props.post.data.title}</h1>
      <ReactMarkdown source={props.post.content} />
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
