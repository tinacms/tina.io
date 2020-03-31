import { FormOptions, useLocalForm, usePlugins, Field, useCMS } from 'tinacms'
import { useGitFileSha, GithubOptions, GitFile } from './useGitFileSha'
import { FORM_ERROR } from 'final-form'
import OpenAuthoringError from '../../open-authoring/OpenAuthoringError'
import { getForkName } from '../../open-authoring/open-authoring/repository'

export interface Options {
  id?: string
  label?: string
  fields?: Field[]
  actions?: FormOptions<any>['actions']
}

const useGithubJsonForm = <T = any>(
  jsonFile: GitFile<T>,
  formOptions: Options,
  githubOptions: GithubOptions
) => {
  const cms = useCMS()
  const [getSha, setSha] = useGitFileSha(jsonFile)

  const [formData, form] = useLocalForm({
    id: jsonFile.fileRelativePath, // needs to be unique
    label: formOptions.label || jsonFile.fileRelativePath,
    initialValues: jsonFile.data,
    fields: formOptions.fields || [],
    // save & commit the file when the "save" button is pressed
    onSubmit(formData, form) {
      return cms.api.github
        .save(
          githubOptions.forkFullName,
          githubOptions.branch,
          jsonFile.fileRelativePath,
          getSha(),
          JSON.stringify(formData, null, 2),
          'Update from TinaCMS'
        )
        .then(response => {
          cms.alerts.success(
            `Saved Successfully: Changes committed to ${getForkName()}`
          )

          setSha(response.content.sha)
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
  githubOptions: GithubOptions
) {
  const [values, form] = useGithubJsonForm(jsonFile, formOptions, githubOptions)
  usePlugins(form as any)
  return [values, form]
}
