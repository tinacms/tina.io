import { FormOptions, useLocalForm, useCMS, usePlugins } from 'tinacms'
import { saveContent } from '../open-authoring/github/api'
import { getCachedFormData, setCachedFormData } from './formCache'
import { useEffect, useMemo } from 'react'
import { PRPlugin } from '../open-authoring/prPlugin'

interface JsonFile<T = any> {
  fileRelativePath: string
  sha: string
  data: T
}

interface GithubOptions {
  baseRepoFullName: string
  forkFullName: string
  branch: string
  accessToken: string
}

const useGithubJsonForm = <T = any>(
  jsonFile: JsonFile<T>,
  formOptions: FormOptions<any>,
  githubOptions: GithubOptions
) => {
  const cms = useCMS()

  useEffect(() => {
    setCachedFormData(jsonFile.fileRelativePath, {
      sha: jsonFile.sha,
    })
  }, [])

  const prPlugin = useMemo(() => {
    return new PRPlugin(
      githubOptions.baseRepoFullName,
      githubOptions.forkFullName,
      githubOptions.accessToken
    )
  }, [
    githubOptions.baseRepoFullName,
    githubOptions.forkFullName,
    githubOptions.accessToken,
  ])

  usePlugins(prPlugin)

  const [formData, form] = useLocalForm({
    id: jsonFile.fileRelativePath, // needs to be unique
    label: formOptions.label || jsonFile.fileRelativePath,
    initialValues: jsonFile.data,
    fields: formOptions.fields || [],
    // save & commit the file when the "save" button is pressed
    onSubmit(formData, form) {
      saveContent(
        githubOptions.forkFullName,
        githubOptions.branch,
        jsonFile.fileRelativePath,
        githubOptions.accessToken,
        getCachedFormData(jsonFile.fileRelativePath).sha,
        JSON.stringify(formData),
        'Update from TinaCMS'
      ).then(response => {
        setCachedFormData(jsonFile.fileRelativePath, {
          sha: response.data.content.sha,
        })
      })
    },
  })

  return [formData || jsonFile.data, form]
}

export function useLocalGithubJsonForm(
  jsonFile: JsonFile,
  formOptions: FormOptions<any>,
  githubOptions: GithubOptions
) {
  const [values, form] = useGithubJsonForm(jsonFile, formOptions, githubOptions)
  usePlugins(form as any)
  return [values, form]
}
