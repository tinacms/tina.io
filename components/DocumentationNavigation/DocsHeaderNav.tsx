import React from 'react'
import styled, { css } from 'styled-components'
import { Button } from '../ui'
import { DynamicLink } from '../ui/DynamicLink'
import data from '../../content/docs-navigation.json'
import { SearchContainer } from '../search/styles'
import Search from '../search'

const searchIndices = [
  { name: `Tina-Docs-Next`, title: `Docs`, hitComp: `DocHit` },
  { name: `Tina-Blogs-Next`, title: `Blog`, hitComp: `BlogHit` },
]

interface NavProps {
  color?: 'white' | 'secondary' | 'seafoam' | 'light'
  open: boolean
}

export const DocsHeaderNav = styled(
  React.memo(({ color, ...styleProps }: NavProps) => {
    return (
      <ul {...styleProps}>
        {data &&
          data.map(({ id, href, label }) => {
            return (
              <li key={id}>
                <DynamicLink href={href} passHref>
                  <Button as="a" color="variable">
                    {label}
                  </Button>
                </DynamicLink>
              </li>
            )
          })}
        <li key="nav-search">
          <Search collapse indices={searchIndices} />
        </li>
        <li>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=tinacms&repo=tinacms&type=star&count=true&size=large"
            frameBorder="0"
            scrolling="0"
            width="145px"
            height="30px"
          ></iframe>
        </li>
      </ul>
    )
  })
)`
  margin: 0;
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;

  li {
    position: relative;
    margin: 0 0.5rem;
  }

  iframe {
    margin: 1.5rem 3.5rem 0.5rem 1.25rem;
    display: block;

    @media (min-width: 685px) {
      display: none;
    }
  }

  @media (max-width: 999px) {
    display: none;
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

  ${props =>
    props.color &&
    props.color === 'light' &&
    css`
      --color-background: var(--color-light);
      --color-foreground: var(--color-primary);

      ${Button}, ${SearchContainer} {
        border: 1px solid var(--color-light-dark);
      }
    `};
`
