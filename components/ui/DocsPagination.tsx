import React from 'react'
import RightArrowSvg from '../../public/svg/right-arrow.svg'
import { DynamicLink } from '../ui/DynamicLink'

interface NextPrevPageProps {
  title: string
  slug: string
}

interface PaginationProps {
  prevPage?: NextPrevPageProps
  nextPage?: NextPrevPageProps
}

export function DocsPagination({ prevPage, nextPage }: PaginationProps) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {prevPage && prevPage.slug && (
        <DynamicLink href={`${prevPage.slug}`} passHref>
          <a
            className="block p-4 text-left pl-14 relative transition-all group border border-gray-100"
            style={{ backgroundColor: '#FAFAFA' }}
          >
            <span className="text-sm uppercase opacity-50">Previous</span>
            <h5
              className="text-xl leading-[1.3] m-0 transition-all ease-out duration-150 text-blue-800 group-hover:text-orange-500"
            >
              {prevPage.title}
            </h5>
            <RightArrowSvg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 fill-gray-400 transition-all ease-out duration-150 rotate-180 group-hover:fill-orange-500" />
          </a>
        </DynamicLink>
      )}
{nextPage && nextPage.slug && (
  <DynamicLink href={`${nextPage.slug}`} passHref>
    <a
      className="col-start-2 block p-4 text-right pr-14 relative transition-all group border border-gray-100"
      style={{ backgroundColor: '#FAFAFA' }}
    >
      <span className="text-sm uppercase opacity-50">Next</span>
      <h5
        className="text-xl leading-[1.3] m-0 transition-all ease-out duration-150 text-blue-800 group-hover:text-orange-500 absolute -top-1"
      >
        {nextPage.title}
      </h5>
      <RightArrowSvg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 fill-gray-400 transition-all ease-out duration-150 group-hover:fill-orange-500 pt-3 mt-2" />
    </a>
  </DynamicLink>
)}

    </div>
  )
}

export default DocsPagination
