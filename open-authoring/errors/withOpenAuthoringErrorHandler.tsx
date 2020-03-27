import { useEffect } from 'react'
import { useOpenAuthoring } from '../open-authoring/OpenAuthoringProvider'

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
        openAuthoring.setError(props.previewError)
      }
    })()
  }, [props.previewError])

  if (props.previewError) {
    return null
  }

  // don't show content with initial content error
  // because the data is likely missing
  return <BaseComponent {...props} />
}
