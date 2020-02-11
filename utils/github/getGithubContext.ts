export function getGithubContext(ctx: { req: any }) {
  return {
    accessToken: ctx.req.cookies['tina-github-auth'],
    forkFullName: ctx.req.cookies['tina-github-fork-name'],
  }
}
