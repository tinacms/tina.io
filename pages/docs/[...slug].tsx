import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/layout/Layout'
import Header from '../../components/layout/Header'

export default function DocTemplate(props) {
  return (
    <Layout pathname="/">
      <Header />
      <h1>{props.post.data.title}</h1>
      <ReactMarkdown source={props.post.content} />
    </Layout>
  )
}

DocTemplate.getInitialProps = async function(ctx) {
  const { slug: slugs } = ctx.query
  const fullSlug = slugs.join('/')
  const content = await import(`../../content/docs/${fullSlug}.md`)
  const doc = matter(content.default)

  return {
    post: {
      data: { ...doc.data, slug: fullSlug },
      content: doc.content,
    },
  }
}
