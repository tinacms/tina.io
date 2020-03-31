import { SourceProviderConnection } from './github/sourceProviderConnection'
import { readFile } from './readFile'
import path from 'path'
import { getDecodedJsonData } from './github/getJsonData'

export const getJsonData = async (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection,
  accessToken: string
) => {
  if (sourceProviderConnection) {
    return getDecodedJsonData(filePath, sourceProviderConnection, accessToken)
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
