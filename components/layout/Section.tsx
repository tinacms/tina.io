import React from 'react'
import styled, { css } from 'styled-components'

export const Section = styled.section`
  padding: 3rem 0;

  @media (min-width: 800px) {
    padding: 5rem 0;
  }

  ${props =>
    props.seafoam &&
    css`
      background-color: var(--color-seafoam);
    `};
`
