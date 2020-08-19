import path from 'path'
import matter from 'gray-matter'
import { readFile } from './readFile'
import { formatExcerpt } from '.'
import { parseMarkdown, getGithubFile, GithubFile } from 'next-tinacms-github'
import { slugifyTocHeading as slugify } from './docs/slugifyToc'
import getTocContent from './getTocContent'

export const readMarkdownFile = async (filePath: string) => {
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



export const getMarkdownPreviewProps = async (
  fileRelativePath: string,
  preview: boolean,
  previewData: any
) => {
  let file = null
  let error = null
  let tocItems = null

  try {
    file = await getMarkdownFile(fileRelativePath, preview, previewData)
    file.data.excerpt = await formatExcerpt(file.data.markdownBody)
    tocItems = getTocContent(file.data.markdownBody, { slugify })
  } catch (e) {
    error = e
  }

  return {
    props: {
      error,
      preview: !!preview,
      file,
      tocItems,
    },
  }
}

export async function getMarkdownFile(
  fileRelativePath: string,
  preview: boolean,
  previewData: any
): Promise<GithubFile<any>> {
  if (preview) {
    return getGithubFile<any>({
      ...previewData,
      fileRelativePath,
      parse: parseMarkdown,
    })
  }

  const file = await readMarkdownFile(fileRelativePath)

  return { sha: '', ...file }
}
