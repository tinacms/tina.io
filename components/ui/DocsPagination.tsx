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
          <div
            className="block p-4 text-left relative transition-all group border border-gray-100 cursor-pointer"
            style={{ backgroundColor: '#FAFAFA' }}
          >
            <span className="text-sm uppercase opacity-50 pl-10">Previous</span>
            <h5
              className="text-xl leading-[1.3] m-0 pl transition-all ease-out duration-150 text-blue-800 group-hover:text-orange-500 flex items-center"
            >
              <RightArrowSvg className="w-8 h-8 fill-gray-400 transition-all ease-out duration-150 rotate-180 group-hover:fill-orange-500 mr-2" />
              {prevPage.title}
            </h5>
          </div>
        </DynamicLink>
      )}
      {nextPage && nextPage.slug && (
        <DynamicLink href={`${nextPage.slug}`} passHref>
          <div
            className="col-start-2 block p-4 text-right relative transition-all group border border-gray-100 cursor-pointer"
            style={{ backgroundColor: '#FAFAFA' }}
          >
            <span className="text-sm uppercase opacity-50 pr-10">Next</span>
            <h5
              className="text-xl leading-[1.3] m-0 transition-all ease-out duration-150 text-blue-800 group-hover:text-orange-500 flex items-center justify-end"
            >
              {nextPage.title}
              <RightArrowSvg className="w-8 h-8 fill-gray-400 transition-all ease-out duration-150 group-hover:fill-orange-500 ml-2" />
            </h5>
          </div>
        </DynamicLink>
      )}
    </div>
  )
}

export default DocsPagination
