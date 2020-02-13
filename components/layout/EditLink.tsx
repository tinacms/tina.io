import { useEffect } from 'react'

export const EditLink = () => {
  const onClick = async () => {
    const url = `https://github.com/login/oauth/authorize?scope=public_repo&client_id=${process.env.GITHUB_CLIENT_ID}`
    const code = await waitForURLQueryParam(url, 'code')
    const token = requestGithubAccessToken(code)
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
  url: string,
  paramKey: string
): Promise<string> => {
  let authTab
  return new Promise((resolve, reject) => {
    authTab = window.open(
      url,
      '_blank',
      'fullscreen=no, width=1000, height=800'
    )

    const cancelAuth = () => {
      checkForAuthFinished && clearInterval(checkForAuthFinished)
    }

    const checkForAuthFinished = setInterval(() => {
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
