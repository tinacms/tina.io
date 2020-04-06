import { GitFile, GithubOptions, useGitFileSha } from './useGitFileSha'
import { Options } from 'next-tinacms-markdown'
import { useCMS, useLocalForm } from 'tinacms'
import { getForkName } from '../../open-authoring/open-authoring/repository'
import { FORM_ERROR } from 'final-form'

export const useGithubFileForm = <T = any>(
  file: GitFile<T>,
  formOptions: Options,
  githubOptions: GithubOptions,
  serialize: (data: T) => string
) => {
  const cms = useCMS()
  const [getSha, setSha] = useGitFileSha(file)

  const [formData, form] = useLocalForm({
    id: file.fileRelativePath, // needs to be unique
    label: formOptions.label || file.fileRelativePath,
    initialValues: file.data,
    fields: formOptions.fields || [],
    // save & commit the file when the "save" button is pressed
    onSubmit(formData, form) {
      return cms.api.github
        .save(
          githubOptions.forkFullName,
          githubOptions.branch,
          file.fileRelativePath,
          getSha(),
          serialize(formData),
          'Update from TinaCMS'
        )
        .then(response => {
          cms.alerts.success(
            `Saved Successfully: Changes committed to ${getForkName()}`
          )
          setSha(response.content.sha)
        })
        .catch(e => {
          return { [FORM_ERROR]: e }
        })
    },
  })

  return [formData || file.data, form]
}
