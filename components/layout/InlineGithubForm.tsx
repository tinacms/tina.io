import React from 'react'
import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import { useGithubToolbarPlugins } from 'react-tinacms-github'
import { useLocalStorageCache } from 'utils/plugins/browser-storage-api/useLocalStorageCache'
import AutoAuthModal from '../open-authoring/AutoAuthModal'
import { useCMS } from 'tinacms'

interface Props extends InlineFormProps {
  children: any
}

export const InlineGithubForm = ({ form, children }: Props) => {
  const cms = useCMS()
  // Toolbar Plugins
  useGithubToolbarPlugins()

  // Persist pending changes to localStorage
  useLocalStorageCache(form.id, form, cms.enabled)

  return (
    <>
      <InlineForm form={form}>{children}</InlineForm>
      <AutoAuthModal />
    </>
  )
}
