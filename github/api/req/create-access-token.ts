const qs = require('qs')
const axios = require('axios')
import { serialize } from 'cookie'

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
      res.status(200).json({})
    }
  })
}

const createAccessToken = (clientId, clientSecret, code, state) => {
  return axios.post(
    `https://github.com/login/oauth/access_token`,
    qs.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      state,
    })
  )
}
