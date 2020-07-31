import styled, { css } from 'styled-components'

export const DocsLeftSidebar = styled.div<{ open: boolean }>`
  list-style-type: none;
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 1.25;
  background: white;
  padding: 6rem 0 1rem 0;
  position: fixed;
  z-index: 250;
  left: 0;
  top: 0;
  width: calc(50% + 2.25rem);
  height: 100%;
  z-index: 250;
  transform: translate3d(-100%, 0, 0);
  transition: all 140ms ease-in;
  padding: 0 0 1rem 0;

  ${props =>
    props.open
      ? css`
          transition: all 240ms ease-out;
          transform: translate3d(0, 0, 0);
        `
      : ``};

  iframe {
    margin: 1.5rem 3.5rem 0.5rem 1.5rem;
    display: block;
  }

  @media (min-width: 1000px) {
    left: 0;
    top: auto;
    width: 16rem;
    transform: translate3d(0, 0, 0);
  }
`
