import { useEffect, useState } from 'react'
import { setCachedFormData, getCachedFormData } from '../formCache'

export interface GitFile<T = any> {
  fileRelativePath: string
  sha: string
  data: T
}

export interface GithubOptions {
  baseRepoFullName: string
  forkFullName: string
  branch: string
}

export const useGitFileSha = <T = any>(
  file: GitFile<T>
): [() => string, (sha: string) => void] => {
  const setSha = (sha: string) => {
    return setCachedFormData(file.fileRelativePath, {
      sha,
    })
  }

  useEffect(() => {
    setSha(file.sha)
  }, [])

  return [() => getCachedFormData(file.fileRelativePath).sha, setSha]
}
