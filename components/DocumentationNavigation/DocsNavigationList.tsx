import React, { useRef, createContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { DocsLinkNav } from '../ui/DocsLinkNav'
import { DocsNavProps } from './DocumentationNavigation'
import { NavSection } from './NavSection'
import { useRouter } from 'next/router'

export const NavListContext = createContext({ current: null })

const getCategoryMatch = (navItems, currentPath) => {
  for (let item of navItems) {
    if (hasNestedSlug(item.items, currentPath)) {
      return item.category
    }
  }
  return null
}

const hasNestedSlug = (navItems, slug) => {
  for (let item of navItems) {
    if (item.slug === slug || `${item.slug}/` === slug) {
      return true
    }
    if (item.items) {
      return hasNestedSlug(item.items, slug)
    }
  }
  return false
}

const useActiveCategory = navItems => {
  const router = useRouter()
  return getCategoryMatch(navItems, router.asPath)
}

export const DocsNavigationList = ({ navItems, guide }: DocsNavProps) => {
  const activeCategory = useActiveCategory(navItems)
  const [currentCategory, setCurrentCategory] = React.useState(activeCategory)
  const currentCategoryData = React.useMemo(() => {
    return navItems.find(
      categoryData => categoryData.category === currentCategory
    )
  }, [currentCategory])
  return (
    <>
      <MobileMainNav>
        <DocsLinkNav />
      </MobileMainNav>
      {currentCategoryData ? (
        <DocsNavigationSection
          navItems={currentCategoryData.items}
          guide={guide}
          onExit={() => setCurrentCategory(null)}
          category={currentCategoryData.category}
        />
      ) : (
        <DocsCategoryList navItems={navItems} onSelect={setCurrentCategory} />
      )}
    </>
  )
}

const DocsCategoryList = ({ navItems, onSelect }) => {
  return (
    <div style={{ padding: '1rem 0' }}>
      {navItems.map(categoryData => {
        return (
          <>
            <CategoryAnchor
              role="button"
              onClick={() => onSelect(categoryData.category)}
            >
              {categoryData.category} →
              <CategoryDescription>
                {categoryData.description}
              </CategoryDescription>
            </CategoryAnchor>
          </>
        )
      })}
    </div>
  )
}

const DocsNavigationSection = ({
  navItems,
  guide,
  onExit,
  category,
}: DocsNavProps) => {
  const navListRef = useRef<HTMLUListElement>(null)

  return (
    <NavListContext.Provider value={navListRef}>
      <ul ref={navListRef}>
        <CategoryAnchor>
          <CategoryDescription>
            <span
              role="button"
              onClick={onExit}
              style={{ display: 'block', marginBottom: '0.5em' }}
            >
              ← Docs Index
            </span>
          </CategoryDescription>
          {category}
        </CategoryAnchor>

        {navItems &&
          navItems.map(section => (
            <NavSection key={section.id} {...section} collapsible={false} />
          ))}
      </ul>
    </NavListContext.Provider>
  )
}

const MobileMainNav = styled.div`
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

const CategoryAnchor = styled.span`
  display: block;
  cursor: pointer;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  color: var(--color-primary);
  text-decoration: none;
  transition: all 180ms ease-out;
  font-family: var(--font-tuner);
  font-size: 1.125rem;
`
const CategoryDescription = styled.p`
  font-size: 0.8em;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`
