import React from 'react'
import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import {
  useGithubToolbarPlugins,
  useGithubErrorListener,
} from 'react-tinacms-github'
import { useLocalStorageCache } from '../../utils/plugins/browser-storage-api/useLocalStorageCache'
import AutoAuthModal from '../open-authoring/AutoAuthModal'
import { Form, Plugin, useCMS } from 'tinacms'
import { ChevronDownIcon } from '@tinacms/icons'
import styled from 'styled-components'

interface Props extends InlineFormProps {
  editMode: boolean
  children: any
  path: string
}

export const OpenAuthoringSiteForm = ({
  form,
  editMode,
  path,
  children,
}: Props) => {
  // Toolbar Plugins
  useGithubToolbarPlugins(form, editMode)
  useBranchToolbarPlugins(form, editMode)

  // Persist pending changes to localStorage
  useLocalStorageCache(path, form, editMode)

  useGithubErrorListener(form)

  return (
    <>
      <InlineForm
        form={form}
        initialStatus={
          typeof document !== 'undefined' && editMode ? 'active' : 'inactive'
        }
      >
        {children}
      </InlineForm>
      <AutoAuthModal />
    </>
  )
}

const useBranchToolbarPlugins = (form: Form<any>, editMode: boolean) => {
  const cms = useCMS()

  React.useEffect(() => {
    const plugins = [BranchSwitcherPlugin()] as Plugin[]

    const removePlugins = () => {
      plugins.forEach(plugin => cms.plugins.remove(plugin))
    }

    if (editMode) {
      plugins.forEach(plugin => cms.plugins.add(plugin))
    } else {
      removePlugins()
    }

    return removePlugins
  }, [editMode, form])
}

export const BranchSwitcherPlugin = () => ({
  __type: 'toolbar:widget',
  name: 'branch-switcher',
  weight: 1,
  props: {},
  component: BranchSwitcher,
})

const BranchSwitcher = ({ forkName }: { forkName: string }) => {
  return (
    <SelectBox>
      <SelectLabel>Branch</SelectLabel>
      <SelectCurrent>master</SelectCurrent>
      <ChevronDownIcon />
    </SelectBox>
  )
}

const SelectBox = styled.button`
  border-radius: var(--tina-radius-small);
  border: 1px solid var(--tina-color-grey-2);
  background-color: white;
  padding: 4px 42px 4px 10px;
  position: relative;
  outline: none;
  cursor: pointer;
  min-width: 140px;

  svg {
    fill: var(--tina-color-primary);
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate3d(0, -50%, 0);
    width: 24px;
    height: auto;
  }
`

const SelectLabel = styled.span`
  color: var(--tina-color-grey-8);
  display: block;
  letter-spacing: 0.01em;
  line-height: 1.35;
  font-size: var(--tina-font-size-1);
  font-weight: 600;
  text-align: left;
`

const SelectCurrent = styled.span`
  color: var(--tina-color-grey-6);
  display: block;
  text-align: left;
  line-height: 18px;
`
