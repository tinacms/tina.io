import path from 'path'
import matter from 'gray-matter'
import { readFile } from './readFile'
import { formatExcerpt } from '.'
import { getGithubPreviewProps, parseMarkdown } from 'next-tinacms-github'

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

// TODO - consider maybe parse function async so we can format except here
// export async function parseMarkdownWithExcerpt<Frontmatter>(
//   content: string
// ): Promise<MarkdownData<Frontmatter> & {excerpt: string}> {
//   const { content: markdownBody, data: frontmatter } = matter(content)

//   const excerpt = await formatExcerpt(markdownBody)
//   return {
//     markdownBody,
//     frontmatter: frontmatter as Frontmatter,
//     excerpt
//   }
// }

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
    return previewProps
  }
  const file = await readMarkdownFile(fileRelativePath)
  return {
    props: {
      error: null,
      preview: false,
      file,
    },
  }
}
