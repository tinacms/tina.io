import { useEffect } from 'react'
import Cookies from 'js-cookie'

function popupWindow(url, title, window, w, h) {
  const y = window.top.outerHeight / 2 + window.top.screenY - h / 2
  const x = window.top.outerWidth / 2 + window.top.screenX - w / 2
  return window.open(
    url,
    title,
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      y +
      ', left=' +
      x
  )
}

export const EditLink = () => {
  let authTab: Window

  const authState = Math.random()
    .toString(36)
    .substring(7)

  const onClick = async () => {
    localStorage.setItem('fork_full_name', '')

    authTab = popupWindow(
      `/github/start-auth?state=${authState}`,
      '_blank',
      window,
      1000,
      700
    )

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
    <a href="#" onClick={onClick}>
      Edit this page
    </a>
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
