import { getGithubDataFromPreviewProps } from '../github/sourceProviderConnection'
import getMarkdownData from '../github/getMarkdownData'
import getJsonData from '../github/getJsonData'
import OpenAuthoringError from '../../open-authoring/OpenAuthoringError'

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
  // if (!accessToken) {
  //   console.log("odd");
    
  //   throw new OpenAuthoringError("No auth token.", 401)
  // }

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
        slug: file.data.frontmatter.next,
        title: nextDocPage && nextDocPage.title,
      },
      prevPage: {
        slug: file.data.frontmatter.prev,
        title: prevDocPage && prevDocPage.title,
      },
    },
  }
}
