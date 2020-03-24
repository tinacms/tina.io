import { useOpenAuthoring } from '../components/layout/OpenAuthoring'
import { useState } from 'react'
import { enterEditMode } from './authFlow'
import { ActionableModal } from '../components/ui'

// This component checks for the autoAuth query parameter, and
// conditionally renders the modal to kick off the auth flow
const AutoAuthModal = () => {
  const openAuthoring = useOpenAuthoring()

  const [showAuthModal, setShowAuthModal] = useState(
    typeof window !== 'undefined' && window.location.href.includes('autoAuth')
  )
  const cancelAuth = () => {
    window.history.replaceState(
      {},
      document.title,
      window.location.href.split('?')[0] //TODO - remove only autoAuth param
    )
    setShowAuthModal(false)
  }

  if (!showAuthModal) {
    return null
  }

  return (
    <ActionableModal
      title="Authentication"
      message="To edit this site, you first need to be authenticated."
      actions={[
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
      ]}
    />
  )
}

export default AutoAuthModal
