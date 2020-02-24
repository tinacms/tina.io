import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { getBranch, getUser } from '../../open-authoring/github/api'

export interface OpenAuthoringContext {
  forkValid: boolean
  githubAuthenticated: boolean
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

    const forkName = Cookies.get('fork_full_name')
    setForkValid(await isForkValid(forkName))
  }
  useEffect(() => {
    updateAuthChecks()
  }, [])

  return (
    <OpenAuthoringContext.Provider value={{ forkValid, githubAuthenticated }}>
      {children}
    </OpenAuthoringContext.Provider>
  )
}

const isForkValid = async (forkName: string) => {
  if (!forkName) {
    return false
  }
  const branch = Cookies.get('head_branch') || 'master'

  const forkData = await getBranch(forkName, branch)
  if (!forkData) return false
  if (forkData.ref === 'refs/heads/' + branch) {
    Cookies.set('head_branch', branch)
    return true
  }
  return false
}

const isGithubTokenValid = async () => {
  const userData = await getUser()
  if (!userData) return false
  return true
}
