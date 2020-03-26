import { useEffect } from 'react'
import { useOpenAuthoring } from '../open-authoring/OpenAuthoringProvider'
import OpenAuthoringErrorModal from './OpenAuthoringErrorModal'

declare global {
  interface Window {
    authenticated: boolean
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

  // don't show content with initial content error
  // because the data is likely missing
  return props.previewError ? (
    <OpenAuthoringErrorModal error={props.previewError} />
  ) : (
    <BaseComponent {...props} />
  )
}
