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
      githubContext.branch,
      filePath,
      githubContext.accessToken
    )

    return {
      fileRelativePath: filePath,
      sha: response.data.sha,
      forkFullName: githubContext.forkFullName,
      branch: githubContext.branch,
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
