import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import RightArrowSvg from '../../public/svg/right-arrow.svg';
import { hasZhPrefix, isZhHost } from '../../utils/i18n/domains';
import { EYEBROW, SUB_HEADING } from '../styles/typography';
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
  // The Chinese site serves prefix-free URLs, so the hostname decides the
  // locale; the `/zh` prefix is still honoured for local development.
  const [isZh, setIsZh] = useState(false);

  useEffect(() => {
    setIsZh(isZhHost(window.location.host) || hasZhPrefix(pathname ?? ''));
  }, [pathname]);

  const lastPageText = isZh ? '上一页' : 'Last Page';
  const nextPageText = isZh ? '下一页' : 'Next Page';
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {prevPage?.slug && (
        <DynamicLink href={`${prevPage.slug}`} passHref>
          <div
            className="block p-4 text-left relative transition-all group border border-gray-100 cursor-pointer"
            style={{ backgroundColor: '#FAFAFA' }}
          >
            <span className={`${EYEBROW} pl-10`}>{lastPageText}</span>
            <h5
              className={`${SUB_HEADING} m-0 pl transition-all ease-out duration-150 flex items-center`}
            >
              <RightArrowSvg className="w-7 h-7 fill-gray-400 transition-all ease-out duration-150 rotate-180 group-hover:fill-orange-500 mr-2" />
              {prevPage.title}
            </h5>
          </div>
        </DynamicLink>
      )}
      <div className="col-start-2">
        {nextPage?.slug && (
          <DynamicLink href={`${nextPage.slug}`} passHref>
            <div
              className="block p-4 text-right relative transition-all group border border-gray-100 cursor-pointer"
              style={{ backgroundColor: '#FAFAFA' }}
            >
              <span className={`${EYEBROW} md:pr-10 pr-6`}>{nextPageText}</span>
              <h5
                className={`${SUB_HEADING} m-0 transition-all ease-out duration-150 flex items-center justify-end`}
              >
                {nextPage.title}
                <RightArrowSvg className="w-7 h-7 fill-gray-400 transition-all ease-out duration-150 group-hover:fill-orange-500 ml-2" />
              </h5>
            </div>
          </DynamicLink>
        )}
      </div>
    </div>
  );
}

export default DocsPagination;
