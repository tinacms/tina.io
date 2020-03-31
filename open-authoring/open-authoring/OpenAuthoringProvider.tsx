import React, { useState } from 'react'
import { getForkName, getHeadBranch } from './repository'
import { useCMS } from 'tinacms'
import OpenAuthoringErrorModal from '../github-error/OpenAuthoringErrorModal'
import OpenAuthoringAuthModal from './OpenAuthoringAuthModal'

export interface OpenAuthoringContext {
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
  enterEditMode,
  exitEditMode,
  authenticate,
}: ProviderProps) => {
  const [error, setError] = useState(null)
  const cms = useCMS()
  const [authorizingStatus, setAuthorizingStatus] = useState<AuthState>(null)

  const tryEnterEditMode = async () => {
    const authenticated =
      authorizingStatus?.authenticated || (await cms.api.github.getUser())
    const forkValid =
      authorizingStatus?.forkValid ||
      (await cms.api.github.getBranch(getForkName(), getHeadBranch()))

    if (authenticated && forkValid) {
      enterEditMode()
    } else {
      setAuthorizingStatus({
        authenticated,
        forkValid,
      })
    }
  }

  return (
    <OpenAuthoringContext.Provider
      value={{
        enterEditMode: tryEnterEditMode,
        exitEditMode,
        setError,
      }}
    >
      {error && <OpenAuthoringErrorModal error={error} />}
      {authorizingStatus && (
        <OpenAuthoringAuthModal
          onUpdateAuthState={tryEnterEditMode}
          authState={authorizingStatus}
          close={() => {
            setAuthorizingStatus(null)
          }}
          authenticate={authenticate}
        />
      )}
      {children}
    </OpenAuthoringContext.Provider>
  )
}
