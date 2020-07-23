import { getJsonPreviewProps } from '../getJsonPreviewProps'
import { getMarkdownPreviewProps } from '../getMarkdownPreviewProps'

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

  return {
    props: {
      ...currentDoc,
      docsNav: await getDocsNav(preview, previewData),
      nextPage: await getPageRef(
        currentDoc.file.data.frontmatter.next,
        preview,
        previewData
      ),
      prevPage: await getPageRef(
        currentDoc.file.data.frontmatter.prev,
        preview,
        previewData
      ),
    },
  }
}

export async function getPageRef(
  slug: string = null,
  preview: boolean,
  previewData: any
) {
  if (!slug) {
    return {
      slug: null,
      title: null,
    }
  }
  const prevDocPreviewData = await getMarkdownPreviewProps(
    `content${slug}.md`,
    preview,
    previewData
  )

  const { title } = prevDocPreviewData.props.file.data.frontmatter

  return { slug, title }
}
