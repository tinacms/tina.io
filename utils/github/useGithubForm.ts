import { useEffect, useMemo } from 'react'
import { useCMS, usePlugins } from 'tinacms'
import { PRPlugin } from '../../open-authoring/PRPlugin'
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

export const useGithubForm = <T = any>(
  file: GitFile<T>,
  githubOptions: GithubOptions,
  isEditMode: boolean
) => {
  useEffect(() => {
    setCachedFormData(file.fileRelativePath, {
      sha: file.sha,
    })
  }, [])

  // TODO - this might cause an issue if editmode dynamically changes
  if (isEditMode) {
    const prPlugin = useMemo(() => {
      return PRPlugin(
        githubOptions.baseRepoFullName,
        githubOptions.forkFullName
      )
    }, [
      githubOptions.baseRepoFullName,
      githubOptions.forkFullName,
    ])
    usePlugins(prPlugin)
  }
}
