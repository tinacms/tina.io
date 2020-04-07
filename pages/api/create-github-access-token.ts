import { createCreateAccessTokenFn } from 'next-tinacms-github'

export default createCreateAccessTokenFn(
  process.env.GITHUB_CLIENT_ID,
  process.env.GITHUB_CLIENT_SECRET
)
