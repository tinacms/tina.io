import { enterEditMode } from '../authFlow'
import { getForkName, getHeadBranch } from '../utils/repository'

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
