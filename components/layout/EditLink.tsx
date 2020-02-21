import { useEffect, useContext, useCallback } from 'react'
import Cookies from 'js-cookie'
import { EditModeContext } from '../../utils/editContext'
import { getUser, getBranch } from '../../open-authoring/github/api'
import styled from 'styled-components'

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
  let editMode = useContext(EditModeContext)
  let isEditMode = editMode.isEditMode

  const isTokenValid = async () => {
    const userData = await getUser()
    if (!userData) return false
    return true
  }

  const isForkValid = async (fork: string) => {
    const branch = Cookies.get('head_branch') || 'master'

    const forkData = await getBranch(fork, branch)
    if (!forkData) return false
    if (forkData.ref === 'refs/heads/' + branch) {
      Cookies.set('head_branch', branch)
      return true
    }
    return false
  }

  const authState = Math.random()
    .toString(36)
    .substring(7)

  const forkURL = `/github/fork?state=${authState}`

  const exitEditMode = () => {
    fetch(`/api/reset-preview`).then(() => {
      window.location.reload()
    })
  }

  const onUpdateStorageEvent = useCallback(
    async e => {
      if (e.key == 'github_code') {
        await handleAuthCode(e.newValue, authState)
        authTab.location.assign(forkURL)
      }
      if (e.key == 'fork_full_name') {
        handleForkCreated(e.newValue)
      }
    },
    [authState]
  )

  const openAuthWindow = useCallback(
    (initialView: string) =>
      popupWindow(initialView, '_blank', window, 1000, 700),
    []
  )

  const enterEditMode = async () => {
    const accessTokenAlreadyExists = await isTokenValid()
    const fork = Cookies.get('fork_full_name')

    localStorage.setItem('fork_full_name', '')
    if (accessTokenAlreadyExists) {
      if (fork && (await isForkValid(fork))) {
        handleForkCreated(fork)
        return
      } else {
        authTab = openAuthWindow(forkURL)
      }
    } else {
      authTab = openAuthWindow(`/github/start-auth?state=${authState}`)
    }

    window.addEventListener('storage', onUpdateStorageEvent, true)
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('storage', onUpdateStorageEvent, true)
    }
  }, [])

  return (
    <EditButton onClick={isEditMode ? exitEditMode : enterEditMode}>
      {isEditMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </EditButton>
  )
}

async function handleAuthCode(code: string, authState: string) {
  await requestGithubAccessToken(code, authState)
}

function handleForkCreated(forkName: string) {
  Cookies.set('fork_full_name', forkName, { sameSite: 'strict' })
  fetch(`/api/preview`).then(() => {
    window.location.reload()
  })
}

const requestGithubAccessToken = async (code: string, authState: string) => {
  const resp = await fetch(
    `/api/get-github-access-token?code=${code}&state=${authState}`
  )
}

const EditButton = styled.button`
  background: none;
  padding: 0;
  display: inline;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  transition: all 150ms ease-out;
  transform: translate3d(0px, 0px, 0px);

  &:hover,
  &:focus {
    text-decoration: none;
    transform: translate3d(-1px, -2px, 0);
    transition: transform 180ms ease-out;
  }
  &:focus,
  &:active {
    outline: none;
  }
  &:active {
    filter: none;
  }
`
