import React from 'react'
import styled, { css } from 'styled-components'

interface Overlay {
  open: boolean
}

export const Overlay = styled.div<Overlay>`
  pointer-events: none;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-secondary);
  transition: all 180ms ease-out;
  opacity: 0;
  z-index: 48;

  ${props =>
    props.open &&
    css`
      opacity: 0.7;
      pointer-events: all;
    `};
`
