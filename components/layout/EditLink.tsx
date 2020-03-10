import { useEffect } from 'react'
import Cookies from 'js-cookie'
import styled, { css } from 'styled-components'
import { useCMS, useSubscribable } from 'tinacms'
import { getUser, getBranch } from '../../open-authoring/github/api'
import { EditIcon } from '@tinacms/icons'
import { enterEditMode, exitEditMode } from '../../open-authoring/authFlow'
import { Button } from '../ui'

interface EditLinkProps {
  color?: 'white' | 'primary' | 'secondary' | 'seafoam' | 'variable'
  editMode: boolean
}
import { useOpenAuthoring } from './OpenAuthoring'

export const EditLink = ({ color, editMode }: EditLinkProps) => {
  const cms = useCMS()

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
                openAuthoring.forkValid,
                true
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
