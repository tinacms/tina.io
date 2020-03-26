import { SourceProviderManager } from './SourceProviderManager'
import popupWindow from '../../utils/popupWindow'
export class GithubManager implements SourceProviderManager {
  authenticate(): Promise<void> {
    const authState = Math.random()
      .toString(36)
      .substring(7)

    const url = `https://github.com/login/oauth/authorize?scope=public_repo&client_id=${process.env.GITHUB_CLIENT_ID}&state=${authState}`

    return new Promise(resolve => {
      let authTab
      window.addEventListener('storage', function(e) {
        if (e.key == 'github_auth_code') {
          fetch(
            `/api/create-github-access-token?code=${e.newValue}&state=${authState}`
          ).then(() => {
            if (authTab) {
              authTab.close()
            }
            resolve()
          })
        }
      })

      authTab = popupWindow(url, '_blank', window, 1000, 700)
    })
  }
}
