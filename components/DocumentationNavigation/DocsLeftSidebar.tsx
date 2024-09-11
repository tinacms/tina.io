import styled, { css } from 'styled-components'

export const DocsLeftSidebar = styled.div<{ open: boolean }>`
  line-height: 1.25;
  background-color: rgba(255, 255, 255, 0.5);

  padding: 10px;
  position: fixed;
  z-index: 250;
  left: 0; 
  top: 0;
  width: 80%;
  min-width: 16rem;
  max-width: 24rem;
  height: 100%; 
  z-index: 1250;
  transform: translate3d(-100%, 0, 0);
  transition: all 140ms ease-in;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  overflow: visible;
  
  border-radius: 0.75rem; 
  box-shadow: 0 30px 40px -10px rgba(0, 0, 0, 0.2), 
              0 -5px 30px -10px rgba(0, 0, 0, 0.1), 
              0 15px 20px -5px rgba(0, 0, 0, 0.1), 
              0 -5px 20px -5px rgba(0, 0, 0, 0.1);

  > ul {
    flex: 1 1 auto;
    padding: 1rem 1px 1rem 0;
    background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0) 1rem), 
      linear-gradient(to bottom, var(--color-grey-1), white 1rem);
    background-attachment: local, scroll;
    background-repeat: no-repeat;
    background-size: 100% 1rem, 100% 1rem;
  }

  ${props =>
    props.open
      ? css`
          transition: all 240ms ease-out;
          transform: translate3d(0, 0, 0);
        `
      : ``};

  @media (min-width: 840px) {
    position: sticky;
    height: calc(100vh - 80px); 
    top: 40px;
    grid-area: sidebar;
    place-self: stretch;
    width: 100%;
    left: 40px;
    transform: translate3d(0, 0, 0);
    margin-top: 30px;
    margin-bottom: 40px;
     

  }

  @media (max-width: 840px) {
    background-color: var(--color-light);
    height: 100%; 
    padding: 0; 
    
  }
`
