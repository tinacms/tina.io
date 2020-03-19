import {
  GITHUB_ACCESS_TOKEN_COOKIE_KEY,
  FORK_COOKIE_KEY,
  HEAD_BRANCH_COOKIE_KEY,
} from '../../open-authoring/utils/repository'

export default (req, res) => {
  const previewData = {
    fork_full_name: req.cookies[FORK_COOKIE_KEY],
    github_access_token: req.cookies[GITHUB_ACCESS_TOKEN_COOKIE_KEY],
    head_branch: req.cookies[HEAD_BRANCH_COOKIE_KEY] || 'master',
  }
  res.setPreviewData(previewData)
  res.status(200).end()
}
