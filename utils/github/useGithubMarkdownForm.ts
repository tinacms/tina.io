import { FormOptions, usePlugins, Field } from 'tinacms'
import { GithubOptions, GitFile } from './useGitFileSha'
import { toMarkdownString } from 'next-tinacms-markdown'
import { useGithubFileForm } from './useGithubFileForm'
export interface Options {
  id?: string
  label?: string
  fields?: Field[]
  actions?: FormOptions<any>['actions']
}

export function useGithubMarkdownForm(
  markdownFile: GitFile,
  formOptions: Options,
  githubOptions: GithubOptions
) {
  const [values, form] = useGithubFileForm(
    markdownFile,
    formOptions,
    githubOptions,
    toMarkdownString
  )
  usePlugins(form as any)
  return [values, form]
}
