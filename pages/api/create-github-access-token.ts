import { createAuthHandler } from 'next-tinacms-github'

export default createAuthHandler(
  process.env.GITHUB_CLIENT_ID || '',
  process.env.GITHUB_CLIENT_SECRET || ''
)
