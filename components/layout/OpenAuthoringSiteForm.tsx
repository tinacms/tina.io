import React from 'react'
import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import { useGithubToolbarPlugins } from 'react-tinacms-github'
import { useLocalStorageCache } from '../../utils/plugins/browser-storage-api/useLocalStorageCache'
import AutoAuthModal from '../open-authoring/AutoAuthModal'
import { useCMS } from 'tinacms'

interface Props extends InlineFormProps {
  preview: boolean
  children: any
  path: string
}

export const OpenAuthoringSiteForm = ({
  form,
  preview,
  path,
  children,
}: Props) => {
  const cms = useCMS()
  // Toolbar Plugins
  useGithubToolbarPlugins()

  const github = cms.api.github
  const cacheId = `${github.workingRepoFullName}/${github.branchName}/${form.id}`
  // Persist pending changes to localStorage
  useLocalStorageCache(cacheId, form, preview)

  return (
    <>
      <InlineForm
        form={form}
        initialStatus={
          typeof document !== 'undefined' && preview ? 'active' : 'inactive'
        }
      >
        {children}
      </InlineForm>
      <AutoAuthModal />
    </>
  )
}
