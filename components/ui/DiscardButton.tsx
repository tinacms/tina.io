import { useInlineForm } from 'react-tinacms-inline'
import { Button } from './Button'

export function DiscardButton() {
  const { form } = useInlineForm()

  return (
    <Button
      color="primary"
      onClick={() => {
        form.finalForm.reset()
      }}
    >
      Discard Changes
    </Button>
  )
}
