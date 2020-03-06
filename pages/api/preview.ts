export default (req, res) => {
  const previewData = {
    fork_full_name: req.cookies['fork_full_name'],
    github_access_token: req.cookies['github_access_token'],
    head_branch: req.cookies['head_branch']
  }
  res.setPreviewData(previewData)
  res.status(200).end()
}
