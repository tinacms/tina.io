const qs = require('qs')
import { serialize } from 'cookie'

const { createAccessToken } = require('../../open-authoring/github/api')

export default (req, res) => {
  createAccessToken(
    process.env.GITHUB_CLIENT_ID,
    process.env.GITHUB_CLIENT_SECRET,
    req.query.code,
    req.query.state
  ).then(tokenResp => {
    const { access_token, error } = qs.parse(tokenResp.data)
    if (error) {
      res.status(400).json({ error })
    } else {
      res.setHeader(
        'Set-Cookie',
        serialize('github_access_token', access_token, {
          path: '/',
          httpOnly: true,
        })
      )
      res.status(200).json({ access_token })
    }
  })
}
