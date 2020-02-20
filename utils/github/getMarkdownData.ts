import { getContent } from '../../open-authoring/github/api'
import { b64DecodeUnicode } from '../../open-authoring/utils/base64'
import { readFile } from '../readFile'
import { SourceProviderConnection } from './sourceProviderConnection'
import path from 'path'
import matter from 'gray-matter'

const getMarkdownData = async (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection
) => {
  if (sourceProviderConnection) {
    const response = await getContent(
      sourceProviderConnection.forkFullName,
      sourceProviderConnection.headBranch || 'master',
      filePath,
      sourceProviderConnection.accessToken
    )

    const { content: markdownBody, data: frontmatter } = matter(
      b64DecodeUnicode(response.data.content)
    )

    return {
      sha: response.data.sha,
      fileRelativePath: filePath,
      data: { frontmatter, markdownBody },
    }
  } else {
    const doc = matter(await readFile(path.resolve(`${filePath}`)))
    return {
      fileRelativePath: filePath,
      data: { frontmatter: doc.data, markdownBody: doc.content },
    }
  }
}

export default getMarkdownData
