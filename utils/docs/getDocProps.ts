import { getMarkdownFile } from '../getMarkdownFile'
import { getJsonFile } from '../getJsonFile'
import { getGithubDataFromPreviewProps } from '../getGithubDataFromPreviewProps'

export async function getDocProps({ preview, previewData }: any, slug: string) {
  const {
    sourceProviderConnection,
    accessToken,
  } = getGithubDataFromPreviewProps(previewData)
  const file = await getMarkdownFile(
    `content/docs/${slug}.md`,
    sourceProviderConnection,
    accessToken
  )

  const docsNavData = (
    await getJsonFile(
      'content/toc-doc.json',
      sourceProviderConnection,
      accessToken
    )
  ).data
  const nextDocPage =
    file.data.frontmatter.next &&
    (
      await getMarkdownFile(
        `content${file.data.frontmatter.next}.md`,
        sourceProviderConnection,
        accessToken
      )
    ).data.frontmatter
  const prevDocPage =
    file.data.frontmatter.prev &&
    (
      await getMarkdownFile(
        `content${file.data.frontmatter.prev}.md`,
        sourceProviderConnection,
        accessToken
      )
    ).data.frontmatter

  return {
    props: {
      markdownFile: file,
      sourceProviderConnection,
      editMode: !!preview,
      docsNav: docsNavData,
      nextPage: {
        slug: file.data.frontmatter.next || null,
        title: (nextDocPage && nextDocPage.title) || null,
      },
      prevPage: {
        slug: file.data.frontmatter.prev || null,
        title: (prevDocPage && prevDocPage.title) || null,
      },
    },
  }
}
