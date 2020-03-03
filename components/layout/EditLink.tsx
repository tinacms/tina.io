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
}

export const EditLink = ({ color }: EditLinkProps) => {
  const cms = useCMS()

  let _isEditMode = !cms.sidebar.hidden

  useSubscribable(cms.sidebar, () => {
    _isEditMode = !cms.sidebar.hidden
  })

  return (
    <EditToggleButton
      id="OpenAuthoringEditButton"
      color={color}
      onClick={_isEditMode ? exitEditMode : enterEditMode}
    >
      <EditIcon /> {_isEditMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </EditToggleButton>
  )
}

interface EditToggleButtonProps {
  isEditMode: boolean
}

const EditToggleButton = styled(Button)``
