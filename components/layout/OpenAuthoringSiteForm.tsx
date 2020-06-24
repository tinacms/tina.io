import React from 'react'
import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import { useGithubToolbarPlugins } from 'react-tinacms-github'
import { useLocalStorageCache } from '../../utils/plugins/browser-storage-api/useLocalStorageCache'
import AutoAuthModal from '../open-authoring/AutoAuthModal'

interface Props extends InlineFormProps {
  children: any
  path: string
}

export const OpenAuthoringSiteForm = ({ form, path, children }: Props) => {
  // Toolbar Plugins
  useGithubToolbarPlugins()

  // Persist pending changes to localStorage
  useLocalStorageCache(path, form)

  return (
    <>
      <InlineForm form={form}>{children}</InlineForm>
      <AutoAuthModal />
    </>
  )
}
