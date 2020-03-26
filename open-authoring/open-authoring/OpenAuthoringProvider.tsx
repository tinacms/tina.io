import React, { useState, useEffect } from 'react'
import { getForkName, getHeadBranch, setForkName } from './repository'
import { useCMS } from 'tinacms'
import { SourceProviderManager } from '../source-provider-managers/SourceProviderManager'
import popupWindow from '../../utils/popupWindow'
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
    const fork = getForkName()

    if (githubAuthenticated) {
      if (fork && forkValid) {
        setForkName(fork)
        fetch(`/api/preview`).then(() => {
          window.location.href = window.location.pathname
        })
        return
      } else {
        popupWindow(`/github/fork`, '_blank', window, 1000, 700)
      }
    } else {
      const authState = Math.random()
        .toString(36)
        .substring(7)

      popupWindow(
        `/github/start-auth?state=${authState}`,
        '_blank',
        window,
        1000,
        700
      )
    }
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
