'use client';

import { DynamicLink } from 'components/ui';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

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
    <div className="flex justify-between items-center mb-12 text-lg font-medium font-tuner">
      {/* Pagination Links */}
      <div className="flex gap-4">
        {!isFirst && (
          <DynamicLink href={prevPage}>
            <span
              onClick={() => setSelectValue(selectValue - 1)}
              className="text-orange-600 hover:underline"
            >
              <span className="font-bold">←</span> Newer
            </span>
          </DynamicLink>
        )}
        {!isLast && (
          <DynamicLink href={nextPage}>
            <span
              onClick={() => setSelectValue(selectValue + 1)}
              className="text-orange-600 hover:underline"
            >
              Older <span className="font-bold">→</span>
            </span>
          </DynamicLink>
        )}
      </div>

      {/* Page Select */}
      <div className="flex items-center gap-2">
        <span className="text-gray-700">Page</span>
        <div className="relative inline-block">
          <select
            aria-label="Pagination Dropdown"
            value={selectValue}
            onChange={handleSelectChange}
            className="appearance-none border border-gray-300 rounded-md bg-light pl-2 pr-8 py-1 cursor-pointer text-orange-600 focus:outline-hidden focus:ring-2 focus:ring-orange-300"
          >
            {Array.from({ length: numPages }, (_, i) => (
              <option
                aria-label={`Go to Page ${i + 1}`}
                aria-current={i + 1 === currentPage ? 'true' : 'false'}
                value={i + 1}
                key={`page-${i}`}
              >
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <span className="text-gray-700">of</span> {numPages}
      </div>
    </div>
  );
}
