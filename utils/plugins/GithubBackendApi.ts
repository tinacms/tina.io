import { b64EncodeUnicode } from '../../open-authoring/utils/base64'
import GithubError from '../../open-authoring/github/api/GithubError'

export class GithubBackendApi {
  proxy: string
  constructor(proxy: string) {
    this.proxy = proxy
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
