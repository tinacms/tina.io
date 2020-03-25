import styled from 'styled-components'
import { useCMS } from 'tinacms'
import { EditIcon } from '@tinacms/icons'
import { enterEditMode, exitEditMode } from '../../open-authoring/auth/authFlow'
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
      onClick={
        editMode
          ? exitEditMode
          : () =>
              enterEditMode(
                openAuthoring.githubAuthenticated,
                openAuthoring.forkValid
              )
      }
    >
      <EditIcon /> {editMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </EditToggleButton>
  )
}

interface EditToggleButtonProps {
  isEditMode: boolean
}

const EditToggleButton = styled(Button)``
