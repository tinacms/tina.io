import {
  getFiles as getGithubFiles,
  SourceProviderConnection,
} from 'github-tinacms-content'
import path from 'path'

const getLocalFiles = async (filePath: string) => {
  // grab all md files
  const fg = require('fast-glob')
  const glob = path.resolve(filePath, '*')
  const files = await fg(glob)

  return files
}

export const getFiles = async (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection,
  accessToken: string
) => {
  if (sourceProviderConnection) {
    return getGithubFiles(filePath, sourceProviderConnection, accessToken)
  } else {
    return getLocalFiles(filePath)
  }
}
