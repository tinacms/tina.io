import { useEffect, useState } from 'react'
import { ActionableModal } from './ActionableModal'
import { enterEditMode } from '../../../open-authoring/authFlow'
import { useOpenAuthoring } from '../../layout/OpenAuthoring'
import {
  ActionableModalContext,
  ActionableModalOptions,
} from './ActionableModalContext'

/*
  TODO - This modal container is responsible for multiple things:
  - authPopup on initial load,
  - responding to & interpreting errors

  It should probably be more of a dummy modal component, and move that logic elsewhere
*/
export const ActionableModalContainer = ({ children }) => {
  const [modal, setModal] = useState<ActionableModalOptions>()

  const [authPopupDisplayed, setAuthPopupDisplayed] = useState(false) //TODO - move this lower into open-authoring implementatio

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
    if (modal) {
      openAuthoring.updateAuthChecks() //recheck if we need to open auth window as result of error
    }
  }, [modal])

  return (
    <ActionableModalContext.Provider value={{ modal, setModal }}>
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
      {modal && <ActionableModal {...modal} />}
      {children}
      {/* TODO - we may want to show modal over top of children */}
    </ActionableModalContext.Provider>
  )
}
