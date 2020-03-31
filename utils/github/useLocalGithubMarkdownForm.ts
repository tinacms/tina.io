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

const useGithubMarkdownForm = (
  markdownFile: GitFile<any>,
  formOptions: Options,
  githubOptions: GithubOptions
) => {
  return useGithubFileForm(
    markdownFile,
    formOptions,
    githubOptions,
    toMarkdownString
  )
}

export function useLocalGithubMarkdownForm(
  markdownFile: GitFile,
  formOptions: Options,
  githubOptions: GithubOptions
) {
  const [values, form] = useGithubMarkdownForm(
    markdownFile,
    formOptions,
    githubOptions
  )
  usePlugins(form as any)
  return [values, form]
}
