import React, { useState, useEffect } from 'react'
import { getForkName, getHeadBranch, setForkName } from './repository'
import { useCMS } from 'tinacms'
import { ActionableModal } from '../../components/ui'
import OpenAuthoringErrorModal from '../github-error/OpenAuthoringErrorModal'
export interface OpenAuthoringContext {
  forkValid: boolean
  authenticated: boolean
  updateAuthChecks: () => void
  authenticate: () => Promise<void>
  enterEditMode: () => void
  exitEditMode: () => void
  setError: (err) => void
}

export const OpenAuthoringContext = React.createContext<OpenAuthoringContext | null>(
  null
)

export function useOpenAuthoring() {
  const openAuthoringContext = React.useContext(OpenAuthoringContext)

  if (!openAuthoringContext) {
    throw new Error('useOpenAuthoring must be within an OpenAuthoringContext')
  }

  return openAuthoringContext
}

interface ProviderProps {
  children: any
  authenticate: () => Promise<void>
  enterEditMode: () => void
  exitEditMode: () => void
}

export const OpenAuthoringProvider = ({
  children,
  authenticate,
  enterEditMode,
  exitEditMode,
}: ProviderProps) => {
  const [forkValid, setForkValid] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState(null)

  const cms = useCMS()

  const [authorizing, setAuthorizing] = useState(false)

  const updateAuthChecks = async () => {
    setAuthenticated(!!(await cms.api.github.getUser()))
    setForkValid(await cms.api.github.getBranch(getForkName(), getHeadBranch()))
  }

  const tryEnterEditMode = async () => {
    if (authenticated && forkValid) {
      enterEditMode()
    } else {
      setAuthorizing(true)
    }
  }

  const onUpdateAuthState = async () => {
    //TODO replace this with a hook that updates when cookies change?
    await updateAuthChecks()
  }

  useEffect(() => {
    if (authorizing && forkValid && authenticated) {
      enterEditMode()
    }
  }, [authorizing, forkValid, authenticated])

  // Hook to update root openAuthoring state when form fails.
  // We need to perform to check before an action is clicked (e.g start auth flow)
  // Because if it is perform on-the-fly, the window may be blocked.
  useEffect(() => {
    updateAuthChecks()
  }, [error])

  return (
    <OpenAuthoringContext.Provider
      value={{
        forkValid,
        authenticated,
        updateAuthChecks,
        authenticate,
        enterEditMode: tryEnterEditMode,
        exitEditMode,
        setError,
      }}
    >
      {error && <OpenAuthoringErrorModal error={error} />}
      {authorizing && (
        <OpenAuthoringAuthModal onUpdateAuthState={onUpdateAuthState} />
      )}
      {children}
    </OpenAuthoringContext.Provider>
  )
}

const OpenAuthoringAuthModal = ({ onUpdateAuthState }) => {
  let modalProps

  const openAuthoring = useOpenAuthoring()
  const cms = useCMS()

  if (!openAuthoring.authenticated) {
    modalProps = {
      title: 'auth',
      message: 'A message about auth',
      actions: [
        {
          name: 'auth',
          action: async () => {
            await openAuthoring.authenticate()
            onUpdateAuthState()
          },
        },
      ],
    }
  } else if (!openAuthoring.forkValid) {
    modalProps = {
      title: 'fork',
      message: 'A message about forking',
      actions: [
        {
          name: 'fork',
          action: async () => {
            const { full_name } = await cms.api.github.createFork()
            setForkName(full_name)
            onUpdateAuthState()
          },
        },
      ],
    }
  } else {
    return null
  }
  return <ActionableModal {...modalProps} />
}
