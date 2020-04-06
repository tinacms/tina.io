const axios = require('axios')

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
}
