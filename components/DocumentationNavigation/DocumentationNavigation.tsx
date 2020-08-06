import { useState } from 'react'
import { Overlay } from '../ui/Overlay'
import { DocsLeftSidebar } from './DocsLeftSidebar'
import { DocsNavigationList } from './DocsNavigationList'
import { NavToggle } from '../ui/NavToggle'
import styled from 'styled-components'
import { DocsHeaderNav } from './DocsHeaderNav'
import { TinaIcon } from 'components/logo/TinaIcon'
import Search from '../search'

const searchIndices = [
  { name: `Tina-Docs-Next`, title: `Docs`, hitComp: `DocHit` },
  { name: `Tina-Blogs-Next`, title: `Blog`, hitComp: `BlogHit` },
]

interface Props {
  navItems: any
}

export function DocumentationNavigation({ navItems }: Props) {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false)
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
          <Search expanded={true} indices={searchIndices} />
        </DocsSidebarHeader>
        <DocsNavigationList navItems={navItems} />
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
  margin-top: 1.25rem;
  left: 1rem;
  z-index: 500;

  @media (min-width: 999px) {
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

  @media (min-width: 1000px) {
    display: none;
  }
`

const DocsDesktopTinaIcon = styled(TinaIcon)`
  position: relative;
  display: none;
  margin-bottom: 1rem;

  @media (min-width: 1000px) {
    display: block;
  }
`

const DocsSidebarHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 500;
  padding: 1.25rem 2rem 1.25rem 1.5rem;
  border-bottom: 1px solid var(--tina-color-grey-2);
  margin-bottom: 1rem;
`
