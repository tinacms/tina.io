import path from 'path'
import matter from 'gray-matter'
import { readFile } from './readFile'
import { formatExcerpt } from '.'
import { SourceProviderConnection } from './github/sourceProviderConnection'
import { getDecodedMarkdown } from './github/getDecodedMarkdown'

const readMarkdownFile = async (filePath: string) => {
  const doc = matter(await readFile(path.resolve(`${filePath}`)))
  return {
    fileRelativePath: filePath,
    data: {
      frontmatter: doc.data,
      excerpt: await formatExcerpt(doc.content),
      markdownBody: doc.content,
    },
  }
}

export const getMarkdownData = (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection,
  accessToken: string
) => {
  if (sourceProviderConnection) {
    return getDecodedMarkdown(filePath, sourceProviderConnection, accessToken)
  } else {
    return readMarkdownFile(filePath)
  }
}
