import React from 'react'
import styled from 'styled-components'
import { Button } from '../ui'
import Link from 'next/link'
import data from '../../content/navigation.json'

import BurgerSvg from '../../public/svg/burger-menu.svg'

export const NavToggle = styled(({ ...styleProps }) => {
  return (
    <button {...styleProps}>
      <BurgerSvg />
    </button>
  )
})`
  fill: var(--color-primary);
`

export const Nav = styled(({ buttonColor, ...styleProps }) => {
  return (
    <ul {...styleProps}>
      {data &&
        data.map(({ id, href, label, as }) => {
          return (
            <li key={id}>
              <Link href={href} as={as} passHref>
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
    </ul>
  )
})`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  justify-content: center;

  @media (max-width: 799px) {
    li {
      ${Button} {
        font-size: 0.8rem;
      }
      &:not(:first-child) {
        ${Button} {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
      &:not(:last-child) {
        ${Button} {
          border-right: 1px solid rgba(155, 155, 155, 0.15);
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }
  }

  @media (min-width: 800px) {
    li {
      margin: 0 0.5rem;
    }
  }
`
