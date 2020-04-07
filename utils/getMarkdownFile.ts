import path from 'path'
import matter from 'gray-matter'
import { readFile } from './readFile'
import { formatExcerpt } from '.'
import {
  getMarkdownFile as getGithubMarkdownFile,
  SourceProviderConnection,
} from 'github-tinacms-content'

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

export const getMarkdownFile = (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection,
  accessToken: string
) => {
  if (sourceProviderConnection) {
    return getGithubMarkdownFile(
      filePath,
      sourceProviderConnection,
      accessToken
    )
  } else {
    return readMarkdownFile(filePath)
  }
}
