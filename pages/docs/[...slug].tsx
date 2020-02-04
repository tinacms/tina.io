import matter from 'gray-matter'
import styled, { css } from 'styled-components'
import {
  Layout,
  Header,
  MarkdownContent,
  RichTextWrapper,
  Wrapper,
} from '../../components/layout'

import { DocsNav, NavSection } from '../../components/ui/DocsNav'

export default function DocTemplate(props) {
  return (
    <Layout color={'seafoam'} fixedIcon noFooter>
      <DocsLayout>
        <DocsNav navItems={props.docsNav} />
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
  padding: 6rem 0 3rem 0;

  @media (min-width: 1100px) {
    display: grid;
    grid-template-areas: 'nav content';
    grid-template-columns: 14rem auto;
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

    @media (min-width: 800px) {
      font-size: 3rem;
    }

    @media (min-width: 1200px) {
      font-size: 2.5rem;
    }
  }
`

DocTemplate.getInitialProps = async function(ctx) {
  const { slug: slugs } = ctx.query
  const fullSlug = slugs.join('/')
  const content = await import(`../../content/docs/${fullSlug}.md`)
  const doc = matter(content.default)

  const docsNavData = await import('../../content/pages/toc-doc.json')

  return {
    doc: {
      data: { ...doc.data, slug: fullSlug },
      content: doc.content,
    },
    docsNav: docsNavData.default,
  }
}
