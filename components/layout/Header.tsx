import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { TinaIcon } from '../logo/TinaIcon'
import { HeaderNav as Nav, NavToggle } from '../ui'

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
      <Nav color={color} open={open} />
      <MenuOverlay open={open} onClick={() => setOpen(false)} />
      <iframe
        src="https://ghbtns.com/github-btn.html?user=tinacms&repo=tinacms&type=star&count=true&size=large"
        frameBorder="0"
        scrolling="0"
        width="145px"
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
    top: 1.5rem;
    left: 1rem;
    z-index: 200;

    @media (min-width: 685px) {
      display: none;
    }
  }

  ${Nav} {
    @media (min-width: 685px) {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translate3d(0, -50%, 0);
    }

    @media (min-width: 920px) {
      right: auto;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }

  iframe {
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

interface MenuOverlay {
  open: boolean
}

const MenuOverlay = styled.div<MenuOverlay>`
  display: none;

  @media (max-width: 684px) {
    pointer-events: none;
    display: block;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-secondary);
    transition: all 180ms ease-out;
    opacity: 0;

    ${props =>
      props.open &&
      css`
        opacity: 0.7;
        pointer-events: all;
      `};
  }
`
