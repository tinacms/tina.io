import { usePathname } from 'next/navigation';
import React from 'react';
import RightArrowSvg from '../../public/svg/right-arrow.svg';
import { isChineseRoute } from '../../utils/locale';
import { DynamicLink } from '../ui/DynamicLink';

interface NextPrevPageProps {
  title: string;
  slug: string;
}

interface PaginationProps {
  prevPage?: NextPrevPageProps;
  nextPage?: NextPrevPageProps;
}

export function DocsPagination({ prevPage, nextPage }: PaginationProps) {
  const pathname = usePathname();
  const isZh = isChineseRoute(pathname);

  const lastPageText = isZh ? '上一页' : 'Last Page';
  const nextPageText = isZh ? '下一页' : 'Next Page';
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {prevPage && prevPage.slug && (
        <DynamicLink href={`${prevPage.slug}`} passHref>
          <div
            className="block p-4 text-left relative transition-all group border border-gray-100 cursor-pointer"
            style={{ backgroundColor: '#FAFAFA' }}
          >
            <span className="text-sm uppercase opacity-50 pl-10">
              {lastPageText}
            </span>
            <h5 className="text-base md:text-xl eading-[1.3] m-0 pl transition-all ease-out duration-150 text-blue-800 group-hover:text-orange-500 flex items-center">
              <RightArrowSvg className="w-7 h-7 fill-gray-400 transition-all ease-out duration-150 rotate-180 group-hover:fill-orange-500 mr-2" />
              {prevPage.title}
            </h5>
          </div>
        </DynamicLink>
      )}
      {nextPage && nextPage.slug && (
        <DynamicLink href={`${nextPage.slug}`} passHref className="col-start-2">
          <div
            className="block p-4 text-right relative transition-all group border border-gray-100 cursor-pointer"
            style={{ backgroundColor: '#FAFAFA' }}
          >
            <span className="text-sm uppercase opacity-50 md:pr-10 pr-6">
              {nextPageText}
            </span>
            <h5 className="text-base md:text-xl leading-[1.3] m-0 transition-all ease-out duration-150 text-blue-800 group-hover:text-orange-500 flex items-center justify-end">
              {nextPage.title}
              <RightArrowSvg className="w-7 h-7 fill-gray-400 transition-all ease-out duration-150 group-hover:fill-orange-500 ml-2" />
            </h5>
          </div>
        </DynamicLink>
      )}
    </div>
  );
}

export default DocsPagination;
