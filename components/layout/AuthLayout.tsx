import React from 'react'
import styled from 'styled-components'
import { TinaIcon } from '../logo/TinaIcon'
import { RichTextWrapper } from '.'
import RichText from '../styles/RichText'

export const AuthLayout = styled(({ children, color, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <AuthHeader>
        <TinaIcon />
      </AuthHeader>
      <AuthWrapper>{children}</AuthWrapper>
    </div>
  )
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1 1 auto;
  min-height: 100%;
  padding: 1.5rem;
  background: var(--color-seafoam);
`

const AuthWrapper = styled.div`
  ${RichText}

  h2 {
    text-align: center;
    max-width: 36rem;
    display: block;
    margin: 2rem auto;
  }

  p {
    text-align: center;
    max-width: 42rem;
    display: block;
    margin: -0.5rem auto 1.5rem auto;
    font-size: 1.375rem;
  }
`

const AuthHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;

  ${TinaIcon} {
    width: 2.5rem;
    height: auto;

    svg {
      width: 100%;
      height: auto;
    }
  }
`
