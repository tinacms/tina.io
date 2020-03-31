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
      return err // TODO - this should be caught outside of this scope
    })
}
