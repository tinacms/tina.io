import { FormOptions, useLocalForm, usePlugins, Field } from 'tinacms'
import { saveContent } from '../../open-authoring/github/api'
import { getCachedFormData, setCachedFormData } from '../formCache'
import { useGithubForm, GithubOptions, GitFile } from './useGithubForm'
import { toMarkdownString } from 'next-tinacms-markdown'
import { FORM_ERROR } from 'final-form'
import OpenAuthoringError from '../../open-authoring/OpenAuthoringError'

export interface Options {
  id?: string
  label?: string
  fields?: Field[]
  actions?: FormOptions<any>['actions']
}

const useGithubMarkdownForm = <T = any>(
  markdownFile: GitFile<T>,
  formOptions: Options,
  githubOptions: GithubOptions,
  isEditMode: boolean
) => {
  useGithubForm(markdownFile, githubOptions, isEditMode)

  const [formData, form] = useLocalForm({
    id: markdownFile.fileRelativePath, // needs to be unique
    label: formOptions.label || markdownFile.fileRelativePath,
    initialValues: markdownFile.data,
    fields: formOptions.fields || [],
    // save & commit the file when the "save" button is pressed
    onSubmit(formData, form) {
      return saveContent(
        githubOptions.forkFullName,
        githubOptions.branch,
        markdownFile.fileRelativePath,
        getCachedFormData(markdownFile.fileRelativePath).sha,
        toMarkdownString(formData),
        'Update from TinaCMS'
      )
        .then(response => {
          setCachedFormData(markdownFile.fileRelativePath, {
            sha: response.content.sha,
          })
        })
        .catch(e => {
          return { [FORM_ERROR]: new OpenAuthoringError(e.message, e.status) }
        })
    },
  })

  return [formData || markdownFile.data, form]
}

export function useLocalGithubMarkdownForm(
  markdownFile: GitFile,
  formOptions: Options,
  githubOptions: GithubOptions,
  isEditMode: boolean
) {
  const [values, form] = useGithubMarkdownForm(
    markdownFile,
    formOptions,
    githubOptions,
    isEditMode
  )
  usePlugins(form as any)
  return [values, form]
}
