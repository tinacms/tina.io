import { getContent } from '../../open-authoring/github/api'
import { b64DecodeUnicode } from '../../open-authoring/utils/base64'
import { readFile } from '../readFile'
import { SourceProviderConnection } from './sourceProviderConnection'
import path from 'path'

const getJsonData = async (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection
) => {

  if (sourceProviderConnection) {
    console.log("GETTING JSON DATA");
    
    const response = await getContent(
      sourceProviderConnection.forkFullName,
      sourceProviderConnection.headBranch || 'master',
      filePath,
      sourceProviderConnection.accessToken
    ) 
      
    if (response.response) {    
      if (response.response.status == 404) return "Content Not Found (perhaps the fork doesn't exist)"
    }
    
    

    return {
      sha: response.data.sha,
      fileRelativePath: filePath,
      data: JSON.parse(b64DecodeUnicode(response.data.content)),
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
