import styled, { css } from 'styled-components'

export const DocsLeftSidebar = styled.div<{ open: boolean }>`
  line-height: 1.25;
  background-color: white;
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
  padding: 00;
  display: flex;
  flex-direction: column;
  align-content: space-between;

  > ul {
    flex: 1 1 auto;
    padding-top: 1rem;
    background: linear-gradient(to bottom, white, transparent 1rem),
      linear-gradient(to bottom, var(--tina-color-grey-1), white 1rem);
    background-attachment: local, scroll;
    background-repeat: no-repeat;
    background-size: 100% 1rem, 100% 1rem;
    overflow-x: hidden;
    overflow-y: auto;
  }

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
