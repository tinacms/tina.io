import { useEffect } from 'react'
import { setCachedFormData } from '../formCache'

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

export const useGithubForm = <T = any>(file: GitFile<T>) => {
  useEffect(() => {
    setCachedFormData(file.fileRelativePath, {
      sha: file.sha,
    })
  }, [])
}
