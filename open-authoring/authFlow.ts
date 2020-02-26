import Cookies from "js-cookie"
import { getUser, getBranch } from "./github/api"

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