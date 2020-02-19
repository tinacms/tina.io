import { useInlineForm } from 'react-tinacms-inline'
import { Button } from '../Button'

export function EditToggle() {
  const { status, deactivate, activate } = useInlineForm()

  return (
    <Button
      color="primary"
      onClick={() => {
        status === 'active' ? deactivate() : activate()
      }}
    >
      {status === 'active' ? 'Preview' : 'Edit'}
    </Button>
  )
}
