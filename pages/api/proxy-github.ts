import { createProxy } from 'next-tinacms-github'
import { GITHUB_ACCESS_TOKEN_COOKIE_KEY } from './constants'

export default createProxy(GITHUB_ACCESS_TOKEN_COOKIE_KEY)
