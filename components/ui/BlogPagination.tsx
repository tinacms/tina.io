import React, { useState } from 'react'
import styled from 'styled-components'
import Router from 'next/router'

import { DynamicLink } from './DynamicLink'

export const BlogPagination = styled(
  ({ currentPage, numPages, ...styleProps }) => {
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = `/blog/page/${currentPage - 1}`
    const nextPage = `/blog/page/${currentPage + 1}`
    const [selectValue, setSelectValue] = useState(currentPage)

    function handleSelectChange(e) {
      e.preventDefault()
      const pageNumber = e.target.value
      setSelectValue(pageNumber)
      return Router.push(`/blog/page/${pageNumber}`)
    }

    return (
      <div {...styleProps}>
        <PaginationLinks>
          {!isFirst && (
            <DynamicLink href={prevPage} passHref>
              <a
                onClick={() => setSelectValue(selectValue - 1)}
                className="font-tuner"
              >
                <span className="font-sans font-bold">←</span> Newer
              </a>
            </DynamicLink>
          )}
          {!isLast && (
            <DynamicLink href={nextPage} passHref>
              <a
                onClick={() => setSelectValue(selectValue + 1)}
                className="font-tuner"
              >
                Older <span className="font-sans font-bold">→</span>
              </a>
            </DynamicLink>
          )}
        </PaginationLinks>
        <div>
          <span className="text-gray-700">Page</span>{' '}
          <SelectWrapper>
            <select
              aria-label="Pagination Dropdown"
              value={selectValue}
              onChange={handleSelectChange}
            >
              {Array.from({ length: numPages }, (_, i) => (
                <option
                  arial-label={`Go to Page ${i + 1}`}
                  aria-current={i + 1 === currentPage ? true : false}
                  value={i + 1}
                  key={`page-${i}`}
                >
                  {i + 1}
                </option>
              ))}
            </select>
          </SelectWrapper>{' '}
          <span className="text-gray-700">of</span> {numPages}
        </div>
      </div>
    )
  }
)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
  margin-bottom: 3rem;
  font-family: var(--font-tuner-medium);

  p {
    color: var(--color-secondary);
  }

  select {
    display: inline-block;
    border-radius: 0.3em;
    background-color: var(--color-light);
    border: 1px solid var(--color-light-dark);
    border-radius: 0.3rem;
    color: var(--color-orange);
    outline: none;
    cursor: pointer;
    min-width: 3.5rem;

    -moz-appearance: none;
    -webkit-appearance: none;

    &:-moz-focusring {
      color: transparent;
      text-shadow: 0 0 0 #000;
    }

    &::-ms-expand {
      display: none;
    }
  }

  a {
    text-decoration: none;
    color: var(--color-orange);
    position: relative;
    overflow: visible;
    padding: 0.5rem;
    margin: -0.5rem 1rem -0.5rem -0.5rem;
  }
`

const SelectWrapper = styled.div`
  display: inline-block;
  position: relative;
`

const PaginationLinks = styled.div``
