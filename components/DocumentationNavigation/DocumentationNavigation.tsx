import React, { useState } from 'react';
import { Overlay } from '../ui/Overlay';
import { DocsLeftSidebar } from './DocsLeftSidebar';
import { DocsNavigationList } from './DocsNavigationList';
import { NavToggle } from '../ui/NavToggle';
import styled from 'styled-components';
import { DocsHeaderNav } from './DocsHeaderNav';
import { TinaIcon } from '../../components/logo/TinaIcon';
import { useRouter } from 'next/router';
import { FallbackPlaceholder } from '../../components/fallback-placeholder';
import Search from '../search';
import { HitsWrapper } from '../../components/search/styles';
import { searchIndices } from '../../components/search/indices';
import { VersionSelect } from './VersionSelect';
import { Navbar } from 'components/layout/Navbar';

export interface DocsNavProps {
  navItems: any;
}

export function DocumentationNavigation({ navItems }: DocsNavProps) {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <MobileNavToggle
        open={mobileNavIsOpen}
        onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)}
      />
      <DocsLeftSidebar open={mobileNavIsOpen}>
        <DocsSidebarHeaderWrapper>
          <DocsSidebarHeader>
            <div className='text-2xl leading-tight mt-2.5 ml-2 font-tuner text-orange-500'>
              Tina Docs
            </div>
            <VersionSelect />
          </DocsSidebarHeader>
          <Search collapse expanded={true} indices={searchIndices} />
        </DocsSidebarHeaderWrapper>
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
      <div className='mb-20'>
        <Navbar sticky={false}/>
      </div>
    </>
  );
}

const MobileNavToggle = styled(NavToggle)`
  position: fixed;
  background: var(--color-light);
  border: 1px solid var(--color-light-dark);
  margin-top: 1rem;
  padding: 0 0 0 1rem;
  border-radius: 0 2rem 2rem 0;
  width: 3.25rem;
  z-index: 1300;

  @media (min-width: 840px) {
    display: none;
  }
`;

const DocsSidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const DocsSidebarHeaderWrapper = styled.div`
  flex: 0 0 auto;
  background-color: white;
  background: linear-gradient(to bottom, white, var(--color-grey-1));
  z-index: 500;
  padding: 1rem 1rem 1.25rem 1rem;
  border-bottom: 1px solid var(--color-grey-2);
  position: relative;

  ${HitsWrapper} {
    right: auto;
    left: 1.25rem;
    margin-top: -1.625rem;
  }

  @media (max-width: 839px) {
    padding-left: 4.5rem;
  }

  @media (min-width: 1600px) {
    padding: 1rem 1.75rem 1.5rem 1.75rem;
  }
`;
