import React, { createContext } from 'react'
import styled, { css } from 'styled-components'
import { DocsLinkNav } from '../ui/DocsLinkNav'
import { DocsNavProps } from './DocumentationNavigation'
import { useRouter } from 'next/router'
import { matchActualTarget } from 'utils'
import { DynamicLink } from 'components/ui'

interface NavTitleProps {
  selected: boolean
}

const NavTitle = styled.div<NavTitleProps>`
  ${(props: any) =>
    props.selected &&
    css`
      background: white;
      font-weight: bold;
    `}
`

const hasNestedSlug = (navItems = [], slug) => {
  for (let item of navItems) {
    if (matchActualTarget(item.slug || item.href, slug)) {
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

const NavLevel = ({ categoryData }: { categoryData: any }) => {
  const router = useRouter()
  const expandChildren =
    matchActualTarget(categoryData.slug || categoryData.href, router.asPath) ||
    hasNestedSlug(categoryData.items, router.asPath) //matchActualTarget(router.asPath, categoryData.slug)
  return (
    <>
      <DynamicLink href={categoryData.slug} passHref>
        <NavTitle selected={router.asPath == categoryData.slug}>
          {categoryData.title || categoryData.category}
        </NavTitle>
      </DynamicLink>
      {expandChildren && (
        <NavLevelChildContainer>
          {(categoryData.items || []).map(item => (
            <NavLevel categoryData={item} />
          ))}
        </NavLevelChildContainer>
      )}
    </>
  )
}

const NavLevelChildContainer = styled.div`
  margin-left: 0.5rem;
`

export const DocsNavigationList = ({ navItems }: DocsNavProps) => {
  const router = useRouter()

  return (
    <>
      <MobileMainNav>
        <DocsLinkNav />
      </MobileMainNav>
      <DocsNavigationContainer>
        {navItems.map(categoryData => (
          <NavLevel categoryData={categoryData} />
        ))}
      </DocsNavigationContainer>
    </>
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

const DocsNavigationContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`

const AnchorIcon = styled.span`
  display: inline-block;
  position: relative;
  transform: translate3d(0, 0, 0);
  transition: all 150ms ease-out;
`
