import { getGithubContext } from './github/getGithubContext'
import { getContent } from '../open-authoring/github/api'
import { b64DecodeUnicode } from './base64'

export async function getJsonFormProps(
  ctx: { req: any; query: any },
  filePath: string
) {
  if (process.env.USE_CONTENT_API) {
    const githubContext = getGithubContext(ctx)

    const response = await getContent(
      githubContext.forkFullName,
      githubContext.headBranch,
      filePath,
      githubContext.accessToken
    )

    return {
      baseRepoFullName: githubContext.baseRepoFullName,
      fileRelativePath: filePath,
      sha: response.data.sha,
      forkFullName: githubContext.forkFullName,
      headBranch: githubContext.headBranch,
      access_token: githubContext.accessToken,
      
      data: JSON.parse(b64DecodeUnicode(response.data.content)),
    }
  } else {
    const data = await import(`../content/${filePath}`)

    return {
      data,
    }
  }
}
