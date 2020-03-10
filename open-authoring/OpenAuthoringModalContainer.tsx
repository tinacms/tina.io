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

  const getFuncFromActions = action => {
    switch (action) {
      case Actions.authFlow: {
        return authFlow
      }
      case Actions.refresh: {
        return refresh
      }
      case Actions.doNothing: {
        return close
      }
    }
  }

  const authFlow = () => {
    fetch(`/api/reset-preview`).then( () => {
      runAuthWorkflow()
    })
  }

  const refresh = () => {
    fetch(`/api/reset-preview`).then( () => {
      window.location.reload()
    })
  }

  const getActionsFromError = (error: OpenAuthoringContextualErrorUI) => {
    var actions = []
    error.actions.forEach( action => {
      actions.push(
        {
          name: action.message,
          action: getFuncFromActions(action.action)
        }
      )
    })
    return actions
  }


  useEffect(() => {
    if (error) {
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
      {error && (
        <ActionableModal 
          title={error.title}
          message={error.message}
          actions={getActionsFromError(error)}
        />
      )}
    </>
  )
}
