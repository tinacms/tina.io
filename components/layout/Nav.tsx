import React from 'react'
import styled from 'styled-components'
import Button from '../ui/Button'
import Link from 'next/link'

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

const Nav = styled(({ ...styleProps }) => {
  return (
    <ul {...styleProps}>
      <li>
        <Link href={'/docs/getting-started/introduction'} passHref>
          <Button as="a" white>
            DOCS
          </Button>
        </Link>
      </li>
      <li>
        <Link href={'/blog'} passHref>
          <Button as="a" white>
            BLOG
          </Button>
        </Link>
      </li>
      <li>
        <Link href={'/community'} passHref>
          <Button as="a" white>
            COMMUNITY
          </Button>
        </Link>
      </li>
      <li>
        <Link href={'/teams'} passHref>
          <Button as="a" white>
            TEAMS
          </Button>
        </Link>
      </li>
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
          border-right: 1px solid var(--color-seafoam);
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
export default Nav
