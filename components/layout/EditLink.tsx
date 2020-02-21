import { useEffect, useContext, useCallback } from 'react'
import Cookies from 'js-cookie'
import { EditModeContext } from '../../utils/editContext'
import styled from 'styled-components'
import { useOpenAuthoring } from './OpenAuthoring'

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

const openAuthWindow = (initialView: string) =>
  popupWindow(initialView, '_blank', window, 1000, 700)

export const EditLink = () => {
  let authTab: Window
  let editMode = useContext(EditModeContext)
  let isEditMode = editMode.isEditMode

  const openAuthoring = useOpenAuthoring()

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

  const enterEditMode = () => {
    const accessTokenAlreadyExists = openAuthoring.githubAuthenticated
    const fork = Cookies.get('fork_full_name')

    localStorage.setItem('fork_full_name', '')
    if (accessTokenAlreadyExists) {
      if (fork && openAuthoring.forkValid) {
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
  color: inherit;
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
