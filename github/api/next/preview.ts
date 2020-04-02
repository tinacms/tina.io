import { FORK_COOKIE_KEY, HEAD_BRANCH_COOKIE_KEY } from 'react-tinacms-github'

const GITHUB_ACCESS_TOKEN_COOKIE_KEY = 'github_access_token'

export default (req, res) => {
  const previewData = {
    fork_full_name: req.cookies[FORK_COOKIE_KEY],
    github_access_token: req.cookies[GITHUB_ACCESS_TOKEN_COOKIE_KEY],
    head_branch: req.cookies[HEAD_BRANCH_COOKIE_KEY] || 'master',
  }
  res.setPreviewData(previewData)
  res.status(200).end()
}
