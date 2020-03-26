import React, { useState, useEffect } from 'react'
import { getForkName, getHeadBranch } from './repository'
import { useCMS } from 'tinacms'
import { SourceProviderManager } from '../source-provider-managers/SourceProviderManager'
import { enterEditMode } from '../auth/authFlow'

export interface OpenAuthoringContext {
  forkValid: boolean
  githubAuthenticated: boolean
  updateAuthChecks: () => void
  sourceProviderManager: SourceProviderManager
  enterEditMode: () => void
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
}

export const OpenAuthoringProvider = ({
  children,
  sourceProviderManager,
}: ProviderProps) => {
  const [forkValid, setForkValid] = useState(false)
  const [githubAuthenticated, setGithubAuthenticated] = useState(false)
  const cms = useCMS()

  const updateAuthChecks = async () => {
    setGithubAuthenticated(!!(await cms.api.github.getUser()))
    setForkValid(await cms.api.github.getBranch(getForkName(), getHeadBranch()))
  }
  useEffect(() => {
    updateAuthChecks()
  }, [])

  const edit = () => {
    enterEditMode(githubAuthenticated, forkValid)
  }

  return (
    <OpenAuthoringContext.Provider
      value={{
        forkValid,
        githubAuthenticated,
        updateAuthChecks,
        sourceProviderManager,
        enterEditMode: edit,
      }}
    >
      {children}
    </OpenAuthoringContext.Provider>
  )
}
