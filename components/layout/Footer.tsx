import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import Nav from './Nav'
import Button from '../ui/Button'
import { TinaWordmark, TwitterIcon, GithubIcon } from '../icons'

const Footer = styled(({ ...styleProps }) => {
  return (
    <div {...styleProps}>
      <FooterTop>
        <TinaWordmark />
        <FooterNav />
        <FooterSocial>
          <Link href={'/teams'} passHref>
            <Button as="a" white>
              Tina for Teams
            </Button>
          </Link>
          <a href="https://twitter.com/tina_cms" target="_blank">
            <TwitterIcon />
          </a>
          <a
            className="github"
            href="https://github.com/tinacms/tinacms"
            target="_blank"
          >
            <GithubIcon />
          </a>
        </FooterSocial>
      </FooterTop>
      <FooterBottom></FooterBottom>
    </div>
  )
})``

const FooterSocial = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  svg {
    width: 2rem;
    height: auto;
    fill: white;
    margin-left: 1rem;
  }
`

const FooterNav = styled(Nav)`
  display: flex;
  flex-direction: column;
  margin: -0.5rem 0 0 0;

  ${Button} {
    font-size: 1.5rem;
    padding: 0;
    color: white !important;
    background: transparent;
  }
`

const FooterTop = styled.div`
  display: grid;
  grid-gap: 1rem;
  padding: 2rem 2rem;
  background-color: var(--color-primary);
  align-items: start;
  grid-template-areas: 'logo social' 'nav nav';

  @media (min-width: 800px) {
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-areas: 'logo nav social';
  }

  ${TinaWordmark} {
    grid-area: logo;
  }

  ${FooterNav} {
    grid-area: nav;
  }

  ${FooterSocial} {
    grid-area: social;
  }
`

const FooterBottom = styled.div`
  padding: 1.25rem 2rem;
  background-color: var(--color-primary-dark);
`

export default Footer
