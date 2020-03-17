import { FormOptions, useLocalForm, usePlugins, Field } from 'tinacms'
import { saveContent } from '../../open-authoring/github/api'
import { getCachedFormData, setCachedFormData } from '../formCache'
import { useGithubForm, GithubOptions, GitFile } from './useGithubForm'
import { FORM_ERROR } from 'final-form'
import OpenAuthoringError from '../../open-authoring/OpenAuthoringError'

export interface Options {
  id?: string
  label?: string
  fields?: Field[]
  actions?: FormOptions<any>['actions']
}

const useGithubJsonForm = <T = any>(
  jsonFile: GitFile<T>,
  formOptions: Options,
  githubOptions: GithubOptions,
  isEditMode: boolean
) => {
  useGithubForm(jsonFile, githubOptions, isEditMode)
  
  const [formData, form] = useLocalForm({
    id: jsonFile.fileRelativePath, // needs to be unique
    label: formOptions.label || jsonFile.fileRelativePath,
    initialValues: jsonFile.data,
    fields: formOptions.fields || [],
    // save & commit the file when the "save" button is pressed
    onSubmit(formData, form) {
      return saveContent(
        githubOptions.forkFullName,
        githubOptions.branch,
        jsonFile.fileRelativePath,
        getCachedFormData(jsonFile.fileRelativePath).sha,
        JSON.stringify(formData, null, 2),
        'Update from TinaCMS'
      )
        .then(response => {          
          setCachedFormData(jsonFile.fileRelativePath, {
            sha: response.content.sha,
          })
        })
        .catch(e => {
          return { [FORM_ERROR]: new OpenAuthoringError(e.message, e.status) }
        })
    },
  })

  return [formData || jsonFile.data, form]
}

export function useLocalGithubJsonForm(
  jsonFile: GitFile,
  formOptions: Options,
  githubOptions: GithubOptions,
  isEditMode: boolean
) {
  const [values, form] = useGithubJsonForm(
    jsonFile,
    formOptions,
    githubOptions,
    isEditMode
  )
  usePlugins(form as any)
  return [values, form]
}
