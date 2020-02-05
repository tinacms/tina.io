import React from 'react'
import styled, { css } from 'styled-components'
import { Button } from '.'
import Link from 'next/link'
import data from '../../content/navigation.json'

import Search from '../search'

const searchIndices = [
  { name: `Tina-Docs-Next`, title: `Docs`, hitComp: `DocHit` },
  { name: `Tina-Blogs-Next`, title: `Blog`, hitComp: `BlogHit` },
]

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

  @media (max-width: 799px) {
    ${Button} {
      font-size: 0.8rem;
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
