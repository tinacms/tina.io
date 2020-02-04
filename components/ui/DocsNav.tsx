import Link from 'next/link'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'
import RightArrowSvg from '../../public/svg/right-arrow.svg'
import { useState } from 'react'

const NavItemHeader = styled.div`
  position: relative;
`

interface NavSectionTitleProps {
  open: boolean
}

const NavSectionTitle = styled.span<NavSectionTitleProps>`
  display: block;
  padding: 0.5rem 3.5rem 0.5rem 1.5rem;
  color: var(--color-secondary);
  text-decoration: none;
  transition: all 180ms ease-out;

  ${props =>
    props.open &&
    css`
      color: var(--color-primary);
    `};
`

const SubNav = styled.ul`
  list-style-type: none;
  margin: 0px;
  background: white;
  padding: 0;
  overflow: hidden;
  transition: all 180ms ease-out;
  box-shadow: inset 0 1px 0 var(--color-light-dark),
    inset 0 -1px 0 var(--color-light-dark);

  ${NavSectionTitle} {
    font-size: 0.9375rem;
    text-transform: uppercase;
    padding: 0.3rem 1.5rem 0.3rem 2rem;
  }

  li:first-child {
    ${NavSectionTitle} {
      padding-top: 0.75rem;
    }
  }

  li:last-child {
    padding-bottom: 0.75rem;
  }
`

interface NavItemProps {
  open: boolean
}

const NavItem = styled.li<NavItemProps>`
  position: relative;
  cursor: pointer;
  user-select: none;

  svg {
    position: absolute;
    right: 1.25rem;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    width: 1.25rem;
    height: auto;
    fill: var(--color-grey);
    transition: all 180ms ease-out;
  }

  ${SubNav} {
    max-height: 0;
  }

  ${props =>
    props.open &&
    css`
      ${SubNav} {
        max-height: 40rem;
        transition: all 180ms ease-in;
      }

      svg {
        transform: translate3d(0, -50%, 0) rotate(90deg);
      }
    `};
`

interface NavSection {
  id: string
  slug: string
  title: string
  items: NavSection[]
}

export const NavSection = (section: NavSection) => {
  const router = useRouter()
  const currentPath = router.asPath
  const [open, setOpen] = useState(menuIsActive(section, currentPath))
  return (
    <NavItem key={section.slug} open={open}>
      <NavItemHeader>
        {section.slug ? (
          <Link href={section.slug} passHref>
            <NavSectionTitle as="a" open={open}>
              {section.title}
            </NavSectionTitle>
          </Link>
        ) : (
          <NavSectionTitle open={open} onClick={() => setOpen(!open)}>
            {section.title}
          </NavSectionTitle>
        )}
        {section.items && section.items.length > 0 && <RightArrowSvg />}
      </NavItemHeader>
      {section.items && section.items.length > 0 && (
        <SubNav>
          {(section.items || []).map(item => (
            <NavSection key={section.id} {...item} />
          ))}
        </SubNav>
      )}
    </NavItem>
  )
}

const menuIsActive = (section: NavSection, currentPath: string) => {
  if (section.slug && currentPath.includes(section.slug)) {
    return true
  }
  return (
    section.items &&
    section.items.reduce((isActive, section) => {
      if (section.slug && currentPath.includes(section.slug)) {
        return true
      }
      return isActive
    }, false)
  )
}

export const DocsNav = styled(({ navItems, ...styleProps }) => {
  return (
    <ul {...styleProps}>
      {navItems &&
        navItems.map(section => <NavSection key={section.id} {...section} />)}
    </ul>
  )
})`
  padding: 6rem 0 3rem 0;
  font-family: var(--font-tuner);
  grid-area: nav;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate3d(-100%, 0, 0);
  list-style-type: none;

  /* Background */
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-seafoam);
    opacity: 0.5;
    z-index: -1;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 1100px) {
    position: fixed;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    transform: translate3d(0, 0, 0);
  }
`
