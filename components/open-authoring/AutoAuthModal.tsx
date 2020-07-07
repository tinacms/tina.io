import { useState } from 'react'
import { ActionableModal } from '../ui'
import { useCMS } from 'tinacms'

interface Props {
  autoAuthKey?: string // query param key which kicks off auth flow
}

// This component checks for the autoAuth query parameter, and
// conditionally renders the modal to kick off the auth flow
const AutoAuthModal = ({ autoAuthKey = 'autoAuth' }: Props) => {
  const cms = useCMS()

  const [showAuthModal, setShowAuthModal] = useState(
    typeof window !== 'undefined' && window.location.href.includes(autoAuthKey)
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
          action: cms.enable,
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
