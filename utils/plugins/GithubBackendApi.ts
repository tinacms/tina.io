import { saveContent } from '../../open-authoring/github/api'

export class GithubBackendApi {
  proxy: string
  constructor(proxy: string) {
    this.proxy = proxy
  }

  save(
    forkFullName: string,
    branch: string,
    fileRelativePath: string,
    sha: string,
    formData: string,
    message: string = 'Update from TinaCMS'
  ) {
    return saveContent(
      forkFullName,
      branch,
      fileRelativePath,
      sha,
      formData,
      message,
      this.proxy
    )
  }
}
