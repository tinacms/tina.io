const axios = require('axios')
const qs = require('qs')
const { b64EncodeUnicode } = require('../../utils/base64')
const baseBranch = process.env.BASE_BRANCH
const Cookies = require('js-cookie')

const fetchExistingPR = async (
  baseRepoFullName,
  forkRepoFullName,
  headBranch
) => {
  try {
    const response = await fetch(`/api/proxy-github`, {
      method: 'POST',
      body: JSON.stringify({
        proxy_data: {
          url: `https://api.github.com/repos/${baseRepoFullName}/pulls`,
          method: 'GET',
        },
      }),
    })

    const data = await response.json()

    for (i = 0; i < data.length; i++) {
      const pull = data[i]
      if (headBranch === pull.head.ref) {
        if (
          pull.head.repo?.full_name === forkRepoFullName &&
          pull.base.repo?.full_name === baseRepoFullName
        ) {
          return pull // found matching PR
        }
      }
    }

    return
  } catch (err) {
    console.log(err)
    return
  }
}

const createPR = async (
  baseRepoFullName,
  forkRepoFullName,
  headBranch,
  title,
  body
) => {
  try {
    const response = await fetch(`/api/proxy-github`, {
      method: 'POST',
      body: JSON.stringify({
        proxy_data: {
          url: `https://api.github.com/repos/${baseRepoFullName}/pulls`,
          method: 'POST',
          data: {
            title: title ? title : 'Update from TinaCMS',
            body: body ? body : 'Please pull these awesome changes in!',
            head: `${forkRepoFullName.split('/')[0]}:${headBranch}`,
            base: baseBranch,
          },
        },
      }),
    })

    const data = await response.json()

    return data
  } catch (err) {
    return err
  }
}

const saveContent = async (
  repoFullName,
  headBranch,
  path,
  sha,
  content,
  message
) => {
  const response = await fetch(`/api/proxy-github`, {
    method: 'POST',
    body: JSON.stringify({
      proxy_data: {
        url: `https://api.github.com/repos/${repoFullName}/contents/${path}`,
        method: 'PUT',
        data: {
          message,
          content: b64EncodeUnicode(content),
          sha,
          branch: headBranch,
        },
      },
    }),
  })

  const data = await response.json()

  //2xx status codes
  if (response.status.toString()[0] == '2') return data
  
  throw new Error(response.status.toString())
}

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

const getUser = async () => {
  // uses proxy
  try {
    const response = await fetch(`/api/proxy-github`, {
      method: 'POST',
      body: JSON.stringify({
        proxy_data: {
          url: `https://api.github.com/user`,
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

const isForkValid = async forkName => {
  if (!forkName) {
    forkName = Cookies.get("fork_full_name")
    if (!forkName) {
      return false
    }
  }
  const branch = Cookies.get('head_branch') || 'master'

  const forkData = await getBranch(forkName, branch)
  if (!forkData) return false
  if (forkData.ref === 'refs/heads/' + branch) {
    Cookies.set('head_branch', branch)
    return true
  }
  return false
}

const isGithubTokenValid = async () => {
  const userData = await getUser()
  if (!userData) return false
  return true
}

//TODO - move axios endpoints into own file from fetch requests
const getContent = async (repoFullName, headBranch, path, accessToken) => {
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

module.exports = {
  createPR,
  saveContent,
  getContent,
  createAccessToken,
  fetchExistingPR,
  getBranch,
  getUser,
  isForkValid,
  isGithubTokenValid,
}
