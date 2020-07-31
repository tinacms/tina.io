import React from 'react'
import styled, { css } from 'styled-components'
import { LinkNav } from '../ui/LinkNav'
import { TinaWordmark } from '../logo/TinaWordmark'
import TwitterIconSvg from '../../public/svg/twitter-icon.svg'
import GithubIconSvg from '../../public/svg/github-icon.svg'
import { EmailForm } from '../forms/EmailForm'
import { EditLink } from './EditLink'

const FooterSocial = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: inherit;

  a {
    display: flex;
    align-items: center;
    color: inherit;
  }

  svg {
    width: 2rem;
    height: auto;
    fill: inherit;
    margin-left: 1rem;
  }
`

const FooterForm = styled.div`
  display: flex;
  flex-direction: column;
  color: inherit;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 1.5rem;

  span {
    margin: 0.5rem 1rem 0.5rem 0;
    white-space: nowrap;
    font-size: 1.25rem;
    line-height: 1;
  }

  @media (min-width: 550px) {
    flex-direction: row;
  }

  @media (min-width: 1200px) {
    margin-bottom: 0;
  }
`

const FooterTop = styled.div`
  display: grid;
  grid-gap: 1rem;
  padding: 2rem 2rem;
  background-color: var(--color-background);
  align-items: start;
  grid-template-areas: 'logo social' 'nav nav';

  @media (min-width: 800px) {
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-areas: 'logo nav social';
  }

  ${TinaWordmark} {
    grid-area: logo;
    margin-bottom: 1rem;
  }

  ${LinkNav} {
    grid-area: nav;
  }

  ${FooterSocial} {
    grid-area: social;
  }
`

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.25rem 2rem;
  background-color: var(--color-background);

  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
`

const Footnote = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: inherit;
  font-size: 1rem;

  button {
    height: 40px;
    color: white;
    background-color: var(--color-primary);
    margin-bottom: 1rem;

    &:hover,
    &:focus {
      color: white;
      fill: white;
    }

    &:focus {
      border-color: white;
    }

    svg {
      fill: white;
    }
  }

  p,
  a,
  button {
    white-space: nowrap;
  }

  p {
    color: inherit;
    margin: 0;
    font-size: 1rem;
    opacity: 0.65;
  }

  a {
    text-decoration: none;
    color: inherit;
    opacity: 0.65;
    &:hover {
      color: inherit;
      opacity: 1;
    }
  }

  @media (min-width: 500px) {
    flex-direction: row;
    align-items: center;

    button {
      margin-bottom: 0;
      margin-right: 1rem;
    }
  }
`

const FooterDivider = styled.span`
  &:after {
    content: '—';
    margin: 0.5rem 0;
    opacity: 0.3;
  }

  @media (min-width: 500px) {
    &:after {
      content: '|';
      margin: 0 0.5rem;
      opacity: 0.3;
    }
  }
`

export const Footer = styled(({ light, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <FooterTop>
        <TinaWordmark />
        <LinkNav />
        <FooterSocial>
          <a href="https://twitter.com/tina_cms" target="_blank">
            <TwitterIconSvg />
          </a>
          <a
            className="github"
            href="https://github.com/tinacms/tinacms"
            target="_blank"
          >
            <GithubIconSvg />
          </a>
        </FooterSocial>
      </FooterTop>
      <FooterBottom>
        <FooterForm>
          <span>Stay in touch 👉</span>
          <EmailForm isFooter />
        </FooterForm>
        <Footnote>
          <EditLink color={'primary'} />
          <a
            href="https://github.com/tinacms/tinacms/blob/master/LICENSE"
            target="_blank"
          >
            License
          </a>
          <FooterDivider />
          <p>
            &copy; TinaCMS 2019–
            {new Date().getFullYear()}
          </p>
        </Footnote>
      </FooterBottom>
    </div>
  )
})`
  color: white;
  --color-background: var(--color-primary);
  --color-background-dark: var(--color-primary-dark);

  ${TinaWordmark} {
    fill: var(--color-secondary);
  }

  ${FooterSocial} {
    fill: white;
  }

  ${FooterBottom} {
    --color-background: var(--color-primary-dark);
  }

  ${props =>
    props.light &&
    css`
      border-top: 1px solid var(--color-light-dark);
      color: var(--color-primary);
      --color-background: var(--color-light);
      --color-background-dark: var(--color-light-dark);

      ${TinaWordmark} {
        fill: var(--color-primary);
      }

      ${FooterSocial} {
        fill: var(--color-primary);
      }

      ${FooterBottom} {
        color: white;
        --color-background: var(--color-primary);
      }
    `};
`
