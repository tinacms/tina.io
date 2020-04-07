import { createPreviewFn } from 'next-tinacms-github'
import { GITHUB_ACCESS_TOKEN_COOKIE_KEY } from './constants'
import { FORK_COOKIE_KEY, HEAD_BRANCH_COOKIE_KEY } from 'react-tinacms-github'

export default createPreviewFn(
  FORK_COOKIE_KEY,
  HEAD_BRANCH_COOKIE_KEY,
  GITHUB_ACCESS_TOKEN_COOKIE_KEY
)
