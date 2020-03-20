const axios = require('axios')
const qs = require('qs')

export const getContent = async (
  repoFullName,
  headBranch,
  path,
  accessToken
) => {
  return axios({
    method: 'GET',
    url: `https://api.github.com/repos/${repoFullName}/contents/${path}?ref=${headBranch}`,
    headers: {
      Authorization: 'token ' + accessToken,
    },
  })
    .then(resp => {
      return resp
    })
    .catch(err => {
      return err
    })
}

export const createAccessToken = (clientId, clientSecret, code, state) => {
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
