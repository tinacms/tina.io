import { useEffect } from 'react'
import Cookies from 'js-cookie'

export const EditLink = () => {
  const onClick = async () => {
    let authTab
    const url = `https://github.com/login/oauth/authorize?scope=public_repo&client_id=${process.env.GITHUB_CLIENT_ID}`
    authTab = window.open(
      url,
      '_blank',
      'fullscreen=no, width=1000, height=800'
    )

    const code = await waitForURLQueryParam(authTab, 'code')
    const token = await requestGithubAccessToken(code)
    Cookies.set('github_access_token', token)

    authTab.location = '/github/fork'

    function updateStorageEvent(e) {
      if (e.key == 'fork_full_name') {
        Cookies.set('fork_full_name', e.newValue)
        fetch(`/api/preview`).then(() => {
          window.location.reload()
        })
      }
    }
    localStorage.setItem('fork_full_name', '')
    window.addEventListener('storage', updateStorageEvent, true)
  }

  useEffect(() => {
    // TODO - cancel waitForURLQueryParam
  })

  return (
    <div onClick={onClick}>
      <a>Edit this page</a>
    </div>
  )
}

const requestGithubAccessToken = async (code: string) => {
  const resp = await fetch(`/api/get-github-access-token?code=${code}`)
  const tokenData = await resp.json()
  return tokenData.access_token
}

const waitForURLQueryParam = (
  authTab: Window,
  paramKey: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cancelAuth = () => {
      checkForAuthFinished && clearInterval(checkForAuthFinished)
    }

    const checkForAuthFinished = setInterval(() => {
      //todo - connect to this from a localstorage event instead of interval
      if (!authTab || authTab.closed) {
        reject('Window was closed')
      }

      const urlParams = new URLSearchParams(authTab.location.search)
      const code = urlParams.get(paramKey)

      if (code) {
        cancelAuth()
        resolve(code)
      }
    }, 1000)
  })
}
