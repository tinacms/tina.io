import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

import { Layout, Header, MarkdownContent } from '../../components/layout'

interface DocSection {
  id: string
  slug: string
  title: string
  items: DocSection[]
}

const DocSection = (section: DocSection) => {
  return (
    <div>
      {section.slug ? (
        <Link href={section.slug}>
          <a>{section.title}</a>
        </Link>
      ) : (
        <b>{section.title}</b>
      )}
      {(section.items || []).map(item => (
        <DocSection {...item} />
      ))}
    </div>
  )
}

export default function DocTemplate(props) {
  return (
    <Layout pathname="/">
      <Header />
      <h1>{props.doc.data.title}</h1>
      {props.docsNav.map(DocSection)}
      <MarkdownContent content={props.doc.content} />
    </Layout>
  )
}

DocTemplate.getInitialProps = async function(ctx) {
  const { slug: slugs } = ctx.query
  const fullSlug = slugs.join('/')
  const content = await import(`../../content/docs/${fullSlug}.md`)
  const doc = matter(content.default)

  const docsNavData = await import('../../content/pages/toc-doc.json')

  //workaround for json data imported as indexed Obj
  const docsNav = Object.keys(docsNavData).map(function(key) {
    return docsNavData[key]
  })

  return {
    doc: {
      data: { ...doc.data, slug: fullSlug },
      content: doc.content,
    },
    docsNav,
  }
}
