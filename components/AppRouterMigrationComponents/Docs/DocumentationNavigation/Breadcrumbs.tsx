'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { matchActualTarget } from 'utils';

export interface DocsNavProps {
  navItems: any;
}

const getNestedBreadcrumbs = (
  listItems: any[],
  pagePath: string,
  breadcrumbs: any[] = []
) => {
  for (const listItem of listItems || []) {
    if (matchActualTarget(pagePath, listItem.slug || listItem.href)) {
      breadcrumbs.push(listItem);
      return [listItem];
    }
    const nestedBreadcrumbs = getNestedBreadcrumbs(
      listItem.items,
      pagePath,
      breadcrumbs
    );
    if (nestedBreadcrumbs.length) {
      return [listItem, ...nestedBreadcrumbs];
    }
  }
  return [];
};

export function Breadcrumbs({ navItems }: DocsNavProps) {
  const pathname = usePathname();
  const breadcrumbs = getNestedBreadcrumbs(navItems, pathname) || [];

  return (
    <ul className="flex items-center flex-wrap gap-1 p-0 m-0 list-none">
      {breadcrumbs.map((breadcrumb, i) => (
        <li key={breadcrumb.slug} className="flex items-center m-0">
          {i !== 0 && (
            <FaChevronRight
              className="text-gray-400 mx-2"
              aria-hidden="true"
            />
          )}
          <a
            href={breadcrumb.slug}
            className="text-sm uppercase text-gray-500 hover:text-orange-500 transition-opacity duration-150"
          >
            {breadcrumb.title || breadcrumb.category}
          </a>
        </li>
      ))}
    </ul>
  );
}
