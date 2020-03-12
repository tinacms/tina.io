import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { getUser, getBranch } from '../../open-authoring/github/api'
import { AuthLayout } from '../../components/layout'
import { Button } from '../../components/ui'
import styled from 'styled-components'

export default function Authorizing() {
  async function handleForkCreated(forkName: string) {
    Cookies.set('fork_full_name', forkName, { sameSite: 'strict' })
    await fetch(`/api/preview`)

    window.opener.window.location.href = window.opener.window.location.pathname
  }

  const createFork = async () => {
    const resp = await fetch(`/api/proxy-github`, {
      method: 'POST',
      body: JSON.stringify({
        proxy_data: {
          url: `https://api.github.com/repos/${process.env.REPO_FULL_NAME}/forks`,
          method: 'POST',
        },
      }),
    })

    const { full_name } = await resp.json()
    const forkFullName = full_name
    if (forkFullName) {
      Cookies.set('head_branch', 'master') // default fork branch
      await handleForkCreated(full_name)
      window.close()
    } else {
      alert('Could not fork the site') //TODO - show clean error message
    }
  }

  const [forkValidating, setForkValidating] = useState(true)

  useEffect(() => {
    // check if user already has a fork and if so use it
    ;(async () => {
      const branch = Cookies.get('head_branch') || 'master'

      const userData = await getUser()
      if (!userData) return setForkValidating(false)
      const login = userData.login
      const expectedFork =
        login + '/' + process.env.REPO_FULL_NAME.split('/')[1]
      const forkData = await getBranch(expectedFork, branch)
      if (!forkData) return setForkValidating(false)
      if (forkData.ref === 'refs/heads/' + branch) {
        // found fork\
        Cookies.set('head_branch', branch)
        await handleForkCreated(expectedFork)
        window.close()
        return
      }
      return setForkValidating(false)
    })()
  })

  return (
    <AuthLayout>
      {!forkValidating && (
        <>
          <h2>You will need a fork of the site to save your changes.</h2>
          <p>Later you will be able to create a pull request from Tina.</p>
          <AuthButton
            color="primary"
            onClick={() => {
              createFork()
            }}
          >
            Create a fork
          </AuthButton>
        </>
      )}
      {forkValidating && <p>Checking for fork...</p>}
    </AuthLayout>
  )
}

const AuthButton = styled(Button)`
  margin: 0 auto 1rem auto;
`
