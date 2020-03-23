import { useEffect, useState } from 'react'
import { AuthLayout } from '../../components/layout'
import { Button } from '../../components/ui'
import styled from 'styled-components'
import {
  setForkName,
  getHeadBranch,
} from '../../open-authoring/utils/repository'
import { useCMS } from 'tinacms'

export default function Authorizing() {
  const cms = useCMS()
  async function handleForkCreated(forkName: string) {
    setForkName(forkName)
    await fetch(`/api/preview`)

    window.opener.window.location.href = window.opener.window.location.pathname
  }

  const createFork = async () => {
    const { full_name } = await cms.api.github.createFork()

    const forkFullName = full_name
    if (forkFullName) {
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
      const branch = getHeadBranch()

      const userData = await cms.api.github.getUser()
      if (!userData) return setForkValidating(false)
      const login = userData.login
      const expectedFork =
        login + '/' + process.env.REPO_FULL_NAME.split('/')[1]
      const forkData = await cms.api.github.getBranch(expectedFork, branch)
      if (!forkData) return setForkValidating(false)
      if (forkData.ref === 'refs/heads/' + branch) {
        // found fork\
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
