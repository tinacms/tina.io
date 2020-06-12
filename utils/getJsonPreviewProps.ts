import { readFile } from './readFile'
import path from 'path'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'

export const getJsonPreviewProps = async (
  fileRelativePath: string,
  preview: boolean,
  previewData: any
) => {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: fileRelativePath,
      parse: parseJson,
    })
  }
  const data = await readJsonFile(fileRelativePath)
  return {
    props: {
      error: null,
      preview: false,
      file: {
        fileRelativePath: fileRelativePath,
        data,
      },
    },
  }
}

const readJsonFile = async (filePath: string) => {
  const data = await readFile(path.resolve(`${filePath}`))
  return JSON.parse(data)
}
