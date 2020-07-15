import { getJsonPreviewProps } from '../getJsonPreviewProps'
import { getMarkdownPreviewProps } from '../getMarkdownFile'

export async function getDocsNav(preview: boolean, previewData: any) {
  const previewProps = await getJsonPreviewProps(
    'content/toc-doc.json',
    preview,
    previewData
  )

  return previewProps.props.file.data
}

export async function getDocProps({ preview, previewData }: any, slug: string) {
  const currentDoc = (
    await getMarkdownPreviewProps(
      `content/docs/${slug}.md`,
      preview,
      previewData
    )
  ).props

  const docsNav = await getDocsNav(preview, previewData)

  const nextDocPage =
    currentDoc.file.data.frontmatter.next &&
    (
      await getMarkdownPreviewProps(
        `content${currentDoc.file.data.frontmatter.next}.md`,
        preview,
        previewData
      )
    ).props.file.data.frontmatter

  const prevDocPage =
    currentDoc.file.data.frontmatter.prev &&
    (
      await getMarkdownPreviewProps(
        `content${currentDoc.file.data.frontmatter.prev}.md`,
        preview,
        previewData
      )
    ).props.file.data.frontmatter

  return {
    props: {
      ...currentDoc,
      docsNav,
      nextPage: {
        slug: currentDoc.file.data.frontmatter.next || null,
        title: (nextDocPage && nextDocPage.title) || null,
      },
      prevPage: {
        slug: currentDoc.file.data.frontmatter.prev || null,
        title: (prevDocPage && prevDocPage.title) || null,
      },
    },
  }
}
