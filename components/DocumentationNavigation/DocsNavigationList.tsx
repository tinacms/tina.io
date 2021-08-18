import React, { useRef, createContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { DocsLinkNav } from '../ui/DocsLinkNav'
import { DocsNavProps } from './DocumentationNavigation'
import { NavSection } from './NavSection'
import { useRouter } from 'next/router'
import { matchActualTarget } from 'utils'

export interface DocsSectionProps extends DocsNavProps {
  BackLink: () => JSX.Element
  category: string
}

export const NavListContext = createContext({ current: null })

const getCategoryMatch = (navItems, currentPath) => {
  for (let item of navItems) {
    if (hasNestedSlug(item.items, currentPath)) {
      return item.category
    }
  }

  // if we don't find a match in the category nav, do some "rule-of-thumb" matching
  return matchHeuristic(currentPath)
}

const matchHeuristic = currentPath => {
  if (currentPath.includes('/docs/releases')) return 'TinaCMS'

  return null
}

const hasNestedSlug = (navItems, slug) => {
  for (let item of navItems) {
    if (item.slug && matchActualTarget(item.slug, slug)) {
      return true
    }
    if (item.href && matchActualTarget(item.href, slug)) {
      return true
    }
    if (item.items) {
      if (hasNestedSlug(item.items, slug)) {
        return true
      }
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

  const DocsIndexLink = React.useCallback(
    () => (
      <Link href="/docs">
        <IndexLink>← Docs Index</IndexLink>
      </Link>
    ),
    []
  )
  const GuidesIndexLink = React.useCallback(
    () => (
      <Link href="/guides">
        <IndexLink>← Guides Index</IndexLink>
      </Link>
    ),
    []
  )

  return (
    <>
      <MobileMainNav>
        <DocsLinkNav />
      </MobileMainNav>
      {currentCategoryData ? (
        <DocsNavigationSection
          navItems={currentCategoryData.items}
          guide={guide}
          BackLink={guide ? GuidesIndexLink : DocsIndexLink}
          category={currentCategoryData.category}
        />
      ) : (
        <DocsCategoryList
          navItems={navItems}
          onSelect={setCurrentCategory}
          activeCategory={activeCategory}
        />
      )}
    </>
  )
}

const DocsCategoryList = ({ navItems, onSelect, activeCategory }) => {
  return (
    <div style={{ padding: '1rem 0' }}>
      {navItems.map(categoryData => {
        return (
          <Link href={categoryData.slug} passHref>
            <CategoryAnchor
              onClick={e => {
                if (activeCategory === categoryData.category) {
                  e.preventDefault()
                  onSelect(categoryData.category)
                }
              }}
            >
              {categoryData.category} <AnchorIcon>→</AnchorIcon>
              <CategoryDescription>
                {categoryData.description}
              </CategoryDescription>
            </CategoryAnchor>
          </Link>
        )
      })}
    </div>
  )
}

const DocsNavigationSection = ({
  navItems,
  guide,
  BackLink,
  category,
}: DocsSectionProps) => {
  const navListRef = useRef<HTMLUListElement>(null)

  return (
    <NavListContext.Provider value={navListRef}>
      <ul ref={navListRef}>
        <NavListHeader>
          {BackLink && <BackLink />}
          <CategoryHeader>{category}</CategoryHeader>
        </NavListHeader>
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
    color: var(--color-orange);
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

const CategoryDescription = styled.p`
  margin-top: 0.5rem;
  color: var(--color-secondary-dark);
  opacity: 0.65;
  font-size: 0.8em;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  transition: all 150ms ease-out;
`

const AnchorIcon = styled.span`
  display: inline-block;
  position: relative;
  transform: translate3d(0, 0, 0);
  transition: all 150ms ease-out;
`

const CategoryAnchor = styled.a`
  display: block;
  cursor: pointer;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  color: var(--color-orange);
  text-decoration: none;
  transition: all 180ms ease-out;
  font-family: var(--font-tuner);
  font-size: 1.125rem;

  :hover {
    ${CategoryDescription} {
      opacity: 1;
    }

    ${AnchorIcon} {
      transform: translate3d(0.25rem, 0, 0);
    }
  }
`

const IndexLink = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  color: var(--color-orange);
  display: block;
  margin-bottom: 0.75rem;
  font-size: 0.9375rem;
  opacity: 0.7;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  transition: all 150ms ease-out;

  &:hover {
    opacity: 1;
  }
`

const NavListHeader = styled.li`
  position: relative;
  padding: 0.5rem 1.5rem 0.75rem 1.5rem;
  z-index: 10;
`

const CategoryHeader = styled.h3`
  color: var(--color-orange);
  text-decoration: none;
  transition: all 180ms ease-out;
  font-family: var(--font-tuner);
  font-size: 1.5rem;
`
