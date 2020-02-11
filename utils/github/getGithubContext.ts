interface GithubCtx {
  forkFullName: string
  branch: string
  accessToken: string
  baseRepoFullName: string
}
export const getGithubContext = (ctx: { req: any; query: any }): GithubCtx => {
  const accessToken = ctx.req.cookies['tina-github-auth']
  const forkFullName = ctx.req.cookies['tina-github-fork-name']

  const branch = ctx.query.branch || 'master'

  return {
    forkFullName,
    branch,
    accessToken,
    baseRepoFullName: process.env.REPO_FULL_NAME,
  }
}
