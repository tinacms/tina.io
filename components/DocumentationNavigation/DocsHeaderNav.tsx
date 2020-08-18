import React from 'react'
import styled, { css } from 'styled-components'
import { Button } from '../ui'
import { DynamicLink } from '../ui/DynamicLink'
import data from '../../content/docs-navigation.json'

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
      </ul>
    )
  })
)`
  margin: 0;
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0.5rem;

  li {
    position: relative;
    margin: 0 0.5rem;
  }

  @media (max-width: 829px) {
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

      ${Button} {
        border: 1px solid var(--color-light-dark);
      }
    `};
`
