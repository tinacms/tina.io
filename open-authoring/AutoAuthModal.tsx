import { useOpenAuthoring } from '../components/layout/OpenAuthoring'
import { useEffect, useState } from 'react'
import { enterEditMode } from './authFlow'
import { ActionableModal, ActionableModalOptions } from '../components/ui'

// This component checks for the autoAuth query parameter, and
// conditionally renders the modal to kick off the auth flow
const AutoAuthModal = () => {
  const openAuthoring = useOpenAuthoring()

  const [errorModalProps, setErrorModalProps] = useState<
    ActionableModalOptions
  >(null)

  const cancelAuth = () => {
    window.history.replaceState(
      {},
      document.title,
      window.location.href.split('?')[0] //TODO - remove only autoAuth param
    )
    setErrorModalProps(null)
  }

  useEffect(() => {
    if (window.location.href.includes('autoAuth')) {
      setErrorModalProps({
        title: 'Authentication',
        message: 'To edit this site, you first need to be authenticated.',
        actions: [
          {
            name: 'Continue',
            action: () =>
              enterEditMode(
                openAuthoring.githubAuthenticated,
                openAuthoring.forkValid
              ),
          },
          {
            name: 'Cancel',
            action: cancelAuth,
          },
        ],
      })
    }
  }, [])

  return <>{errorModalProps && <ActionableModal {...errorModalProps} />}</>
}

export default AutoAuthModal
