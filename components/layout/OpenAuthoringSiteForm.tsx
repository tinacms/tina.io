import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import { OpenAuthoringModalContainer } from '../../open-authoring/OpenAuthoringModalContainer'
import {
  InlineControls,
  EditToggle,
  DiscardButton,
} from '../../components/ui/inline'
import { useEffect } from 'react'
import { Button, color } from '@tinacms/styles'
import { useCMS, Form, TinaCMS, FieldMeta } from 'tinacms'
import Cookies from 'js-cookie'
import UndoIconSvg from '../../public/svg/undo-icon.svg'
import PrIconSvg from '../../public/svg/pr-icon.svg'
import styled from 'styled-components'

interface Props extends InlineFormProps {
  editMode: boolean
  previewError?: string
  children: any
}

const OpenAuthoringSiteForm = ({
  form,
  editMode,
  previewError,
  children,
}: Props) => {
  const cms = useCMS()
  useEffect(() => {
    /*
     ** Random Fix: sidebar state isn't updated properly
     ** without this timeout. If and when the 'preview'
     ** state is accessible in _app, we'd like to move
     ** the editMode/sidebar.hidden stuff to _app
     */
    setTimeout(() => (cms.sidebar.hidden = !editMode), 1)
  }, [])

  /**
   * Toolbar Plugins
   */
  useEffect(() => {
    const plugins = [
      {
        __type: 'toolbar:tool',
        name: 'create-pr',
        component: () => (
          <ActionButton>
            <PrIconSvg /> Pull Request
          </ActionButton>
        ),
      },
      {
        __type: 'toolbar:status',
        name: 'current-fork',
        component: () => {
          const forkName = Cookies.get('fork_full_name')
          return (
            <FieldMeta name={'Fork'}>
              <MetaLink target="_blank" href={`https://github.com/${forkName}`}>
                {forkName}
              </MetaLink>
            </FieldMeta>
          )
        },
      },
      {
        __type: 'toolbar:form-actions',
        name: 'base-form-actions',
        component: () => (
          <>
            <ActionButton onClick={form.reset}>
              <UndoIconSvg /> Discard
            </ActionButton>
            <SaveButton primary onClick={form.submit}>
              Save Page
            </SaveButton>
          </>
        ),
      },
    ] as any

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

  useFormStatusPlugin(form, cms, editMode)

  return (
    <InlineForm
      form={form}
      initialStatus={
        typeof document !== 'undefined' && editMode ? 'active' : 'inactive'
      }
    >
      <OpenAuthoringModalContainer previewError={previewError} />
      <InlineControls>
        {editMode && <EditToggle />}
        <DiscardButton />
      </InlineControls>
      {children}
    </InlineForm>
  )
}

const useFormStatusPlugin = (
  form: Form<any>,
  cms: TinaCMS,
  editMode: boolean
) => {
  useEffect(() => {
    const plugin = {
      __type: 'toolbar:status',
      name: 'form-state-dirty',
      component: () => (
        <FieldMeta name={'Form Status'}>
          {form.finalForm.getState().dirty ? (
            <div>Unsaved changes</div>
          ) : (
            <div>No changes</div>
          )}
        </FieldMeta>
      ),
    }

    if (editMode) {
      cms.plugins.add(plugin)
    }

    return () => cms.plugins.remove(plugin)
  }, [editMode, form, form.finalForm.getState().dirty])
}

const MetaLink = styled.a`
  font-size: 18px;
  color: ${color.primary('dark')};
`

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;

  svg {
    fill: currentColor;
    opacity: 0.7;
    width: 2.5em;
    height: 2.5em;
    margin-right: 0.25rem;
  }
`

const SaveButton = styled(ActionButton)`
  padding: 0 2rem;
`

export default OpenAuthoringSiteForm
