import { InlineForm, InlineFormProps } from 'react-tinacms-inline'
import { OpenAuthoringModalContainer } from '../../open-authoring/OpenAuthoringModalContainer'
import { Button, color } from '@tinacms/styles'
import UndoIconSvg from '../../public/svg/undo-icon.svg'
import styled, { css } from 'styled-components'
import { useEffect, useCallback, useState } from 'react'
import { useCMS, useWatchFormValues, Form, TinaCMS, FieldMeta } from 'tinacms'
import createDecorator from 'final-form-submit-listener'
import Cookies from 'js-cookie'
import { PRPlugin } from '../../open-authoring/PRPlugin'

interface Props extends InlineFormProps {
  editMode: boolean
  previewError?: string
  children: any
  path: string
}

const OpenAuthoringSiteForm = ({
  form,
  editMode,
  previewError,
  path,
  children,
}: Props) => {
  const [statefulPreviewError, setStatefulPreviewError] = useState(previewError)
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
    const dirty = form.finalForm.getState().dirty ? true : false
    const plugins = [
      {
        __type: 'toolbar:git',
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
      // TODO
      PRPlugin('pass', 'real', 'values'),
      {
        __type: 'toolbar:form-actions',
        name: 'base-form-actions',
        component: () => (
          <>
            {form.finalForm.getState().dirty ? (
              <>
                <ToolbarButton
                  onClick={() => {
                    form.finalForm.reset()
                  }}
                >
                  <UndoIconSvg /> Discard
                </ToolbarButton>
                <SaveButton primary onClick={form.submit}>
                  Save Page
                </SaveButton>
              </>
            ) : (
              <>
                <ToolbarButton onClick={form.reset} disabled>
                  <UndoIconSvg /> Discard
                </ToolbarButton>
                <SaveButton primary onClick={form.submit} disabled>
                  Save Page
                </SaveButton>
              </>
            )}
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

  /* persist pending changes to localStorage
   */

  const saveToStorage = useCallback(
    formData => {
      cms.api.storage.save(path, formData.values)
    },
    [path]
  )

  // save to storage on change
  useWatchFormValues(form, saveToStorage)

  // load from storage on boot
  useEffect(() => {
    if (!editMode) return

    const values = cms.api.storage.load(path)
    if (values) {
      form.updateValues(values)
    }
  }, [form, editMode])
  // show feedback onSave
  useEffect(() => {
    const submitListener = createDecorator({
      afterSubmitSucceeded: () =>
        cms.alerts.success(
          `Saved Successfully: Changes committed to ${Cookies.get(
            'fork_full_name'
          )}`
        ),
      afterSubmitFailed: failedForm =>
        setStatefulPreviewError(failedForm.getState().submitError),
    })

    const undecorateSaveListener = submitListener(form.finalForm)

    return undecorateSaveListener
  }, [form])

  return (
    <InlineForm
      form={form}
      initialStatus={
        typeof document !== 'undefined' && editMode ? 'active' : 'inactive'
      }
    >
      <OpenAuthoringModalContainer previewError={statefulPreviewError} />
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
            <StatusMessage warning>
              <span></span> Unsaved changes
            </StatusMessage>
          ) : (
            <StatusMessage>
              <span></span> No changes
            </StatusMessage>
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
  font-size: 16px;
  color: ${color.primary('dark')};
`

export const ToolbarButton = styled(Button)`
  display: flex;
  align-items: center;
  white-space: nowrap;

  svg {
    fill: currentColor;
    opacity: 0.7;
    width: 2.5em;
    height: 2.5em;
    margin-right: 0.25rem;
  }
`

const SaveButton = styled(ToolbarButton)`
  padding: 0 2rem;
`
interface StatusMessageProps {
  warning?: boolean
}

const StatusMessage = styled.p<StatusMessageProps>`
  font-size: 16px;
  display: flex;
  align-items: center;
  color: ${color.grey(6)};
  padding-right: 4px;

  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    margin-top: -1px;
    background-color: #3cad3a;
    border: 1px solid #249a21;
    margin-right: 5px;
    opacity: 0.5;
  }

  ${p =>
    p.warning &&
    css`
      span {
        background-color: #e9d050;
        border: 1px solid #d3ba38;
        opacity: 1;
      }
    `};
`

export default OpenAuthoringSiteForm
