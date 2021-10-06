import { useState } from 'react'
import { Overlay } from '../ui/Overlay'
import { DocsLeftSidebar } from './DocsLeftSidebar'
import { DocsNavigationList } from './DocsNavigationList'
import { NavToggle } from '../ui/NavToggle'
import styled from 'styled-components'
import { DocsHeaderNav } from './DocsHeaderNav'
import { TinaIcon } from 'components/logo/TinaIcon'
import { useRouter } from 'next/router'
import { FallbackPlaceholder } from 'components/fallback-placeholder'
import Search from '../search'
import { HitsWrapper } from 'components/search/styles'
import { searchIndices } from 'components/search/indices'

export interface DocsNavProps {
  navItems: any
}

export function DocumentationNavigation({ navItems }: DocsNavProps) {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <MobileNavToggle
        open={mobileNavIsOpen}
        onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)}
      />
      <MobileNavLogo />
      <DocsLeftSidebar open={mobileNavIsOpen}>
        <DocsSidebarHeader>
          <DocsDesktopTinaIcon docs />
          <Search collapse expanded={true} indices={searchIndices} />
        </DocsSidebarHeader>
        {router.isFallback ? (
          <FallbackPlaceholder />
        ) : (
          <DocsNavigationList navItems={navItems} />
        )}
      </DocsLeftSidebar>
      <Overlay
        open={mobileNavIsOpen}
        onClick={() => setMobileNavIsOpen(false)}
      />
      <DocsHeaderNav color={'light'} open={mobileNavIsOpen} />
    </>
  )
}

const MobileNavToggle = styled(NavToggle)`
  position: fixed;
  background: var(--color-light);
  border: 1px solid var(--color-light-dark);
  margin-top: 1.25rem;
  padding: 0 0 0 1rem;
  border-radius: 0 2rem 2rem 0;
  width: 3.25rem;
  z-index: 1300;

  svg {
  }

  @media (min-width: 1199px) {
    display: none;
  }
`

const MobileNavLogo = styled(TinaIcon)`
  position: relative;
  display: block;
  padding: 1rem 0;

  h1 {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 830px) {
    display: none;
  }
`

const DocsDesktopTinaIcon = styled(TinaIcon)`
  position: relative;
  display: none;
  margin-bottom: 1rem;

  @media (min-width: 1200px) {
    display: block;
  }
`

const DocsSidebarHeader = styled.div`
  flex: 0 0 auto;
  background-color: white;
  background: linear-gradient(to bottom, white, var(--tina-color-grey-1));
  z-index: 500;
  padding: 1rem 1rem 1.25rem 1rem;
  border-bottom: 1px solid var(--tina-color-grey-2);
  position: relative;

  ${DocsDesktopTinaIcon} {
    margin-left: 0.25rem;
  }

  ${HitsWrapper} {
    right: auto;
    left: 1.25rem;
    margin-top: -1.625rem;
  }

  @media (max-width: 1199px) {
    padding-left: 4.5rem;
  }
`
