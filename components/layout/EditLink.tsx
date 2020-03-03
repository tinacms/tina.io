import { useEffect } from 'react'
import Cookies from 'js-cookie'
import styled from 'styled-components'
// import { isEditMode } from '../../utils'
import { useCMS, useSubscribable } from 'tinacms'
import { getUser, getBranch } from '../../open-authoring/github/api'

import { enterEditMode, exitEditMode } from '../../open-authoring/authFlow'
import { useOpenAuthoring } from './OpenAuthoring'

export const EditLink = () => {
  const cms = useCMS()

  let _isEditMode = !cms.sidebar.hidden

  useSubscribable(cms.sidebar, () => {
    _isEditMode = !cms.sidebar.hidden
  })

  const openAuthoring = useOpenAuthoring()

  return (
    <EditButton
      id="OpenAuthoringEditButton"
      onClick={
        _isEditMode
          ? exitEditMode
          : () =>
              enterEditMode(
                openAuthoring.githubAuthenticated,
                openAuthoring.forkValid
              )
      }
    >
      {_isEditMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </EditButton>
  )
}

const EditButton = styled.button`
  background: none;
  padding: 0;
  display: inline;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  transition: all 150ms ease-out;
  transform: translate3d(0px, 0px, 0px);

  &:hover,
  &:focus {
    text-decoration: none;
    transform: translate3d(-1px, -2px, 0);
    transition: transform 180ms ease-out;
  }
  &:focus,
  &:active {
    outline: none;
  }
  &:active {
    filter: none;
  }
`
