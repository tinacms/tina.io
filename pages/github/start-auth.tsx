import { useEffect } from 'react'

export default function StartAuth() {
  const onStartAuth = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const authState = urlParams.get('state')
    window.location.assign(
      `https://github.com/login/oauth/authorize?scope=public_repo&client_id=${process.env.GITHUB_CLIENT_ID}&state=${authState}`
    )
  }
  return (
    <>
      <div>
        This site can be edited through Tina, which requires a Github Account
      </div>
      <button onClick={onStartAuth}>Get Started</button>
    </>
  )
}
