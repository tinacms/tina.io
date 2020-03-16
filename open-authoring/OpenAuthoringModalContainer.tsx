import { useEffect, useState } from 'react'
import { ActionableModal } from '../components/ui'
import { startAuthFlow } from './authFlow'
import { useOpenAuthoring } from '../components/layout/OpenAuthoring'
import OpenAuthoringContextualErrorUI from './OpenAuthoringContextualErrorUI'
import getErrorUIFrom from './error-interpreter'

/*
TODO:
This should either take in openAuthoringErrorUI, or openAuthoringError, & have it be required.
Otherwise it's a bit weird to sometimes interpret it outside this contet, and sometimes within this context
*/
interface Props {
  openAuthoringErrorUI?: OpenAuthoringContextualErrorUI
  openAuthoringError?
}

export const OpenAuthoringModalContainer = ({
  openAuthoringError,
  ...props
}: Props) => {
  const [authPopupDisplayed, setAuthPopupDisplayed] = useState(false)
  const [openAuthoringErrorUI, setOpenAuthoringErrorUI] = useState(
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
    ;(async () => {
      if (openAuthoringError) {
        const contextualError = await getErrorUIFrom(openAuthoringError)
        if (contextualError.asModal) {
          setOpenAuthoringErrorUI(contextualError)
        }
      }
    })()
  }, [openAuthoringError])

  useEffect(() => {
    if (window.location.href.includes('autoAuth')) {
      setAuthPopupDisplayed(true)
    }
  }, [])
  const openAuthoring = useOpenAuthoring()

  const runAuthWorkflow = () => {
    startAuthFlow(openAuthoring.githubAuthenticated, openAuthoring.forkValid)
  }

  const getActionsFromError = (error: OpenAuthoringContextualErrorUI) => {
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
      setOpenAuthoringErrorUI(openAuthoringErrorUI)
      openAuthoring.updateAuthChecks() //recheck if we need to open auth window as result of error
    }
  }, [openAuthoringErrorUI])

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
      {openAuthoringErrorUI && (
        <ActionableModal
          title={openAuthoringErrorUI.title}
          message={openAuthoringErrorUI.message}
          actions={getActionsFromError(openAuthoringErrorUI)}
        />
      )}
    </>
  )
}
