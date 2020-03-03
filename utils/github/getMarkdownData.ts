import { readFile } from '../readFile'
import { SourceProviderConnection } from './sourceProviderConnection'
import path from 'path'
import matter from 'gray-matter'
import getDecodedData from './getDecodedData'
import { formatExcerpt } from '..'

const getMarkdownData = async (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection
) => {
  if (sourceProviderConnection) {
    const response = await getDecodedData(
      sourceProviderConnection.forkFullName,
      sourceProviderConnection.headBranch || 'master',
      filePath,
      sourceProviderConnection.accessToken
    )

    const { content: markdownBody, data: frontmatter } = matter(
      response.content
    )

    return {
      sha: response.sha,
      fileRelativePath: filePath,
      data: { frontmatter, markdownBody },
    }
  } else {
    const doc = matter(await readFile(path.resolve(`${filePath}`)))
    return {
      fileRelativePath: filePath,
      data: {
        frontmatter: doc.data,
        excerpt: formatExcerpt(doc.content),
        markdownBody: doc.content,
      },
    }
  }
}

export default getMarkdownData
