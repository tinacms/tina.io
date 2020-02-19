import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { getUser, getBranch } from '../../open-authoring/github/api'

export const EditLink = () => {
  let authTab: Window

  
  const isTokenValid = async () => {
    const userData = await getUser()
    if (!userData) return false
    return true
  }

  const isForkValid = async (fork: string) => {
    const branch = "master"; // static branch for now

    const forkData = await getBranch(fork, branch)
    if (!forkData) return false
    if (forkData.ref === "refs/heads/" + branch) {
      return true
    }
    return false
  }

  const authState = Math.random()
    .toString(36)
    .substring(7)

  

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
          `/github/fork?state=${authState}`,
          '_blank',
          'fullscreen=no, width=1000, height=800'
        )
      }
    } else {
      authTab = window.open(
        `/github/start-auth?state=${authState}`,
        '_blank',
        'fullscreen=no, width=1000, height=800'
      )
    }
    
    
    window.addEventListener(
      'storage',
      e => {
        updateStorageEvent(e, authState)
        authTab.location.assign(`/github/fork`)
      },
      true
    )
  }

  useEffect(() => {
    return () => {
      window.removeEventListener(
        'storage',
        e => updateStorageEvent(e, authState),
        true
      )
    }
  }, [])

  return (
    <div onClick={onClick}>
      <a>Edit this page</a>
    </div>
  )
}

async function updateStorageEvent(e, authState: string) {
  if (e.key == 'github_code') {
    await handleAuthCode(e.newValue, authState)
  }
  if (e.key == 'fork_full_name') {
    handleForkCreated(e.newValue)
  }
}

async function handleAuthCode(code: string, authState: string) {
  const token = await requestGithubAccessToken(code, authState)
}

async function handleForkCreated(forkName: string) {
  Cookies.set('fork_full_name', forkName, { sameSite: 'strict' })
  fetch(`/api/preview`).then(() => {
    window.location.reload()
  })
}

const requestGithubAccessToken = async (code: string, authState: string) => {
  const resp = await fetch(
    `/api/get-github-access-token?code=${code}&state=${authState}`
  )
  const tokenData = await resp.json()
  return tokenData.access_token
}
