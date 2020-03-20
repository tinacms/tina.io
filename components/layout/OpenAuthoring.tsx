import React, { useState, useEffect } from 'react'
import {
  getForkName,
  getHeadBranch,
} from '../../open-authoring/utils/repository'
import { useCMS } from 'tinacms'

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
  const cms = useCMS()

  const updateAuthChecks = async () => {
    setGithubAuthenticated(await !!cms.api.github.getUser())
    setForkValid(await cms.api.github.getBranch(getForkName(), getHeadBranch()))
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
