import { useOpenAuthoring } from '../components/layout/OpenAuthoring'
import { useActionableModal } from '../components/ui/ActionableModal/ActionableModalContext'
import { useEffect } from 'react'
import { enterEditMode } from './authFlow'

const useAutoAuth = () => {
  const openAuthoring = useOpenAuthoring()

  const modalContext = useActionableModal()
  const cancelAuth = () => {
    window.history.replaceState(
      {},
      document.title,
      window.location.href.split('?')[0] //TODO - remove only autoAuth param
    )
    modalContext.setModal(null)
  }

  useEffect(() => {
    if (window.location.href.includes('autoAuth')) {
      modalContext.setModal({
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
}

export default useAutoAuth
