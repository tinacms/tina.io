import React from 'react'
import styled from 'styled-components'
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

export const Nav = styled(({ buttonColor, noSearch, ...styleProps }) => {
  return (
    <ul {...styleProps}>
      {data &&
        data.map(({ id, href, label }) => {
          return (
            <li key={id}>
              <Link href={href} passHref>
                {buttonColor === 'secondary' ? (
                  <Button as="a" secondary>
                    {label}
                  </Button>
                ) : buttonColor === 'seafoam' ? (
                  <Button as="a" seafoam>
                    {label}
                  </Button>
                ) : (
                  <Button as="a" white>
                    {label}
                  </Button>
                )}
              </Link>
            </li>
          )
        })}
      {!noSearch && (
        <li>
          <Search collapse indices={searchIndices} color={buttonColor} />
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
`
