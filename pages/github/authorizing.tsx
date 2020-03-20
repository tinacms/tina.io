import { useEffect } from 'react'
import { AuthLayout } from '../../components/layout'

export default function Authorizing() {
  async function handleAuthCode(code: string, authState: string) {
    await requestGithubAccessToken(code, authState)
  }

  const requestGithubAccessToken = async (code: string, authState: string) => {
    const resp = await fetch(
      `/api/create-github-access-token?code=${code}&state=${authState}`
    )
  }

  useEffect(() => {
    ;(async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      const state = urlParams.get('state')

      await handleAuthCode(code, state)

      window.location.assign('/github/fork')
    })()
  }, [])
  return (
    <AuthLayout>
      <h2>Authorizing with Github, Please wait...</h2>
    </AuthLayout>
  )
}
