import { useEffect, useState } from 'react'
import { ActionableModal } from '../components/ui'
import { enterEditMode } from './authFlow'
import { useOpenAuthoring } from '../components/layout/OpenAuthoring'
import OpenAuthoringContextualErrorUI from './OpenAuthoringContextualErrorUI'

interface Props {
  error?: OpenAuthoringContextualErrorUI
}

export enum Actions {
  authFlow,
  refresh,
  doNothing
}


export const OpenAuthoringModalContainer = ({ error }: Props) => {
  const [authPopupDisplayed, setAuthPopupDisplayed] = useState(false)
  const [statefulError, setStateFullError] = useState(error)

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

  const getActionsFromError = (error: OpenAuthoringContextualErrorUI) => {
    var actions = []
    error.actions.forEach( action => {
      actions.push(
        {
          name: action.message,
          action: () => {
            if (action.action() === true) { // close modal
              setStateFullError(null)
            }
          }
        }
      )
    })
    return actions
  }


  useEffect(() => {
    if (error) {
      setStateFullError(error)
      openAuthoring.updateAuthChecks() //recheck if we need to open auth window as result of error
    }
  }, [error])

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
      {statefulError && (
        <ActionableModal 
          title={statefulError.title}
          message={statefulError.message}
          actions={getActionsFromError(statefulError)}
        />
      )}
    </>
  )
}
