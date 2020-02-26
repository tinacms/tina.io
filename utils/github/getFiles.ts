import { getContent } from '../../open-authoring/github/api'
import { SourceProviderConnection } from './sourceProviderConnection'
import path from 'path'

const getFiles = async (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection
) => {
  if (sourceProviderConnection) {
    const response = await getContent(
      sourceProviderConnection.forkFullName,
      sourceProviderConnection.headBranch || 'master',
      filePath,
      sourceProviderConnection.accessToken
    )

    return response.data
      .filter(file => file.type === 'file')
      .map(file => file.path)
  } else {
    // grab all md files
    const fg = require('fast-glob')
    const files = await fg(path.resolve(filePath, '*'))

    return files
  }
}

export default getFiles
