import React from 'react'
import styled from 'styled-components'

export const AuthLayout = styled(({ children, color, ...styleProps }) => {
  return <div {...styleProps}>{children}</div>
})`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1 1 auto;
  min-height: 100%;
`
