import { Form, useCMS, FieldMeta } from 'tinacms'
import { useEffect, useState } from 'react'
import { DesktopLabel } from '../components/ui/inline/DesktopLabel'
import PRPlugin from './toolbar-plugins/pull-request'
import styled, { css } from 'styled-components'
import { color } from '@tinacms/styles'
import { getForkName } from './utils/repository'
import { ForkNamePlugin } from './toolbar-plugins/ForkNamePlugin'
import { FormActionsPlugin } from './toolbar-plugins/FormActionsPlugin'

const useFormState = (form, subscription) => {
  const [state, setState] = useState(form.finalForm.getState())
  useEffect(() => {
    form.subscribe(setState, subscription)
  }, [form])

  return state
}

export const useOpenAuthoringToolbarPlugins = (
  form: Form<any>,
  editMode: boolean
) => {
  const cms = useCMS()
  const formState = useFormState(form, { dirty: true, submitting: true })

  useEffect(() => {
    const forkName = getForkName()
    const plugins = [
      ForkNamePlugin(forkName),
      PRPlugin(process.env.REPO_FULL_NAME, forkName),
      FormActionsPlugin(form, formState),
      {
        __type: 'toolbar:status',
        name: 'form-state-dirty',
        props: {
          dirty: formState.dirty,
        },
        component: FormStatus,
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
  }, [editMode, form, formState])
}

interface StatusLightProps {
  warning?: boolean
}

const StatusLight = styled.span<StatusLightProps>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  margin-top: -1px;
  background-color: #3cad3a;
  border: 1px solid #249a21;
  margin-right: 5px;
  opacity: 0.5;

  ${p =>
    p.warning &&
    css`
      background-color: #e9d050;
      border: 1px solid #d3ba38;
      opacity: 1;
    `};
`

const StatusMessage = styled.p`
  font-size: 16px;
  display: flex;
  align-items: center;
  color: ${color.grey(6)};
  padding-right: 4px;
`

const FormStatus = ({ dirty }) => {
  return (
    <FieldMeta name={'Form Status'}>
      {dirty ? (
        <StatusMessage>
          <StatusLight warning /> <DesktopLabel>Unsaved changes</DesktopLabel>
        </StatusMessage>
      ) : (
        <StatusMessage>
          <StatusLight /> <DesktopLabel>No changes</DesktopLabel>
        </StatusMessage>
      )}
    </FieldMeta>
  )
}
