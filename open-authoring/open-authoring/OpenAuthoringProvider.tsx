import React, { useState, useEffect } from 'react'
import { getForkName, getHeadBranch, setForkName } from './repository'
import { useCMS } from 'tinacms'
import { SourceProviderManager } from '../source-provider-managers/SourceProviderManager'
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
  const [authenticated, setauthenticated] = useState(false)
  const cms = useCMS()

  const updateAuthChecks = async () => {
    setauthenticated(!!(await cms.api.github.getUser()))
    setForkValid(await cms.api.github.getBranch(getForkName(), getHeadBranch()))
  }

  useEffect(() => {
    updateAuthChecks()
  }, [])

  const edit = async () => {
    if (!authenticated) {
      await sourceProviderManager.authenticate()
    }
    if (!forkValid) {
      const { full_name } = await cms.api.github.createFork()
      setForkName(full_name)
    }

    onAuthorize()
  }

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
      {children}
    </OpenAuthoringContext.Provider>
  )
}
