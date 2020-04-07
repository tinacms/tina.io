import { readFile } from './readFile'
import path from 'path'
import {
  getJsonFile as getGithubJsonFile,
  SourceProviderConnection,
} from 'github-tinacms-content'

export const getJsonFile = async (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection,
  accessToken: string
) => {
  if (sourceProviderConnection) {
    return getGithubJsonFile(filePath, sourceProviderConnection, accessToken)
  } else {
    return readJsonFile(filePath)
  }
}

const readJsonFile = async (filePath: string) => {
  const data = await readFile(path.resolve(`${filePath}`))
  return {
    fileRelativePath: filePath,
    data: JSON.parse(data),
  }
}
