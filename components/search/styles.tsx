import React from 'react'
import styled, { css } from 'styled-components'

const colors = {
  //Mint Green
  seafoam: '#E6FAF8',
  mintChocoChip: '#B4F4E0',
  greyWhite: '#f4f4f4',
  greyWhite02: '#E9E9EC',
  hunterOrange: '#EC4815',
  burntSienna: '#CE411D',
  link: '#000',
  linkHover: '#EC4815',
  lightPurple: '#302454',
  darkPurple: '#241748',
  grey: '#595959',
  darkGrey: '#404040',
}

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`

export const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  width: 40px;
  height: 40px;
  padding: 7px;
  fill: ${colors.hunterOrange};
  pointer-events: none;
  svg {
    width: 100%;
    height: auto;
    fill: inherit;
    padding: 0;
  }
`

interface InputProps {
  focus?: boolean
  collapse?: boolean
}

export const Input = styled.input<InputProps>`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  transition: all 150ms ease-out;
  width: 40px;
  opacity: 0;
  padding: 0;
  box-sizing: border-box;
  cursor: pointer;
  color: ${colors.darkPurple};

  ${p =>
    p.focus &&
    css`
      width: 12rem;
      opacity: 1;
      padding: 0 40px 0 1.25rem;
      cursor: text;
    `};
`

export const SearchContainer = styled.div`
  position: relative;
  height: 40px;
  min-width: 40px;
  border-radius: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  margin-left: 12px;
  transition: filter 250ms ease;
  border-radius: 100px;
  text-transform: uppercase;
  filter: drop-shadow(1px 2px 18px rgb(0, 0, 0, 12%));
  :hover,
  :focus {
    text-decoration: none;
    filter: drop-shadow(1px 5px 18px rgb(0, 0, 0, 25%));
    transition: filter 250ms ease;
  }
`

interface HitsWrapperProps {
  show: boolean
}

export const IndexContainer = styled.div`
  flex: 1 0 auto;
  overflow-y: auto;
  overflow-x: auto;
`

export const HitsResults = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 1rem 1.25rem;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  * {
    padding: 0;
  }
`

export const HitsWrapper = styled.div<HitsWrapperProps>`
  display: ${props => (props.show ? `grid` : `none`)};
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
  border-radius: 24px;
  filter: drop-shadow(1px 2px 18px rgb(0, 0, 0, 12%));
  padding: 0;
  background: white;
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid ${colors.mintChocoChip};
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
    color: ${colors.darkPurple};
    h3 {
      padding: 0.1em 0em;
    }
  }
  h3 {
    margin: 0 0 0.5em;
  }
  h4 {
    margin-bottom: 0.3em;
  }
  a {
    color: ${colors.hunterOrange};
  }
`

export const NoResultsLabel = styled.div`
  padding: 16px 24px;
`

export const PoweredBy = styled(() => (
  <span>
    Powered by{` `}
    <a href="https://algolia.com">Algolia</a>
  </span>
))`
  font-size: 0.6em;
  text-align: end;
  padding: 0;
`
