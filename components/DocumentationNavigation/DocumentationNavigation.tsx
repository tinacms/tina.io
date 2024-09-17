import React, { useState } from 'react';
import { Overlay } from '../ui/Overlay';
import { DocsLeftSidebar } from './DocsLeftSidebar';
import { DocsNavigationList } from './DocsNavigationList';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FallbackPlaceholder } from '../../components/fallback-placeholder';
import Search from '../search';
import { HitsWrapper } from '../../components/search/styles';
import { searchIndices } from '../../components/search/indices';
import { VersionSelect } from './VersionSelect';
import { BiMenu } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

export interface DocsNavProps {
  navItems: any;
}

export function DocumentationNavigation({ navItems }: DocsNavProps) {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      
      {!mobileNavIsOpen && (
        <MobileNavToggle
          open={mobileNavIsOpen}  
          onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)}
        />
      )}
      
      <DocsLeftSidebar open={mobileNavIsOpen}>
        <DocsSidebarHeaderWrapper>
          <DocsSidebarHeader>
            <div className="text-2xl leading-tight mt-2.5 ml-2 font-tuner text-orange-500">
              Tina Docs
            </div>
            <VersionSelect />
          </DocsSidebarHeader>

         
          <CloseButton mobileNavIsOpen={mobileNavIsOpen} onClick={() => setMobileNavIsOpen(false)}>
            <IoMdClose className="icon close-icon text-orange-500 hover:text-orange-400" />
          </CloseButton>

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
    </>
  );
}


const MobileNavToggle = ({ open, onClick }: { open: boolean, onClick: () => void }) => {
  return (
    <ToggleWrapper open={open} onClick={onClick}>
      <BiMenu className="icon menu-icon text-orange-500 hover:text-orange-400 mt-[8px] mb-[6px] mr-[7px]" />
    </ToggleWrapper>
  );
};


const CloseButton = styled.button<{ mobileNavIsOpen: boolean }>`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  .icon {
    font-size: 1.75rem;
    transition: transform 0.3s ease;
  }

  .close-icon {
    transform: rotate(0deg);
  }

  @media (min-width: 840px) {
    display: none;
  }

  display: ${(props) => (props.mobileNavIsOpen ? 'block' : 'none')};
`;

const ToggleWrapper = styled.button<{ open: boolean }>`
  position: fixed;
  top: 20px;
  left: ${(props) => (props.open ? 'auto' : '0px')};
  right: 20px;
  background: var(--color-light);
  padding: 0 0 0 1rem;
  border-radius: 0 2rem 2rem 0;
  width: 3.25rem;
  z-index: 49;
  transition: left 0.3s ease, right 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  .menu-icon {
    transform: rotate(0deg);
  }

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
  background-color: transparent;
  z-index: 500;
  padding: 1rem 1rem 1.25rem 1rem;
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
