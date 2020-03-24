import { useEffect } from 'react'
import { useOpenAuthoring } from '../components/layout/OpenAuthoring'
import OpenAuthoringErrorModal from './OpenAuthoringErrorModal'

declare global {
  interface Window {
    githubAuthenticated: boolean
    forkValid: boolean
  }
}

export const withOpenAuthoringErrorHandler = BaseComponent => (props: {
  previewError
}) => {
  const openAuthoring = useOpenAuthoring()

  useEffect(() => {
    ;(async () => {
      if (props.previewError) {
        openAuthoring.updateAuthChecks()
      }
    })()
  }, [props.previewError])

  useEffect(() => {
    window.githubAuthenticated = openAuthoring.githubAuthenticated
    window.forkValid = openAuthoring.forkValid
  }, [openAuthoring.githubAuthenticated, openAuthoring.forkValid])

  // don't show content with initial content error
  // because the data is likely missing
  return props.previewError ? (
    <OpenAuthoringErrorModal error={props.previewError} />
  ) : (
    <BaseComponent {...props} />
  )
}
