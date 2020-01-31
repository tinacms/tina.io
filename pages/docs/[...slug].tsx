import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import styled from 'styled-components'

import {
  Layout,
  Header,
  MarkdownContent,
  RichTextWrapper,
  Wrapper,
} from '../../components/layout'

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
    <Layout pathname="/" buttonColor={'seafoam'}>
      <DocsLayout>
        <DocsNav>{props.docsNav.map(DocSection)}</DocsNav>
        <DocsContent>
          <RichTextWrapper>
            <Wrapper narrow>
              <h1>{props.doc.data.title}</h1>
              <hr />
              <MarkdownContent content={props.doc.content} />
            </Wrapper>
          </RichTextWrapper>
        </DocsContent>
      </DocsLayout>
    </Layout>
  )
}

const DocsLayout = styled.div`
  display: grid;
  grid-template-areas: 'content';
  padding: 6rem 0 3rem 0;

  @media (min-width: 800px) {
    grid-template-areas: 'nav content';
    grid-template-columns: 14rem auto;
  }
`

const DocsNav = styled.div`
  grid-area: nav;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(-100%, 0, 0);
  @media (min-width: 800px) {
    position: relative;
    transform: translate3d(0, 0, 0);
  }
`

const DocsContent = styled.div`
  grid-area: content;

  /* Adjust header sizes for docs */

  h1,
  .h1 {
    font-size: 2rem;

    @media (min-width: 800px) {
      font-size: 3rem;
    }

    @media (min-width: 1200px) {
      font-size: 2.5rem;
    }
  }

  h2,
  .h2 {
    font-size: 1.75rem;
  }
`

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
