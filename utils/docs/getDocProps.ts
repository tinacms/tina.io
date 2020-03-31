import { getGithubDataFromPreviewProps } from '../github/sourceProviderConnection'
import { getJsonData } from '../github/getJsonData'
import { getMarkdownData } from '../getMarkdownData'

export async function getDocProps({ preview, previewData }: any, slug: string) {
  const {
    sourceProviderConnection,
    accessToken,
  } = getGithubDataFromPreviewProps(previewData)
  const file = await getMarkdownData(
    `content/docs/${slug}.md`,
    sourceProviderConnection,
    accessToken
  )

  const getJson = async (filePath: string) => {
    return (await getJsonData(filePath, sourceProviderConnection, accessToken))
      .data
  }

  const getMarkdown = async (filePath: string) => {
    return (
      await getMarkdownData(filePath, sourceProviderConnection, accessToken)
    ).data
  }

  const docsNavData = await getJson('content/toc-doc.json')
  const nextDocPage =
    file.data.frontmatter.next &&
    (await getMarkdown(`content${file.data.frontmatter.next}.md`)).frontmatter
  const prevDocPage =
    file.data.frontmatter.prev &&
    (await getMarkdown(`content${file.data.frontmatter.prev}.md`)).frontmatter

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
