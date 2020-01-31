import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1232px;
  margin: 0 auto;
  padding: 0 2rem;

  ${props =>
    props.narrow &&
    css`
      max-width: 768px;
    `};
`
