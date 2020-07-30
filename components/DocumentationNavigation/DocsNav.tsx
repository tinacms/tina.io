import styled, { css } from 'styled-components'

import { DocsLinkNav } from '../ui/DocsLinkNav'
import { NavSection } from './NavSection'

export const DocsNavigationList = ({ navItems }) => {
  return (
    <ul>
      <MobileMainNav>
        <DocsLinkNav />
      </MobileMainNav>
      {navItems &&
        navItems.map(section => (
          <NavSection key={section.id} {...section} collapsible={false} />
        ))}
      <li>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=tinacms&repo=tinacms&type=star&count=true&size=large"
          frameBorder="0"
          scrolling="0"
          width="150px"
          height="30px"
        ></iframe>
      </li>
    </ul>
  )
}

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

const MobileMainNav = styled.li`
  padding-top: 5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-light-dark);
  background-color: white;

  ul {
  }

  li {
    margin: 0;
  }

  a {
    display: block;
    padding: 0.5rem 3.5rem 0.5rem 1.5rem;
    color: var(--color-primary);
    margin: 0;
  }

  @media (min-width: 1000px) {
    display: none;
  }
`
