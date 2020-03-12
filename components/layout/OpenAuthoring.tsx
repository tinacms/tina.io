import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import {
  isForkValid,
  isGithubTokenValid,
} from '../../open-authoring/github/api'

export interface OpenAuthoringContext {
  forkValid: boolean
  githubAuthenticated: boolean
  updateAuthChecks: () => void
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

export const OpenAuthoring = ({ children }) => {
  const [forkValid, setForkValid] = useState(false)
  const [githubAuthenticated, setGithubAuthenticated] = useState(false)

  const updateAuthChecks = async () => {
    setGithubAuthenticated(await isGithubTokenValid())

    setForkValid(await isForkValid(Cookies.get('fork_full_name')))
  }
  useEffect(() => {
    updateAuthChecks()
  }, [])

  return (
    <OpenAuthoringContext.Provider
      value={{ forkValid, githubAuthenticated, updateAuthChecks }}
    >
      {children}
    </OpenAuthoringContext.Provider>
  )
}
