import matter from 'gray-matter'
import styled from 'styled-components'

import {
  Layout,
  MarkdownContent,
  RichTextWrapper,
  Wrapper,
  Pagination,
} from '../../components/layout'
import { DocsNav } from '../../components/ui/DocsNav'
import { readFile } from '../../utils/readFile'

export default function DocTemplate(props) {
  const frontmatter = props.doc.data
  const markdownBody = props.doc.content
  return (
    <Layout color={'seafoam'} fixedIcon noFooter>
      <DocsLayout>
        <DocsNav navItems={props.docsNav} />
        <DocsContent>
          <RichTextWrapper>
            <Wrapper narrow>
              <h1>{frontmatter.title}</h1>
              <hr />
              <MarkdownContent content={markdownBody} />
              <Pagination prevPage={props.prevPage} nextPage={props.nextPage} />
            </Wrapper>
          </RichTextWrapper>
        </DocsContent>
      </DocsLayout>
    </Layout>
  )
}

export async function unstable_getStaticProps(ctx) {
  let { slug: slugs } = ctx.params

  const slug = slugs.join('/')
  const content = await readFile(`content/docs/${slug}.md`)
  const doc = matter(content)

  const docsNavData = await import('../../content/toc-doc.json')
  const nextDocPage =
    doc.data.next && matter(await readFile(`content${doc.data.next}.md`))
  const prevDocPage =
    doc.data.prev && matter(await readFile(`content${doc.data.prev}.md`))

  return {
    props: {
      doc: {
        data: { ...doc.data, slug },
        content: doc.content,
      },
      docsNav: docsNavData.default,
      nextPage: {
        slug: doc.data.next,
        title: nextDocPage && nextDocPage.data.title,
      },
      prevPage: {
        slug: doc.data.prev,
        title: prevDocPage && prevDocPage.data.title,
      },
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
  }
`
