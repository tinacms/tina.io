import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { getUser, getBranch } from '../../open-authoring/github/api'

export const EditLink = () => {
  let authTab: Window

  const isTokenValid = async () => {
    try {
      const response = await getUser()
      const data = await response.json()
      if (data.login) {
        return true
      }
      return false
    }
    catch (e) {
      return false
    }
  }

  const isForkValid = async (fork: string) => {
    const branch = "master"; // static branch for now

    try {
      const response = await getBranch(fork, branch)
      const data = await response.json()
      if (data.ref === "refs/heads/" + branch) {
        return true
      }
      return false
    } catch (e) {
      return false
    }
  }

  const onClick = async () => {
    const accessTokenAlreadyExists = await isTokenValid();
    const fork = Cookies.get("fork_full_name");
    
    localStorage.setItem('fork_full_name', '')
    if (accessTokenAlreadyExists) {
      if (fork && await isForkValid(fork)) {
          handleForkCreated(fork)
          return;
      } else {
        authTab = window.open(
          `/github/fork`,
          '_blank',
          'fullscreen=no, width=1000, height=800'
        )
      }
    } else {
      authTab = window.open(
        `/github/start-auth`,
        '_blank',
        'fullscreen=no, width=1000, height=800'
      )
    }
    
    
    window.addEventListener(
      'storage',
      e => {
        updateStorageEvent(e)
        authTab.location.pathname = '/github/fork'
      },
      true
    )
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('storage', updateStorageEvent, true)
    }
  }, [])

  return (
    <div onClick={onClick}>
      <a>Edit this page</a>
    </div>
  )
}

async function updateStorageEvent(e) {
  if (e.key == 'github_code') {
    await handleAuthCode(e.newValue)
  }
  if (e.key == 'fork_full_name') {
    handleForkCreated(e.newValue)
  }
}

async function handleAuthCode(code: string) {
  const token = await requestGithubAccessToken(code)
}

async function handleForkCreated(forkName: string) {
  Cookies.set('fork_full_name', forkName, { sameSite: 'strict' })
  fetch(`/api/preview`).then(() => {
    window.location.reload()
  })
}

const requestGithubAccessToken = async (code: string) => {
  const resp = await fetch(`/api/get-github-access-token?code=${code}`)
  const tokenData = await resp.json()
  return tokenData.access_token
}
