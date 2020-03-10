import { useEffect } from 'react'
import { AuthLayout } from '../../components/layout'
import styled from 'styled-components'
import { Button } from '../../components/ui'

export default function StartAuth() {
  const onStartAuth = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const authState = urlParams.get('state')
    window.location.assign(
      `https://github.com/login/oauth/authorize?scope=public_repo&client_id=${process.env.GITHUB_CLIENT_ID}&state=${authState}&redirect_uri=${window.location.hostname}/github/authorizing`
    )
  }
  return (
    <AuthLayout>
      <h2>
        This site can be edited through Tina, which requires access to your
        GitHub account.
      </h2>
      <AuthButton color="primary" onClick={onStartAuth}>
        Authorize GitHub
      </AuthButton>
    </AuthLayout>
  )
}

const AuthButton = styled(Button)`
  margin: 0 auto 1rem auto;
`
