import styled from 'styled-components'
import { useCMS } from 'tinacms'
import { EditIcon } from '@tinacms/icons'
import { Button } from '../ui'

interface EditLinkProps {
  color?: 'white' | 'primary' | 'secondary' | 'seafoam' | 'variable'
  preview: boolean
}

export const EditLink = ({ color, preview }: EditLinkProps) => {
  const cms = useCMS()
  return (
    <EditToggleButton
      id="OpenAuthoringEditButton"
      color={color}
      onClick={() => cms.toggle()}
    >
      <EditIcon /> {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </EditToggleButton>
  )
}

interface EditToggleButtonProps {
  isEditMode: boolean
}

const EditToggleButton = styled(Button)``
