import DocTemplate from './[...slug]'
import matter from 'gray-matter'
import { readFile } from '../../utils/readFile'

export async function unstable_getStaticProps(ctx) {
  const content = await readFile(`content/docs/index.md`)
  const doc = matter(content)

  const docsNavData = await import('../../content/toc-doc.json')
  const nextDocPage =
    doc.data.next && matter(await readFile(`content${doc.data.next}.md`))
  const prevDocPage =
    doc.data.prev && matter(await readFile(`content${doc.data.prev}.md`))

  return {
    props: {
      markdownFile: {
        data: { frontmatter: doc.data, markdownBody: doc.content },
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
    revalidate: 3156400,
  }
}

export default DocTemplate
