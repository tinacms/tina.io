import { useRef, createContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { DocsLinkNav } from '../ui/DocsLinkNav'
import { DocsNavProps } from './DocumentationNavigation'
import { NavSection } from './NavSection'

export const NavListContext = createContext({ current: null })

export const DocsNavigationList = ({ navItems, guide }: DocsNavProps) => {
  const navListRef = useRef<HTMLUListElement>(null)

  return (
    <NavListContext.Provider value={navListRef}>
      <ul ref={navListRef}>
        <MobileMainNav>
          <DocsLinkNav />
        </MobileMainNav>
        {guide && (
          <Breadcrumbs>
            <Link href="/guides">guides</Link>
            <Link href={`/guides#${guide.category}`}>{guide.category}</Link>
          </Breadcrumbs>
        )}
        {navItems &&
          navItems.map(section => (
            <NavSection key={section.id} {...section} collapsible={false} />
          ))}
      </ul>
    </NavListContext.Provider>
  )
}

const MobileMainNav = styled.li`
  padding-top: 0rem;
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

  @media (min-width: 1200px) {
    display: none;
  }
`

const Breadcrumbs = styled.li`
  display: block;
  padding: 0 1.5rem 0.5rem 1.5rem;

  a {
    color: var(--tina-color-grey-5);
    text-decoration-color: rgba(0, 0, 0, 0.3);
    font-size: 1rem;

    &:hover {
      color: var(--tina-color-grey-6);
      text-decoration-color: var(--tina-color-grey-6);
    }
  }

  a:not(:last-child):after {
    content: '/';
    display: inline-block;
    margin: 0 0.25rem;
    color: var(--tina-color-grey-4);
  }
`
