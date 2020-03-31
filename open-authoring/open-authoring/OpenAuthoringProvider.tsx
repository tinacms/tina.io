import React, { useState } from 'react'
import { getForkName, getHeadBranch } from './repository'
import { useCMS } from 'tinacms'
import OpenAuthoringErrorModal from '../github-error/OpenAuthoringErrorModal'
import OpenAuthoringAuthModal from './OenAuthoringAuthModal'

export interface OpenAuthoringContext {
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

interface AuthState {
  authenticated: true
  forkValid: true
}

export const OpenAuthoringProvider = ({
  children,
  authenticate,
  enterEditMode,
  exitEditMode,
}: ProviderProps) => {
  const [error, setError] = useState(null)
  const cms = useCMS()
  const [authorizingState, setAuthorizingState] = useState<AuthState>(null)

  const tryEnterEditMode = async () => {
    const authenticated =
      authorizingState?.authenticated || (await cms.api.github.getUser())
    const forkValid =
      authorizingState?.forkValid ||
      (await cms.api.github.getBranch(getForkName(), getHeadBranch()))

    if (authenticated && forkValid) {
      enterEditMode()
    } else {
      setAuthorizingState({
        authenticated,
        forkValid,
      })
    }
  }

  return (
    <OpenAuthoringContext.Provider
      value={{
        authenticate,
        enterEditMode: tryEnterEditMode,
        exitEditMode,
        setError,
      }}
    >
      {error && <OpenAuthoringErrorModal error={error} />}
      {authorizingState && (
        <OpenAuthoringAuthModal
          onUpdateAuthState={tryEnterEditMode}
          authState={authorizingState}
          close={() => {
            setAuthorizingState(null)
          }}
        />
      )}
      {children}
    </OpenAuthoringContext.Provider>
  )
}
