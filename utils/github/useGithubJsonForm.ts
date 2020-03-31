import { FormOptions, usePlugins, Field } from 'tinacms'
import { GithubOptions, GitFile } from './useGitFileSha'
import { useGithubFileForm } from './useGithubFileForm'

export interface Options {
  id?: string
  label?: string
  fields?: Field[]
  actions?: FormOptions<any>['actions']
}

const serialize = (formData: any) => {
  return JSON.stringify(formData, null, 2)
}

export function useGithubJsonForm(
  jsonFile: GitFile,
  formOptions: Options,
  githubOptions: GithubOptions
) {
  const [values, form] = useGithubFileForm(
    jsonFile,
    formOptions,
    githubOptions,
    serialize
  )
  usePlugins(form as any)
  return [values, form]
}
