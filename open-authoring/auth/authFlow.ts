import { setForkName, getForkName } from '../open-authoring/repository'

function popupWindow(url, title, window, w, h) {
  const y = window.top.outerHeight / 2 + window.top.screenY - h / 2
  const x = window.top.outerWidth / 2 + window.top.screenX - w / 2
  return window.open(
    url,
    title,
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      y +
      ', left=' +
      x
  )
}

async function handleForkCreated(forkName) {
  setForkName(forkName)
  fetch(`/api/preview`).then(() => {
    window.location.href = window.location.pathname
  })
}

export const enterEditMode = (
  githubAuthenticated: boolean,
  forkValid: boolean
) => {
  let authTab

  const fork = getForkName()

  if (githubAuthenticated) {
    if (fork && forkValid) {
      handleForkCreated(fork)
      return
    } else {
      authTab = popupWindow(`/github/fork`, '_blank', window, 1000, 700)
    }
  } else {
    const authState = Math.random()
      .toString(36)
      .substring(7)

    authTab = popupWindow(
      `/github/start-auth?state=${authState}`,
      '_blank',
      window,
      1000,
      700
    )
  }
}

export const exitEditMode = () => {
  fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}
