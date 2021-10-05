import styled, { css } from 'styled-components'

export const DocsLeftSidebar = styled.div<{ open: boolean }>`
  line-height: 1.25;
  background-color: white;
  border-right: 1px solid var(--tina-color-grey-2);
  padding: 6rem 0 1rem 0;
  position: fixed;
  z-index: 250;
  left: 0;
  top: 0;
  width: calc(50% + 2.25rem);
  height: 100%;
  z-index: 1250;
  transform: translate3d(-100%, 0, 0);
  transition: all 140ms ease-in;
  padding: 00;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  overflow: visible;

  > ul {
    flex: 1 1 auto;
    padding: 1rem 1px 1rem 0;
    background: linear-gradient(to bottom, white, rgba(255, 255, 255, 0) 1rem),
      linear-gradient(to bottom, var(--tina-color-grey-1), white 1rem);
    background-attachment: local, scroll;
    background-repeat: no-repeat;
    background-size: 100% 1rem, 100% 1rem;
    margin-right: -1px;
  }

  ${props =>
    props.open
      ? css`
          transition: all 240ms ease-out;
          transform: translate3d(0, 0, 0);
        `
      : ``};

  @media (min-width: 1200px) {
    left: 0;
    top: auto;
    width: 16rem;
    transform: translate3d(0, 0, 0);
  }

  @media (min-width: 1600px) {
    width: 20rem;
  }
`
