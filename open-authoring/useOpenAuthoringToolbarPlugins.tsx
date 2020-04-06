import { Form, useCMS, FieldMeta } from 'tinacms'
import { useEffect, useState } from 'react'
import { ToolbarButton } from '../components/ui/ToolbarButton'
import { DesktopLabel } from '../components/ui/DesktopLabel'
import { PRPlugin } from './PRPlugin'
import styled, { css } from 'styled-components'
import UndoIconSvg from '../public/svg/undo-icon.svg'
import { LoadingDots } from '../components/ui/LoadingDots'
import { getForkName } from './utils/repository'

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
      {
        __type: 'toolbar:git',
        name: 'current-fork',
        component: () => {
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
      PRPlugin(process.env.REPO_FULL_NAME, forkName),
      {
        __type: 'toolbar:form-actions',
        name: 'base-form-actions',
        component: () => (
          <>
            {formState.dirty ? (
              <>
                <ToolbarButton
                  onClick={() => {
                    form.finalForm.reset()
                  }}
                >
                  <UndoIconSvg />
                  <DesktopLabel> Discard</DesktopLabel>
                </ToolbarButton>
                <SaveButton
                  primary
                  onClick={form.submit}
                  busy={formState.submitting}
                >
                  {formState.submitting && <LoadingDots />}
                  {!formState.submitting && (
                    <>
                      Save <DesktopLabel>&nbsp;Page</DesktopLabel>
                    </>
                  )}
                </SaveButton>
              </>
            ) : (
              <>
                <ToolbarButton onClick={form.reset} disabled>
                  <UndoIconSvg />
                  <DesktopLabel> Discard</DesktopLabel>
                </ToolbarButton>
                <SaveButton primary onClick={form.submit} disabled>
                  Save <DesktopLabel>&nbsp;Page</DesktopLabel>
                </SaveButton>
              </>
            )}
          </>
        ),
      },
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

const MetaLink = styled.a`
  display: block;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  color: var(--tina-color-primary-dark);
`

const SaveButton = styled(ToolbarButton)`
  padding: 0 2rem;
`
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
  color: var(--tina-color-grey-6);
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
