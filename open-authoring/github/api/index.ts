const axios = require('axios')
const qs = require('qs')
import { getForkName, getHeadBranch } from '../../utils/repository'

const getBranch = async (repoFullName, branch) => {
  // uses proxy
  try {
    const response = await fetch(`/api/proxy-github`, {
      method: 'POST',
      body: JSON.stringify({
        proxy_data: {
          url: `https://api.github.com/repos/${repoFullName}/git/ref/heads/${branch}`,
          method: 'GET',
        },
      }),
    })

    const data = await response.json()
    if (response.status === 200) return data
    return
  } catch (err) {
    return
  }
}

export const isForkValid = async (forkName: string) => {
  const branch = getHeadBranch()

  const forkData = await getBranch(forkName, branch)
  if (!forkData) return false
  if (forkData.ref === 'refs/heads/' + branch) {
    return true
  }
  return false
}

//TODO - move axios endpoints into own file from fetch requests
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
