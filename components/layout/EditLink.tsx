import { EditIcon } from '@tinacms/icons'
import { Button } from '../ui'
import { useCMS } from 'tinacms'

interface EditLinkProps {
  color?: 'white' | 'primary' | 'secondary' | 'seafoam' | 'variable'
}

export const EditLink = ({ color }: EditLinkProps) => {
  const cms = useCMS()

  return (
    <Button id="OpenAuthoringEditButton" color={color} onClick={cms.toggle}>
      <EditIcon /> {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </Button>
  )
}
