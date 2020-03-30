import React, { useState, useEffect } from 'react'
import { useCMS, useSubscribable, Form, FieldMeta, Plugin } from 'tinacms'
import { Button, color } from '@tinacms/styles'
import { CreateContentMenu } from './CreateContent'
import styled, { css } from 'styled-components'
import { ToolbarButton } from '../ui/inline/ToolbarButton'
import UndoIconSvg from '../../public/svg/undo-icon.svg'
import { DesktopLabel } from '../ui/inline/DesktopLabel'
import { LoadingDots } from '../ui/LoadingDots'

const SaveButton = styled(ToolbarButton)`
  padding: 0 2rem;
`

const useFormState = (form: Form | null, subscription: any): any => {
  const [state, setState] = useState<any>()
  useEffect(() => {
    if (!form) return
    form.subscribe(setState, subscription)
  }, [form])

  return state
}

interface ToolbarWidgetPlugin extends Plugin {
  weight: number
  component(): React.ReactElement
}

export const Toolbar = styled(({ ...styleProps }) => {
  const cms = useCMS()
  const widgets = cms.plugins.getType<ToolbarWidgetPlugin>('toolbar:widget')

  const forms = cms.forms
  const form = cms.forms.all().length ? cms.forms.all()[0] : null
  const formState = useFormState(form, { pristine: true, submitting: true })

  useSubscribable(forms)
  useSubscribable(widgets)

  // TODO: Find a more accurate solution then this.
  const inEditMode = widgets.all().length

  if (!inEditMode) {
    return null
  }
  return (
    <>
      <ToolbarPlaceholder />
      <div {...styleProps}>
        <Create>
          <CreateContentMenu />
        </Create>
        <Github>
          {widgets
            .all()
            .sort((a, b) => a.weight - b.weight)
            .map(widget => (
              <widget.component key={widget.name} />
            ))}
        </Github>
        {formState && (
          <>
            <Status>
              <FormStatus dirty={!formState.pristine} />}
            </Status>
            <Actions>
              <ToolbarButton disabled={formState.pristine} onClick={form.reset}>
                <UndoIconSvg />
                <DesktopLabel> Discard</DesktopLabel>
              </ToolbarButton>
              <SaveButton
                primary
                onClick={form.submit}
                busy={formState.submitting}
                disabled={formState.pristine}
              >
                {formState.submitting && <LoadingDots />}
                {!formState.submitting && (
                  <>
                    Save <DesktopLabel>&nbsp;Page</DesktopLabel>
                  </>
                )}
              </SaveButton>
            </Actions>
          </>
        )}
      </div>
    </>
  )
})`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 0.75rem;
  width: 100%;
  height: 62px;
  background-color: #f6f6f9;
  z-index: 10000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #edecf3;
  display: grid;
  grid-template-areas: 'create github status actions';
  grid-template-columns: auto 1fr auto auto;
  align-items: stretch;

  @media (max-width: 1029px) {
    label {
      display: none;
    }
  }
`

const Github = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  padding-right: 0.75rem;
  border-right: 1px solid white;
  box-shadow: inset -1px 0 0 #e1ddec;
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.01),
    transparent 3rem
  );

  > * {
    margin-bottom: 0;
    margin-left: 1rem;
  }

  > div {
    display: none;
  }

  label {
    margin-bottom: 0;
    white-space: nowrap;
  }

  @media (min-width: 1030px) {
    > div {
      display: block;
    }
  }
`

const Create = styled.div`
  grid-area: create;
  justify-self: start;
  display: flex;
  align-items: center;
`

const Status = styled.div`
  grid-area: status;
  justify-self: end;
  display: flex;
  align-items: center;

  > * {
    margin-bottom: 0;
    margin-left: 1rem;
  }

  label {
    margin-bottom: 0;
  }
`

const Actions = styled.div`
  grid-area: actions;
  justify-self: end;
  display: flex;
  align-items: center;

  ${Button} {
    margin-left: 0.75rem;
  }
`

const ToolbarPlaceholder = styled.div`
  position: relative;
  opacity: 0;
  display: block;
  width: 100%;
  height: 62px;
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
