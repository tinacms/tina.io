import styled from 'styled-components'
import { useCMS } from 'tinacms'
import { EditIcon } from '@tinacms/icons'
import {
  exitEditMode,
  enterEditModeWithoutAuth,
} from '../../open-authoring/authFlow'
import { Button } from '../ui'

interface EditLinkProps {
  color?: 'white' | 'primary' | 'secondary' | 'seafoam' | 'variable'
  editMode: boolean
}
import { useOpenAuthoring } from './OpenAuthoring'

export const EditLink = ({ color, editMode }: EditLinkProps) => {
  const cms = useCMS()

  return (
    <EditToggleButton
      id="OpenAuthoringEditButton"
      color={color}
      onClick={editMode ? exitEditMode : enterEditModeWithoutAuth}
    >
      <EditIcon /> {editMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </EditToggleButton>
  )
}

interface EditToggleButtonProps {
  isEditMode: boolean
}

const EditToggleButton = styled(Button)``
