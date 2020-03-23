import { enterEditMode } from '../authFlow'
import { getForkName, getHeadBranch } from '../utils/repository'

// return true if you want the modal to close

export const refresh = () => {
  fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}

export const enterAuthFlow = async github => {
  const authenticated = !!(await github.getUser())

  const forkValid = await github.getBranch(getForkName(), getHeadBranch())

  fetch(`/api/reset-preview`).then(() => {
    enterEditMode(authenticated, forkValid)
  })
}

export const justClose = () => {
  return true
}
