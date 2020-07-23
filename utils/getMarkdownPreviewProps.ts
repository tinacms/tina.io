import path from 'path'
import matter from 'gray-matter'
import { readFile } from './readFile'
import { formatExcerpt } from '.'
import { parseMarkdown, getGithubFile, GithubFile } from 'next-tinacms-github'
import toc from 'markdown-toc'
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
    tocItems = toc(file.data.markdownBody).content
  } catch (e) {
    error = e
  }

  return {
    props: {
      error: null,
      preview: !!preview,
      file,
      tocItems: toc(file.data.markdownBody).content,
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
      fileRelativePath,
      repoFullName: previewData.working_repo_full_name,
      branch: previewData.head_branch,
      accessToken: previewData.github_access_token,
      parse: parseMarkdown,
    })
  }

  const file = await readMarkdownFile(fileRelativePath)

  return { sha: '', ...file }
}
