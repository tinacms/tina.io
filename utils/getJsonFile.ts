import { SourceProviderConnection } from './github/sourceProviderConnection'
import { readFile } from './readFile'
import path from 'path'
import { getJsonFile as getGithubJsonFile } from './github/getJsonFile'

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
