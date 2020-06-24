import styled from 'styled-components'
import { EditIcon } from '@tinacms/icons'
import { useCMS } from 'tinacms'
import { Button } from '../ui'

interface EditLinkProps {
  color?: 'white' | 'primary' | 'secondary' | 'seafoam' | 'variable'
}

export const EditLink = ({ color }: EditLinkProps) => {
  const cms = useCMS()
  return (
    <Button
      id="OpenAuthoringEditButton"
      color={color}
      onClick={() => (cms.disabled ? cms.enable() : cms.disable())}
    >
      <EditIcon /> {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </Button>
  )
}
