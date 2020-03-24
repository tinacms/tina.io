import { useEffect } from 'react'
import getErrorUIFrom from './error-interpreter'
import { useOpenAuthoring } from '../components/layout/OpenAuthoring'
import { useCMS } from 'tinacms'
import { useActionableModal } from '../components/ui/ActionableModal/ActionableModalContext'

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
  const modalContext = useActionableModal()
  const { github } = useCMS().api

  useEffect(() => {
    ;(async () => {
      if (props.previewError) {
        openAuthoring.updateAuthChecks()
        const contextualError = await getErrorUIFrom(props.previewError, github)
        modalContext.setModal(contextualError)
      }
    })()
  }, [props.previewError])

  useEffect(() => {
    window.githubAuthenticated = openAuthoring.githubAuthenticated
    window.forkValid = openAuthoring.forkValid
  }, [openAuthoring.githubAuthenticated, openAuthoring.forkValid])

  // don't show content with initial content error
  // because the data is likely missing
  return props.previewError ? <></> : <BaseComponent {...props} />
}
