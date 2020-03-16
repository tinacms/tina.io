import { useEffect, useState } from 'react'
import { ActionableModal } from '../components/ui'
import { startAuthFlow } from './authFlow'
import { useOpenAuthoring } from '../components/layout/OpenAuthoring'
import OpenAuthoringContextualErrorUI from './OpenAuthoringContextualErrorUI'
import getErrorUIFrom from './error-interpreter'

interface Props {
  openAuthoringErrorUI?: OpenAuthoringContextualErrorUI
  openAuthoringError?
}


export const OpenAuthoringModalContainer = ({
  openAuthoringErrorUI,
  openAuthoringError,
}: Props) => {
  const [authPopupDisplayed, setAuthPopupDisplayed] = useState(false)
  const [statefulOpenAuthoringErrorUI, setStateFullOpenAuthoringErrorUI] = useState(openAuthoringErrorUI)

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
          setStateFullOpenAuthoringErrorUI(contextualError)
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
            setStateFullOpenAuthoringErrorUI(null)
          }
        },
      })
    })
    return actions
  }

  useEffect(() => {
    if (openAuthoringErrorUI) {
      setStateFullOpenAuthoringErrorUI(openAuthoringErrorUI)
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
      {statefulOpenAuthoringErrorUI && (
        <ActionableModal
          title={statefulOpenAuthoringErrorUI.title}
          message={statefulOpenAuthoringErrorUI.message}
          actions={getActionsFromError(statefulOpenAuthoringErrorUI)}
        />
      )}
    </>
  )
}
