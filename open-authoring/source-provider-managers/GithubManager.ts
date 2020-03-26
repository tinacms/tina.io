import { SourceProviderManager } from './SourceProviderManager'

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

export class GithubManager implements SourceProviderManager {
  authenticate() {
    const authState = Math.random()
      .toString(36)
      .substring(7)

    const url = `https://github.com/login/oauth/authorize?scope=public_repo&client_id=${process.env.GITHUB_CLIENT_ID}&state=${authState}`

    popupWindow(url, '_blank', window, 1000, 700)
  }
}
