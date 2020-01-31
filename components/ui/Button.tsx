import styled, { css } from 'styled-components'

export const Button = styled.button`
  font-size: 1rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 150ms ease-out;
  width: max-content;
  transform: translate3d(0px, 0px, 0px);
  display: flex;
  align-items: center;
  background-color: var(--color-seafoam);
  color: var(--color-primary);
  border-radius: 100px;
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  border: none;
  font-family: var(--font-tuner);
  font-weight: regular;
  font-style: normal;
  text-decoration: none;
  opacity: 1;

  &:hover,
  &:focus {
    color: var(--color-primary);
    text-decoration: none;
    transform: translate3d(-1px, -2px, 0);
    transition: transform 180ms ease-out;
  }
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px inset,
      rgba(236, 72, 21, 0.7) 0px 0px 0px 3px, rgba(0, 0, 0, 0.12) 0px 2px 3px;
  }
  &:focus,
  &:active {
    outline: none;
  }
  &:active {
    filter: none;
  }

  ${props =>
    props.white &&
    css`
      background-color: white;
      &:focus {
        box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px inset,
          rgba(255, 255, 255, 0.7) 0px 0px 0px 3px,
          rgba(0, 0, 0, 0.12) 0px 2px 3px;
      }
    `};

  ${props =>
    props.primary &&
    css`
      background-color: var(--color-primary);
      color: white;

      &:hover,
      &:focus {
        color: white;
      }
    `};

  ${props =>
    props.secondary &&
    css`
      background-color: var(--color-secondary);
      color: var(--color-primary);

      &:hover,
      &:focus {
        color: white;
      }
    `};
`

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${Button} {
    margin-right: 1rem;
  }
`
