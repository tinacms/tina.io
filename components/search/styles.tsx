import React from 'react'
import styled, { css } from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`

export const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  width: 44px;
  height: 44px;
  fill: var(--color-orange);
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: inherit;
    padding: 0;
    width: 1.5rem;
    height: auto;
  }
`

interface InputProps {
  focus?: boolean
  expanded?: boolean
}

export const Input = styled.input<InputProps>`
  outline: none;
  border: none;
  width: 2.75rem;
  background: transparent;
  transition: all 150ms ease-out;
  opacity: 0;
  padding: 0 1.25rem;
  box-sizing: border-box;
  cursor: pointer;
  color: inherit;
  box-shadow: none !important;

  &:focus,
  &:active {
    box-shadow: none !important;
  }

  @media (max-width: 684px) {
    width: 100%;
  }

  ${(p) =>
    p.focus &&
    css`
      width: 12rem;
      opacity: 1;
      cursor: text;
    `};

  ${(p) =>
    p.expanded &&
    css`
      width: 100%;
      opacity: 1;
      cursor: text;
      padding: 0 2.25rem 0 1rem;
    `};
`

interface SearchContainerProps {
  expanded?: boolean
}

export const SearchContainer = styled.div<SearchContainerProps>`
  position: relative;
  font-size: 1rem;
  padding: 0.625rem 0;
  font-family: var(--font-tuner);
  background-color: white;
  box-shadow: 3px 3px 4px var(--tina-color-grey-2), -4px -4px 6px white;
  color: var(--color-foreground);
  display: flex;
  align-items: center;
  transition: filter 250ms ease;
  border-radius: 100px;
  text-transform: uppercase;
  :hover,
  :focus {
    text-decoration: none;
    transition: filter 250ms ease;
  }

  ${(p) =>
    p.expanded
      ? css`
          border: 1px solid var(--color-light-dark);
        `
      : css`
          @media (max-width: 684px) {
            /* Begin temp fix */
            display: none;
            /* End temp fix */
            margin: 1rem;
            border: 1px solid var(--color-light-dark);
          }
        `};
`

export const IndexContainer = styled.div`
  flex: 1 0 auto;
  overflow-y: auto;
  overflow-x: auto;
  padding: 1rem 1.25rem 0 1.5rem;
`

export const HitsResults = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`

interface HitsWrapperProps {
  show: boolean
}

export const HitsWrapper = styled.div<HitsWrapperProps>`
  display: ${(props) => (props.show ? `grid` : `none`)};
  max-height: calc(80vh - 4rem);
  overflow: hidden;
  z-index: 2;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  right: 0;
  top: calc(100% + 1.5rem);
  width: 80vw;
  max-width: 35rem;
  border-radius: 20px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1),
    0 3rem 6rem 0rem rgba(0, 0, 0, 0.2);

  color: var(--color-secondary);
  padding: 0;

  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
    url("data:image/svg+xml,%3Csvg preserveAspectRatio='none' viewBox='0 0 194 109' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_566_318)'%3E%3Crect width='194' height='109' fill='white' /%3E%3Cmask id='mask0_566_318' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='194' height='109'%3E%3Crect width='194' height='109' fill='url(%23paint0_linear_566_318)' /%3E%3C/mask%3E%3Cg mask='url(%23mask0_566_318)'%3E%3Crect width='194' height='109' fill='url(%23paint1_linear_566_318)' /%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_566_318' x1='97' y1='0' x2='97' y2='109' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23D9D9D9' stop-opacity='0.45' /%3E%3Cstop offset='0.229052' stop-color='%23D9D9D9' stop-opacity='0.1678' /%3E%3Cstop offset='0.677779' stop-color='%23D9D9D9' stop-opacity='0.0513' /%3E%3Cstop offset='1' stop-color='%23D9D9D9' stop-opacity='0' /%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_566_318' x1='0' y1='54.5' x2='194' y2='54.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2353E9DD' /%3E%3Cstop offset='0.34375' stop-color='%2368D7E4' /%3E%3Cstop offset='0.59375' stop-color='%2359BFF2' /%3E%3Cstop offset='1' stop-color='%234BA8FF' /%3E%3C/linearGradient%3E%3CclipPath id='clip0_566_318'%3E%3Crect width='194' height='109' fill='white' /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E ");

  li {
    margin: 0 !important;
    padding: 0.5rem 0;
  }
  li + li {
    border-top: 1px solid var(--color-seafoam-dark);
  }
  ul {
    list-style: none;
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    flex: 0 0 auto;
    position: sticky;
    top: 0;
    color: rgba(0, 0, 0, 0.5);
    h3 {
      margin: 0;
      color: var(--color-orange);
      font-family: var(--font-tuner);
      font-weight: bold;
      text-transform: uppercase;
      font-size: 1.125rem;
    }
  }
  h4 {
    margin-bottom: 0.3em;
    cursor: pointer;
    text-decoration: underline rgba(0, 0, 0, 0.3);
    transition: all 185ms ease-out;

    &:hover,
    &:focus {
      opacity: 1;
      color: var(--color-orange);
      text-decoration-color: var(--color-orange);
    }
  }
  a {
    color: var(--color-orange);
  }
`;


export const NoResultsLabel = styled.div`
  padding: 1rem 1.25rem 0 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-orange);
`

export const PoweredBy = styled(({ ...styleProps }) => (
  <span {...styleProps}>
    Powered by{` `}
    <a href="https://algolia.com">Algolia</a>
  </span>
))`
  opacity: 0.5;
  font-size: 0.8rem;
  padding: 0;
  display: block;
  padding: 0.5rem 1.25rem 0.5rem 1.5rem;
`
