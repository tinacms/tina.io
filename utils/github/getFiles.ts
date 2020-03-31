import { getContent } from './getContent'
import { SourceProviderConnection } from './sourceProviderConnection'

export const getFiles = async (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection,
  accessToken: string
) => {
  const response = await getContent(
    sourceProviderConnection.forkFullName,
    sourceProviderConnection.headBranch || 'master',
    filePath,
    accessToken
  )

  return response.data
    .filter(file => file.type === 'file')
    .map(file => file.path)
}
