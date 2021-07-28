import styled, { css } from 'styled-components'

interface WrapperProps {
  narrow?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  padding: 0 2rem;

  ${props =>
    props.narrow &&
    css`
      max-width: 900px;
    `};
`
