import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { TinaIcon } from '../logo/TinaIcon'
import { HeaderNav } from '../ui/HeaderNav'
import { Button } from '../ui/Button'
import { NavToggle } from '../ui/NavToggle'
import { Overlay } from '../ui/Overlay'

interface HeaderProps {
  color?: 'white' | 'secondary' | 'seafoam'
  fixedIcon?: boolean
}

export const Header = ({ color, fixedIcon, ...styleProps }: HeaderProps) => {
  const [open, setOpen] = useState(false)
  return (
    <StyledHeader open={open} fixedIcon={fixedIcon} {...styleProps}>
      <TinaIcon />
      <NavToggle open={open} onClick={() => setOpen(!open)} />
      <HeaderNav color={color} open={open} />
      <Overlay open={open} onClick={() => setOpen(false)} />
      <iframe
        src="https://ghbtns.com/github-btn.html?user=tinacms&repo=tinacms&type=star&count=true&size=large"
        frameBorder="0"
        scrolling="0"
        width="150px"
        height="30px"
      ></iframe>
    </StyledHeader>
  )
}

interface StyledHeaderProps {
  fixedIcon?: boolean
  open: boolean
}

const StyledHeader = styled.header<StyledHeaderProps>`
  position: absolute;
  width: 100%;
  z-index: 100;
  height: 5rem;

  ${Overlay} {
    @media (min-width: 685px) {
      display: none;
    }
  }

  ${TinaIcon} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);

    @media (min-width: 685px) {
      left: 2rem;
      transform: translate3d(0, -50%, 0);
    }
  }

  ${NavToggle} {
    position: fixed;
    margin-top: 1.25rem;
    left: 1rem;
    z-index: 1300;

    @media (min-width: 685px) {
      display: none;
    }
  }

  ${HeaderNav} {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translate3d(0, -50%, 0);

    @media (min-width: 1030px) {
      right: auto;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }

    @media (max-width: 684px) {
      position: fixed;
      z-index: 1250;
      width: calc(50% + 2.25rem);
      left: 0;
      top: 0;
      padding-top: 6rem;
      height: 100%;
      background: var(--color-light);
      transform: translate3d(-100%, 0, 0);
      transition: all 140ms ease-in;
      flex-direction: column;
      justify-content: flex-start;
      overflow: visible;

      li {
        display: block;
        margin-bottom: 0.5rem;
      }

      ${Button} {
        font-size: 1.5rem !important;
        color: var(--color-primary);
        background: transparent;
        padding: 0 0.5rem;
        margin: 0 0.75rem;
      }

      ${props =>
        props.open &&
        css`
          transition: all 240ms ease-out;
          transform: translate3d(0, 0, 0);

          &:after {
            opacity: 0.7;
          }
        `};
    }
  }

  > iframe {
    display: none;

    @media (min-width: 1030px) {
      display: block;
      position: absolute;
      top: 50%;
      right: 2rem;
      transform: translate3d(0, -50%, 0);
    }
  }

  ${props =>
    props.fixedIcon &&
    css`
      ${TinaIcon} {
        @media (min-width: 685px) {
          position: fixed;
          top: 2.5rem;
          left: 2rem;
        }
      }
    `};
`
