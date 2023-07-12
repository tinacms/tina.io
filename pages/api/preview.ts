export default function handler(req, res) {
  if (req.query?.branchName) {
    res.setPreviewData({ branch: req.query.branchName })
  }
  res.redirect('/')
}
