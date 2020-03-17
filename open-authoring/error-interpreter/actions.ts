import { useOpenAuthoring } from '../../components/layout/OpenAuthoring'
import { startAuthFlow } from '../authFlow'
import Cookies from 'js-cookie'
import { isGithubTokenValid, isForkValid } from '../github/api'

// return true if you want the modal to close

export const refresh = () => {
  fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })

  return false
}

export const enterAuthFlow = () => {
  //use stored value as we can do async checks and open window without it being blocked
  const authenticated = !!window.githubAuthenticated
  const forkValid = !!window.forkValid

  startAuthFlow(authenticated, forkValid)

  return false
}

export const justClose = () => {
  return true
}
