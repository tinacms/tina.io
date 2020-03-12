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

export const enterAuthFlow = async () => {
  const authenticated = await isGithubTokenValid()

  const forkValid = await isForkValid(Cookies.get('fork_full_name'))

  fetch(`/api/reset-preview`).then(() => {
    startAuthFlow(authenticated, forkValid)
  })

  return false
}

export const justClose = () => {
  return true
}
