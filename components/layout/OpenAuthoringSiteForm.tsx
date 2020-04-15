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
import styled, { css } from 'styled-components'
import { Dismissible } from 'react-dismissible'

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
  const [open, setOpen] = React.useState(true)

  return (
    <SelectWrapper>
      <SelectBox onClick={() => setOpen(!open)} open={open}>
        <SelectLabel>Branch</SelectLabel>
        <SelectCurrent>master</SelectCurrent>
        <ChevronDownIcon />
      </SelectBox>
      <SelectDropdown open={open}>
        <Dismissible
          click
          escape
          disabled={!open}
          onDismiss={() => {
            setOpen(false)
          }}
        >
          <SelectList>
            <SelectOption>master</SelectOption>
            <SelectOption current>style-fixes</SelectOption>
            <SelectOption>new-blog-post</SelectOption>
            <SelectOption>some-branch</SelectOption>
            <SelectOption>my-changes</SelectOption>
            <SelectOption>editor_refactor</SelectOption>
            <SelectOption>toolbar-bug-fixes</SelectOption>
            <SelectOption>docs-updates</SelectOption>
            <SelectOption>get-github-static-props</SelectOption>
          </SelectList>
          <DropdownActions>
            <ActionableInput></ActionableInput>
          </DropdownActions>
        </Dismissible>
      </SelectDropdown>
    </SelectWrapper>
  )
}

const ActionableInput = styled.div``

const DropdownActions = styled.div`
  background-color: var(--tina-color-grey-1);
  border-top: 1px solid var(--tina-color-grey-2);
  padding: var(--tina-padding-small);
`

export interface SelectOptionProps {
  current?: boolean
}

const SelectOption = styled.button<SelectOptionProps>`
  display: lock;
  border: none;
  outline: none;
  padding: 4px var(--tina-padding-small);
  background: transparent;
  color: var(--tina-color-grey-6);
  text-align: left;
  line-height: 17px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;
  transition: all 150ms ease-out;

  :first-child {
    padding-top: 8px;
  }

  :last-child {
    padding-bottom: 8px;
  }

  :hover {
    color: var(--tina-color-primary);
    background-color: var(--tina-color-grey-1);
  }

  ${p =>
    p.current &&
    css`
      font-weight: bold;
      color: var(--tina-color-primary);
      background-color: var(--tina-color-grey-1);
    `};
`

const SelectList = styled.div`
  max-width: 350px;
  min-width: 200px;
  max-height: 160px;
  overflow-y: scroll;
`

const SelectWrapper = styled.div`
  position: relative;
`

export interface SelectDropdownProps {
  open?: boolean
}

const SelectDropdown = styled.div<SelectDropdownProps>`
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translate3d(-50%, calc(100% - 16px), 0) scale3d(0.5, 0.5, 1);
  border-radius: var(--tina-radius-small);
  border: 1px solid var(--tina-color-grey-2);
  box-shadow: var(--tina-shadow-big);
  background-color: white;
  transform-origin: 50% 0;
  pointer-events: none;
  transition: all 150ms ease-out;
  opacity: 0;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate3d(-50%, -100%, 0);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid var(--tina-color-grey-2);
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 1px;
    left: 50%;
    transform: translate3d(-50%, -100%, 0);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }

  ${p =>
    p.open &&
    css`
      opacity: 1;
      pointer-events: auto;
      transform: translate3d(-50%, 100%, 0) scale3d(1, 1, 1);
    `};
`

export interface SelectBoxProps {
  open: boolean
}

const SelectBox = styled.button<SelectBoxProps>`
  border-radius: var(--tina-radius-small);
  border: 1px solid var(--tina-color-grey-2);
  background-color: white;
  padding: 4px 42px 5px var(--tina-padding-small);
  position: relative;
  outline: none;
  cursor: pointer;
  min-width: 140px;
  transition: all 150ms ease-out;

  :hover {
    background-color: var(--tina-color-grey-1);
  }

  svg {
    fill: var(--tina-color-primary);
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translate3d(0, -50%, 0);
    width: 24px;
    height: auto;
  }

  ${p =>
    p.open &&
    css`
      background-color: var(--tina-color-grey-1);
    `};
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
  line-height: 17px;
`
