import { useInlineForm } from 'react-tinacms-inline'
import { Button as TinaButton } from '@tinacms/styles'

export function DiscardButton() {
  const { form } = useInlineForm()

  if (form.finalForm.getState().pristine) {
    return null
  }

  return (
    <TinaButton
      color="primary"
      onClick={() => {
        form.finalForm.reset()
      }}
    >
      Discard Changes
    </TinaButton>
  )
}
