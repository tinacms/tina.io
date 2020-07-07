import styled from 'styled-components'
import { EditIcon } from '@tinacms/icons'
import { Button } from '../ui'

interface EditLinkProps {
  color?: 'white' | 'primary' | 'secondary' | 'seafoam' | 'variable'
}

export const EditLink = ({ color, preview }: EditLinkProps) => {
  const openAuthoring = useGithubEditing()
  return (
    <EditToggleButton
      id="OpenAuthoringEditButton"
      color={color}
      onClick={
        preview ? openAuthoring.exitEditMode : openAuthoring.enterEditMode
      }
    >
      <EditIcon /> {preview ? 'Exit Edit Mode' : 'Edit This Site'}
    </EditToggleButton>
  )
}

interface EditToggleButtonProps {
  isEditMode: boolean
}

const EditToggleButton = styled(Button)``
