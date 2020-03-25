import { ToolbarButton } from '../../components/ui/inline/ToolbarButton'
import { DesktopLabel } from '../../components/ui/inline/DesktopLabel'
import { Form } from 'tinacms'
import { LoadingDots } from '../../components/ui/LoadingDots'
import UndoIconSvg from '../../public/svg/undo-icon.svg'
import styled from 'styled-components'

export const FormActionsPlugin = (form: Form<any>, formState) => ({
  __type: 'toolbar:form-actions',
  name: 'base-form-actions',
  component: () => {
    return (
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
    )
  },
})

const SaveButton = styled(ToolbarButton)`
  padding: 0 2rem;
`
