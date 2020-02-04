import React from 'react'
import styled, { css } from 'styled-components'
import { Button } from '.'
import Link from 'next/link'
import data from '../../content/navigation.json'

import BurgerSvg from '../../public/svg/burger-menu.svg'
import Search from '../search'

const searchIndices = [
  { name: `Tina-Docs-Next`, title: `Docs`, hitComp: `DocHit` },
  { name: `Tina-Blogs-Next`, title: `Blog`, hitComp: `BlogHit` },
]

export const NavToggle = styled(({ ...styleProps }) => {
  return (
    <button {...styleProps}>
      <BurgerSvg />
    </button>
  )
})`
  background: transparent;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: var(--color-primary);
    width: 2rem;
    height: 2rem;
  }
`

interface NavProps {
  color?: 'white' | 'secondary' | 'seafoam'
  open: boolean
}

export const HeaderNav = styled(({ color, ...styleProps }: NavProps) => {
  return (
    <ul {...styleProps}>
      {data &&
        data.map(({ id, href, label }) => {
          return (
            <li key={id}>
              <Link href={href} passHref>
                <Button as="a" color="variable">
                  {label}
                </Button>
              </Link>
            </li>
          )
        })}
      <li key="nav-search">
        <Search collapse indices={searchIndices} />
      </li>
    </ul>
  )
})`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  justify-content: center;

  li {
    margin: 0 0.25rem;
  }

  @media (max-width: 684px) {
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    padding-top: 6rem;
    height: 100%;
    width: 70%;
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

  @media (max-width: 799px) {
    li {
      ${Button} {
        font-size: 0.8rem;
      }
    }
  }

  @media (min-width: 800px) {
    li {
      margin: 0 0.5rem;
    }
  }

  --color-background: white;
  --color-foreground: var(--color-primary);

  ${props =>
    props.color &&
    props.color === 'secondary' &&
    css`
      --color-background: var(--color-secondary);
      --color-foreground: var(--color-primary);
    `};

  ${props =>
    props.color &&
    props.color === 'seafoam' &&
    css`
      --color-background: var(--color-seafoam);
      --color-foreground: var(--color-primary);
    `};
`
