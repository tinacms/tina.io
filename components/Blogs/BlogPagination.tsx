'use client';

import { DynamicLink } from 'components/ui';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { EYEBROW_LINK, FIELD, LABEL } from '@/component/styles/typography';

interface BlogPaginationProps {
  currentPage: number;
  numPages: number;
}

export default function NewBlogPagination({
  currentPage,
  numPages,
}: BlogPaginationProps) {
  const router = useRouter();
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;
  const [selectValue, setSelectValue] = useState(currentPage);

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const pageNumber = Number(e.target.value);
    setSelectValue(pageNumber);
    router.push(`/blog/page/${pageNumber}`);
  }

  return (
    <div className="flex justify-between items-center mb-12">
      {/* Pagination Links */}
      <div className="flex gap-4">
        {!isFirst && (
          <DynamicLink href={prevPage}>
            <span
              onClick={() => setSelectValue(selectValue - 1)}
              className={EYEBROW_LINK}
            >
              <span>←</span> Newer
            </span>
          </DynamicLink>
        )}
        {!isLast && (
          <DynamicLink href={nextPage}>
            <span
              onClick={() => setSelectValue(selectValue + 1)}
              className={EYEBROW_LINK}
            >
              Older <span>→</span>
            </span>
          </DynamicLink>
        )}
      </div>

      {/* Page Select */}
      <div className={`${LABEL} flex items-center gap-2`}>
        <span>Page</span>
        <div className="relative inline-block">
          <select
            aria-label="Pagination Dropdown"
            value={selectValue}
            onChange={handleSelectChange}
            className={`${FIELD} appearance-none border border-neutral-border rounded-md pl-2 pr-8 py-1 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-(--border-brand)`}
          >
            {Array.from({ length: numPages }, (_, i) => (
              <option
                aria-label={`Go to Page ${i + 1}`}
                aria-current={i + 1 === currentPage ? 'true' : 'false'}
                value={i + 1}
                key={`page-${i + 1}`}
              >
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <span>of</span> {numPages}
      </div>
    </div>
  );
}
