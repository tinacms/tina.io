import { useEffect, useState } from 'react'
import { ActionableModal } from './ActionableModal'
import { enterEditMode } from '../../../open-authoring/authFlow'
import { useOpenAuthoring } from '../../layout/OpenAuthoring'
import OpenAuthoringErrorProps from '../../../open-authoring/OpenAuthoringErrorProps'
import {
  ActionableModalContext,
  ActionableModalOptions,
} from './ActionableModalContext'

/*
TODO:
This should either take in openAuthoringErrorUI, or openAuthoringError, & have it be required.
Otherwise it's a bit weird to sometimes interpret it outside this contet, and sometimes within this context
*/
interface Props {
  openAuthoringErrorUI?: OpenAuthoringErrorProps
}

/*
  TODO - This modal container is responsible for multiple things:
  - authPopup on initial load,
  - responding to & interpreting errors

  It should probably be more of a dummy modal component, and move that logic elsewhere
*/
export const ActionableModalContainer = (props: Props) => {
  const [modal, setModal] = useState<ActionableModalOptions>()

  const [authPopupDisplayed, setAuthPopupDisplayed] = useState(false) //TODO - move this lower into open-authoring implementation
  const [openAuthoringErrorUI, setOpenAuthoringErrorUI] = useState(
    //TODO - move this lower into open-authoring implementation
    props.openAuthoringErrorUI
  )

  useEffect(() => {
    setOpenAuthoringErrorUI(props.openAuthoringErrorUI)
  }, [props.openAuthoringErrorUI])

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

  const getActionsFromError = (error: OpenAuthoringErrorProps) => {
    var actions = []
    error.actions.forEach(action => {
      actions.push({
        name: action.message,
        action: () => {
          if (action.action() === true) {
            // close modal
            setOpenAuthoringErrorUI(null)
          }
        },
      })
    })
    return actions
  }

  useEffect(() => {
    if (openAuthoringErrorUI) {
      openAuthoring.updateAuthChecks() //recheck if we need to open auth window as result of error
    }
    setModal(
      openAuthoringErrorUI
        ? {
            title: openAuthoringErrorUI.title,
            message: openAuthoringErrorUI.message,
            actions: getActionsFromError(openAuthoringErrorUI),
          }
        : null
    )
  }, [openAuthoringErrorUI])

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
    </ActionableModalContext.Provider>
  )
}
