interface GithubCtx {
  forkFullName: string
  headBranch: string
  accessToken: string
  baseRepoFullName: string
}
export const getGithubContext = (ctx: { req: any; query: any }): GithubCtx => {
  const accessToken = ctx.req.cookies['tina-github-auth']
  const forkFullName = ctx.req.cookies['tina-github-fork-name']

  const headBranch = ctx.query.branch || 'master'

  return {
    forkFullName,
    headBranch,
    accessToken,
    baseRepoFullName: process.env.REPO_FULL_NAME,
  }
}
