import { readFile } from '../readFile'
import { SourceProviderConnection } from './sourceProviderConnection'
import path from 'path'
import getDecodedData from './getDecodedData'

const getJsonData = async (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection,
  accessToken: string
) => {
  
  if (sourceProviderConnection && accessToken) {    
    const response = await getDecodedData(
      sourceProviderConnection.forkFullName,
      sourceProviderConnection.headBranch || 'master',
      filePath,
      accessToken
    )

    return {
      sha: response.sha,
      fileRelativePath: filePath,
      data: JSON.parse(response.content),
    }
  } else {
    const data = await readFile(path.resolve(`${filePath}`))    
    return {
      fileRelativePath: filePath,
      data: JSON.parse(data),
    }
  }
}

export default getJsonData
