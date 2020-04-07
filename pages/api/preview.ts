import { createPreviewFn } from 'next-tinacms-github'
import {
  FORK_COOKIE_KEY,
  HEAD_BRANCH_COOKIE_KEY,
} from '../../open-authoring/open-authoring/repository'
import { GITHUB_ACCESS_TOKEN_COOKIE_KEY } from './constants'

export default createPreviewFn(
  FORK_COOKIE_KEY,
  HEAD_BRANCH_COOKIE_KEY,
  GITHUB_ACCESS_TOKEN_COOKIE_KEY
)
