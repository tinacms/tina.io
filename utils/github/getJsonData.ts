import { getContent } from '../../open-authoring/github/api'
import { b64DecodeUnicode } from '../../open-authoring/utils/base64'
import { readFile } from '../readFile'
import path from 'path'

const getJsonData = async (filePath: string, previewData?: any) => {
  if (previewData) {
    const { fork_full_name, github_access_token } = previewData

    const headBranch = previewData.head_branch || 'master'
    const response = await getContent(
      fork_full_name,
      headBranch,
      filePath,
      github_access_token
    )

    return {
      forkFullName: fork_full_name,
      headBranch,
      accessToken: github_access_token,
      baseRepoFullName: process.env.REPO_FULL_NAME,
      sha: response.data.sha,
      fileRelativePath: filePath,
      data: JSON.parse(b64DecodeUnicode(response.data.content)),
    }
  } else {
    const data = await readFile(path.resolve(`${filePath}`))
    return {
      data: JSON.parse(data),
    }
  }
}

export default getJsonData
