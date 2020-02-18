const axios = require('axios')
const qs = require('qs')
const { b64EncodeUnicode } = require('../../utils/base64')
const baseBranch = process.env.BASE_BRANCH

const fetchExistingPR = (
  baseRepoFullName,
  forkRepoFullName,
  headBranch,
  token
) => {
  return axios({
    method: 'GET',
    url: `https://api.github.com/repos/${baseRepoFullName}/pulls`,
    headers: {
      Authorization: 'token ' + token,
    },
  })
    .then(response => {
      for (i = 0; i < response.data.length; i++) {
        const pull = response.data[i]
        if (headBranch === pull.head.ref) {
          if (
            pull.head.repo.full_name === forkRepoFullName &&
            pull.base.repo.full_name === baseRepoFullName
          ) {
            return pull // found matching PR
          }
        }
      }
      return
    })
    .catch(err => {
      console.log(err)
      return
    })
}

const createPR = (
  baseRepoFullName,
  forkRepoFullName,
  headBranch,
  accessToken,
  title,
  body
) => {
  return axios({
    method: 'POST',
    url: `https://api.github.com/repos/${baseRepoFullName}/pulls`,
    headers: {
      Authorization: 'token ' + accessToken,
    },
    data: {
      title: title ? title : 'Update from TinaCMS',
      body: body ? body : 'Please pull these awesome changes in!',
      head: `${forkRepoFullName.split('/')[0]}:${headBranch}`,
      base: baseBranch,
    },
  })
}

const getContent = async (repoFullName, headBranch, path, accessToken) => {
  return axios({
    method: 'GET',
    url: `https://api.github.com/repos/${repoFullName}/contents/${path}?ref=${headBranch}`,
    headers: {
      Authorization: 'token ' + accessToken,
    },
  })
}

const saveContent = async (
  repoFullName,
  headBranch,
  path,
  accessToken,
  sha,
  content,
  message
) => {
  return axios({
    method: 'PUT',
    url: `https://api.github.com/repos/${repoFullName}/contents/${path}`,
    headers: {
      Authorization: 'token ' + accessToken,
    },
    data: {
      message,
      content: b64EncodeUnicode(content),
      sha,
      branch: headBranch,
    },
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

const createFork = (repoFullName, accessToken) => {
  return axios({
    method: 'POST',
    url: `https://api.github.com/repos/${repoFullName}/forks`,
    headers: {
      Authorization: 'token ' + accessToken,
    },
  })
}

module.exports = {
  createPR,
  saveContent,
  getContent,
  createAccessToken,
  createFork,
  fetchExistingPR,
}
