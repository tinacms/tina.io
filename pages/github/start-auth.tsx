import { useEffect } from 'react'

export default function StartAuth() {
  const onStartAuth = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?scope=public_repo&client_id=${process.env.GITHUB_CLIENT_ID}`
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
