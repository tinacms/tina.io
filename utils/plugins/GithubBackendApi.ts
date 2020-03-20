import { b64EncodeUnicode } from '../../open-authoring/utils/base64'
import GithubError from '../../open-authoring/github/api/GithubError'

export class GithubBackendApi {
  proxy: string
  constructor(proxy: string) {
    this.proxy = proxy
  }

  async getUser() {
    // uses proxy
    try {
      const response = await fetch(this.proxy, {
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
      return // Bubble up error here?
    } catch (err) {
      return // Bubble up error here?
    }
  }

  async createPR(baseRepoFullName, forkRepoFullName, headBranch, title, body) {
    try {
      const response = await fetch(this.proxy, {
        method: 'POST',
        body: JSON.stringify({
          proxy_data: {
            url: `https://api.github.com/repos/${baseRepoFullName}/pulls`,
            method: 'POST',
            data: {
              title: title ? title : 'Update from TinaCMS',
              body: body ? body : 'Please pull these awesome changes in!',
              head: `${forkRepoFullName.split('/')[0]}:${headBranch}`,
              base: process.env.BASE_BRANCH,
            },
          },
        }),
      })

      const data = await response.json()

      return data
    } catch (err) {
      return err // Returning error here? but other functions catch and swallow
    }
  }

  async fetchExistingPR(baseRepoFullName, forkRepoFullName, headBranch) {
    try {
      const response = await fetch(this.proxy, {
        method: 'POST',
        body: JSON.stringify({
          proxy_data: {
            url: `https://api.github.com/repos/${baseRepoFullName}/pulls`,
            method: 'GET',
          },
        }),
      })

      const data = await response.json()

      for (var i = 0; i < data.length; i++) {
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

  async getBranch(repoFullName: string, branch: string) {
    try {
      const response = await fetch(this.proxy, {
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
      return // TODO - should we be throwing error here?
    } catch (err) {
      return //TODO - also here?
    }
  }

  async save(
    repo: string,
    branch: string,
    filePath: string,
    sha: string,
    formData: string,
    message: string = 'Update from TinaCMS'
  ) {
    const response = await fetch(this.proxy, {
      method: 'POST',
      body: JSON.stringify({
        proxy_data: {
          url: `https://api.github.com/repos/${repo}/contents/${filePath}`,
          method: 'PUT',
          data: {
            message,
            content: b64EncodeUnicode(formData),
            sha,
            branch: branch,
          },
        },
      }),
    })

    const data = await response.json()

    //2xx status codes
    if (response.status.toString()[0] == '2') return data

    throw new GithubError(response.statusText, response.status)
  }
}
