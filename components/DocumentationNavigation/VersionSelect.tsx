import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styled from 'styled-components';

const VERSIONS = [
  {
    id: 'v-latest',
    url: 'https://tina.io',
    label: 'v.Latest',
  },
  {
    id: 'v-0.68.13',
    url: 'https://tinacms-site-next-i08bcbicy-tinacms.vercel.app/',
    label: 'v.0.68.13',
  },
  {
    id: 'v-0.67.3',
    url: 'https://tinacms-site-next-pu1t2v9y4-tinacms.vercel.app',
    label: 'v.0.67.3',
  },
  {
    id: 'v-pre-beta',
    url: 'https://pre-beta.tina.io',
    label: 'v.Pre-Beta',
  },
];

export const VersionSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(
    VERSIONS.find(
      (v) => typeof window !== 'undefined' && v.url === window.location.origin
    ) || VERSIONS[0]
  );

  return (
    <SelectWrapper>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-button"
        aria-label="Version"
      >
        {selectedVersion.label}
        <FaChevronDown className='pl-1'/>
      </button>

      
      {isOpen && (
        <DropdownList>
          {VERSIONS.map((version) => (
            <li key={version.id}>
              <button
                onClick={() => {
                  setSelectedVersion(version);
                  setIsOpen(false);
                  window.location.href = version.url;
                }}
                className={`option ${
                  selectedVersion.id === version.id ? 'selected' : ''
                }`}
                aria-current={selectedVersion.id === version.id}
              >
                {version.label}
              </button>
            </li>
          ))}
        </DropdownList>
      )}
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div`
  display: block;
  flex-grow: 1;
  position: relative;

  @media (min-width: 840px) {
    display: inline-block;
    flex-grow: 0;
  }

  .dropdown-button {
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
    background-color: white;
    border: 1px solid var(--color-grey-1);
    color: var(--color-grey-7);
    display: flex;
    width: 100%;
    align-items: center;
    border-radius: 100px;
    transition: filter 250ms ease;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    background-repeat: no-repeat;
    background-position: right 0.7em top 50%;
    background-size: 0.65em auto;
    cursor: pointer;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  background-color: white;
  border: 1px solid var(--color-grey-1);
  border-radius: 0.375rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  z-index: 10;

  li {
    list-style: none;

    .option {
      width: 100%;
      padding: 0.5rem 0.75rem;
      background-color: white;
      text-align: left;
      color: var(--color-grey-7);
      cursor: pointer;
      transition: background-color 250ms ease;

      &:hover {
        background-color: var(--color-grey-2);
      }

      &.selected {
        color: red;
      }
    }
  }
`;
