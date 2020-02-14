import styled from 'styled-components'
import { TinaReset, Button as TinaButton } from '@tinacms/styles'

export const InlineControls = styled(({ children, ...styleProps }: any) => {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div {...styleProps}>
      <TinaReset>{children}</TinaReset>
    </div>
  )
})`
  position: fixed;
  bottom: 2.75rem;
  margin-left: 4rem;
  display: flex;
  overflow: visible;
  z-index: 1000;

  ${TinaButton} {
    font-size: 16px;
    height: 44px;
  }

  ${TinaReset} {
    overflow: visible;
  }

  button {
    margin-right: 1rem;
    text-transform: none;
    opacity: 1;
  }
`
