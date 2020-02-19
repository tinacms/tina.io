import { AuthLayout } from '../../components/layout'
import { Button } from '../../components/ui'
import styled from 'styled-components'

export default function Authorizing() {
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
      localStorage.setItem('fork_full_name', full_name)
      window.close()
    } else {
      alert('Could not fork the site') //TODO - show clean error message
    }
  }

  return (
    <AuthLayout>
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
    </AuthLayout>
  )
}

const AuthButton = styled(Button)`
  margin: 0 auto 1rem auto;
`
