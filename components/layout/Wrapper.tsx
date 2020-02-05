import styled, { css } from 'styled-components'

interface WrapperProps {
  narrow?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  max-width: 1232px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 500px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  ${props =>
    props.narrow &&
    css`
      max-width: 768px;
    `};
`
