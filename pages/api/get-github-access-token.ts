const qs = require('qs')
const { createAccessToken } = require('../../open-authoring/github/api')

export default (req, res) => {
  createAccessToken(
    process.env.GITHUB_CLIENT_ID,
    process.env.GITHUB_CLIENT_SECRET,
    req.query.code
  ).then(tokenResp => {
    const { access_token } = qs.parse(tokenResp.data)
    res.status(200).json({ access_token })
  })
}
