// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import styled from 'styled-components';
import { Overlay } from '../ui/Overlay';

export interface DocsNavProps {
  navItems: any;
}

// biome-ignore lint/correctness/noUnusedFunctionParameters: <TODO>
export function DocumentationNavigation({ navItems }: DocsNavProps) {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  return (
    <>
      {!mobileNavIsOpen && (
        <MobileNavToggle
          open={mobileNavIsOpen}
          onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)}
        />
      )}

      <Overlay
        open={mobileNavIsOpen}
        onClick={() => setMobileNavIsOpen(false)}
      />
    </>
  );
}

const MobileNavToggle = ({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) => {
  return (
    <ToggleWrapper open={open} onClick={onClick}>
      <BiMenu className="icon menu-icon text-orange-500 hover:text-orange-400 mt-[8px] mb-[6px] mr-[7px]" />
    </ToggleWrapper>
  );
};

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
