'use client';

import { useNavigationData } from 'components/Docs/DocsLayoutClient';
import { useDocsNavigation } from 'components/Docs/DocsNavigationContext';
import React from 'react';

interface BreadcrumbItem {
  title: string;
  slug?: string;
}

const cleanPath = (path: string | undefined): string => {
  return path ? path.replace(/\/+$/, '').replace(/^\/+/, '') : '';
};

const matchSlug = (
  itemSlug: string | undefined,
  currentPath: string,
): boolean => {
  if (!itemSlug) return false;
  return cleanPath(itemSlug) === cleanPath(currentPath);
};

const getFirstChildSlug = (item: any): string | undefined => {
  if (!item) return undefined;
  if (item.slug) return item.slug;
  if (item.items && item.items.length > 0) {
    for (const child of item.items) {
      const slug = getFirstChildSlug(child);
      if (slug) {
        return slug;
      }
    }
  }
  return undefined;
};

const findNavigationPath = (
  items: any[],
  currentPath: string,
  currentBreadcrumbs: BreadcrumbItem[] = [],
): BreadcrumbItem[] | null => {
  if (!items) {
    return null;
  }
  for (const item of items) {
    if (!item) {
      continue;
    }
    const isMatch = matchSlug(item.slug, currentPath);
    const resolvedSlug = item.slug || getFirstChildSlug(item);
    const newPath = [
      ...currentBreadcrumbs,
      { title: item.title || '', slug: resolvedSlug },
    ];

    if (isMatch) return newPath;

    if (item.items && item.items.length > 0) {
      const childPath = findNavigationPath(item.items, currentPath, newPath);
      if (childPath) {
        return childPath;
      }
    }
  }

  return null;
};

const DocsBreadcrumbs = () => {
  const { NavigationDocsData, NavigationLearnData } = useNavigationData();
  const { learnActive } = useDocsNavigation();
  const navigationItems = learnActive
    ? NavigationLearnData?.data
    : NavigationDocsData?.data;

  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : '';
  if (!navigationItems) return null;

  const breadcrumbPath = findNavigationPath(navigationItems, currentPath);
  if (!breadcrumbPath || breadcrumbPath.length < 1) return null;

  return (
    <nav
      className="flex items-center text-sm text-neutral-text-secondary mb-1 flex-wrap"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center max-w-full">
        {breadcrumbPath.map((item, index) => {
          const isLast = index === breadcrumbPath.length - 1;
          const hasSlug = !!item.slug;

          if (hasSlug && !isLast) {
            return (
              <li
                key={index}
                className="flex items-center whitespace-nowrap font-ibm-plex"
              >
                {index > 0 && (
                  <span className="text-neutral-text-secondary opacity-60 px-1.5">
                    {'>'}
                  </span>
                )}
                <a
                  href={item.slug}
                  className="text-neutral-text-secondary hover:text-brand-primary transition-colors"
                >
                  {item.title}
                </a>
              </li>
            );
          }

          return (
            <li
              key={index}
              className="flex items-center whitespace-nowrap font-ibm-plex"
            >
              {index > 0 && (
                <span className="text-neutral-text-secondary opacity-60 px-1.5">
                  {'>'}
                </span>
              )}
              <span
                className={
                  isLast
                    ? 'text-neutral-text font-medium'
                    : 'text-neutral-text-secondary'
                }
              >
                {item.title}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default DocsBreadcrumbs;
