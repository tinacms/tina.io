import React, { useState, useEffect } from 'react'
import { getForkName, getHeadBranch, setForkName } from './repository'
import { useCMS } from 'tinacms'
import { SourceProviderManager } from '../source-provider-managers/SourceProviderManager'
import { ActionableModal } from '../../components/ui'
export interface OpenAuthoringContext {
  forkValid: boolean
  authenticated: boolean
  updateAuthChecks: () => void
  sourceProviderManager: SourceProviderManager
  enterEditMode: () => void
  exitEditMode: () => void
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
  sourceProviderManager: SourceProviderManager
  onAuthorize: () => void
  exitEditMode: () => void
}

export const OpenAuthoringProvider = ({
  children,
  sourceProviderManager,
  onAuthorize,
  exitEditMode,
}: ProviderProps) => {
  const [forkValid, setForkValid] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const cms = useCMS()

  const [authorizing, setAuthorizing] = useState(false)

  const updateAuthChecks = async () => {
    setAuthenticated(!!(await cms.api.github.getUser()))
    setForkValid(await cms.api.github.getBranch(getForkName(), getHeadBranch()))
  }

  useEffect(() => {
    updateAuthChecks()
  }, [])

  const edit = async () => {
    if (authenticated && forkValid) {
      onAuthorize()
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
      onAuthorize()
    }
  }, [authorizing, forkValid, authenticated])

  return (
    <OpenAuthoringContext.Provider
      value={{
        forkValid,
        authenticated,
        updateAuthChecks,
        sourceProviderManager,
        enterEditMode: edit,
        exitEditMode,
      }}
    >
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
            await openAuthoring.sourceProviderManager.authenticate()
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
