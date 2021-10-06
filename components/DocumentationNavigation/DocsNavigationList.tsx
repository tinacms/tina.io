import React, { createContext } from 'react'
import styled, { css } from 'styled-components'
import { DocsLinkNav } from '../ui/DocsLinkNav'
import { DocsNavProps } from './DocumentationNavigation'
import { useRouter } from 'next/router'
import { matchActualTarget } from 'utils'
import { DynamicLink } from 'components/ui'

interface NavTitleProps {
  level: number
  selected: boolean
}

const NavTitle = styled.a<NavTitleProps>`
  display: block;
  text-decoration: none;
  transition: all 180ms ease-out 0s;
  cursor: pointer;
  color: var(--color-secondary);
  font-family: var(--font-primary);
  font-size: 0.9375rem;
  opacity: 0.75;
  line-height: 1.3;
  padding: 0.125rem 0.5rem 0.125rem 1.125rem;

  &:last-child {
    padding-bottom: 0.375rem;
  }

  &:hover {
    opacity: 1;
  }

  ${(props: any) =>
    props.level === 0 &&
    css`
      opacity: 1;
      color: var(--color-orange);
      font-family: var(--font-tuner);
      font-size: 1.25rem;
      padding: 0.5rem 0.5rem 0.125rem 1.125rem;
    `}

  ${(props: any) =>
    props.level === 1 &&
    css`
      font-size: 1rem;
      opacity: 1;
    `}

    ${(props: any) =>
      props.level === 2 &&
      css`
        opacity: 0.875;
      `}


  ${(props: any) =>
    props.selected &&
    css`
      opacity: 1;
      color: var(--color-orange);
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

const NavLevel = ({
  categoryData,
  level = 0,
}: {
  categoryData: any
  level?: number
}) => {
  const router = useRouter()
  // const expandChildren =
  // matchActualTarget(categoryData.slug || categoryData.href, router.asPath) ||
  //   hasNestedSlug(categoryData.items, router.asPath) //matchActualTarget(router.asPath, categoryData.slug)
  const expandChildren =
    level < 3
      ? true
      : matchActualTarget(
          categoryData.slug || categoryData.href,
          router.asPath
        ) || hasNestedSlug(categoryData.items, router.asPath) //matchActualTarget(router.asPath, categoryData.slug)
  return (
    <>
      <DynamicLink href={categoryData.slug} passHref>
        <NavTitle level={level} selected={router.asPath == categoryData.slug}>
          {categoryData.title || categoryData.category}
        </NavTitle>
      </DynamicLink>
      {expandChildren && categoryData.items && (
        <NavLevelChildContainer level={level}>
          {(categoryData.items || []).map(item => (
            <NavLevel level={level + 1} categoryData={item} />
          ))}
        </NavLevelChildContainer>
      )}
    </>
  )
}

interface NavLevelChildContainerProps {
  level: number
}

const NavLevelChildContainer = styled.div<NavLevelChildContainerProps>`
  position: relative;
  display: block;
  padding-left: 0.675rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;

  ${(props: any) =>
    props.level === 0 &&
    css`
      padding-left: 0.75rem;
      padding-top: 0.25rem;
      padding-bottom: 0.125rem;
    `}
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
  padding: 0.5rem 0 1.5rem 0;
`

const AnchorIcon = styled.span`
  display: inline-block;
  position: relative;
  transform: translate3d(0, 0, 0);
  transition: all 150ms ease-out;
`
