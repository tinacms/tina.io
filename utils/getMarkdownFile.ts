import path from 'path'
import matter from 'gray-matter'
import { readFile } from './readFile'
import { formatExcerpt } from '.'
import { getGithubPreviewProps, parseMarkdown } from 'next-tinacms-github'
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
  if (preview) {
    let previewProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: fileRelativePath,
      parse: parseMarkdown,
    })
    if (!previewProps.props.error) {
      //TODO - make parse async so we can use parseMarkdownWithExcerpt function above
      previewProps.props.file.data.excerpt = await formatExcerpt(
        previewProps.props.file.data.markdownBody
      )
    }
    return {
      ...previewProps,
      props: {
        tocItems: toc(previewProps.props.file.data.markdownBody).content,
      },
    }
  }
  const file = await readMarkdownFile(fileRelativePath)
  return {
    props: {
      error: null,
      preview: false,
      file,
      tocItems: toc(file.data.markdownBody).content,
    },
  }
}
