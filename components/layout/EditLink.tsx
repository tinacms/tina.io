import styled from 'styled-components'
import { EditIcon } from '@tinacms/icons'
import { exitEditMode } from '../../open-authoring/auth/authFlow'
import { Button } from '../ui'

interface EditLinkProps {
  color?: 'white' | 'primary' | 'secondary' | 'seafoam' | 'variable'
  editMode: boolean
}
import { useOpenAuthoring } from '../../open-authoring/open-authoring/OpenAuthoringProvider'

export const EditLink = ({ color, editMode }: EditLinkProps) => {
  const openAuthoring = useOpenAuthoring()
  return (
    <EditToggleButton
      id="OpenAuthoringEditButton"
      color={color}
      onClick={editMode ? exitEditMode : openAuthoring.enterEditMode}
    >
      <EditIcon /> {editMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </EditToggleButton>
  )
}

interface EditToggleButtonProps {
  isEditMode: boolean
}

const EditToggleButton = styled(Button)``
