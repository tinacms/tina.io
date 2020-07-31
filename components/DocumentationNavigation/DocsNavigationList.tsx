import styled from 'styled-components'

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
