import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

interface NextPrevPageProps {
  title: string
  slug: string
}

interface PaginationProps {
  prevPage?: NextPrevPageProps
  nextPage?: NextPrevPageProps
}

export function Pagination({ prevPage, nextPage }: PaginationProps) {
  return (
    <Wrapper>
      {prevPage && (
        <span>
          <h5>{prevPage.title}</h5>
          <Link href={`${prevPage.slug}`}>
            <h5>Previous</h5>
          </Link>
        </span>
      )}
      {nextPage && (
        <span>
          <h5>{nextPage.title}</h5>
          <Link href={`${nextPage.slug}`}>
            <h5>Next </h5>
          </Link>
        </span>
      )}
    </Wrapper>
  )
}

export default Pagination

/*
 ** Styles ------------------------------------------
 */

const Wrapper = styled('div')`
  width: 100%;
  max-width: 1232px;
  margin: 0 auto;
  padding: 0 2rem;
  max-width: 768px;
`
