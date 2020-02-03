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

export async function unstable_getStaticProps(ctx) {
  let { slug: slugs } = ctx.params

  const slug = slugs.join('/')
  const content = await import(`../../content/docs/${slug}.md`)
  const doc = matter(content.default)

  const docsNavData = await import('../../content/pages/toc-doc.json')
  // workaround for json data imported as indexed Obj
  const docsNav = Object.keys(docsNavData).map(function(key) {
    return docsNavData[key]
  })

  return {
    props: {
      doc: {
        data: { ...doc.data, slug },
        content: doc.content,
      },
      docsNav,
    },
  }
}

export async function unstable_getStaticPaths() {
  const fg = require('fast-glob')
  const contentDir = './content/docs/'
  const files = await fg(`${contentDir}**/*.md`)
  return files.map(file => {
    const path = file.substring(contentDir.length, file.length - 3)
    return { params: { slug: path.split('/') } }
  })
}
