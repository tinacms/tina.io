import React from 'react'
import styled, { css } from 'styled-components'
import { Button } from '../ui'
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
  fill: var(--color-primary);
`

export const Nav = styled(({ color, noSearch, ...styleProps }) => {
  return (
    <ul {...styleProps}>
      {data &&
        data.map(({ id, href, label }) => {
          return (
            <li key={id}>
              <Link href={href} passHref>
                <Button as="a" variable>
                  {label}
                </Button>
              </Link>
            </li>
          )
        })}
      {!noSearch && (
        <li key="nav-search">
          <Search collapse indices={searchIndices} />
        </li>
      )}
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
