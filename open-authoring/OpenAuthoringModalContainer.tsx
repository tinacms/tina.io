import { useEffect, useState } from 'react'
import { ActionableModal } from '../components/ui'
import { enterEditMode } from './authFlow'
import { useOpenAuthoring } from '../components/layout/OpenAuthoring'

interface Props {
  previewError?: string
}

export const OpenAuthoringModalContainer = ({ previewError }: Props) => {
  const [authPopupDisplayed, setAuthPopupDisplayed] = useState(false)

  const cancelAuth = () => {
    window.history.replaceState(
      {},
      document.title,
      window.location.href.split('?')[0] //TODO - remove only autoAuth param
    )
    setAuthPopupDisplayed(false)
  }

  useEffect(() => {
    if (window.location.href.includes('autoAuth')) {
      setAuthPopupDisplayed(true)
    }
  }, [])
  const openAuthoring = useOpenAuthoring()

  const runAuthWorkflow = () => {
    enterEditMode(openAuthoring.githubAuthenticated, openAuthoring.forkValid)
  }

  useEffect(() => {
    if (previewError) {
      openAuthoring.updateAuthChecks() //recheck if we need to open auth window as result of error
    }
  }, [previewError])

  return (
    <>
      {authPopupDisplayed && (
        <ActionableModal
          title="Authentication"
          message="To edit this site, you first need to be authenticated."
          actions={[
            {
              name: 'Continue',
              action: runAuthWorkflow,
            },
            {
              name: 'Cancel',
              action: cancelAuth,
            },
          ]}
        />
      )}
      {previewError && (
        <ActionableModal
          title="Error"
          message={previewError}
          actions={[
            {
              name: 'Continue',
              action: runAuthWorkflow,
            },
          ]}
        />
      )}
    </>
  )
}
