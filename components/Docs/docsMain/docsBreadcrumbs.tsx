'use client';

import { useNavigationData } from 'components/Docs/DocsLayoutClient';
import { buildDocLinkSlug } from 'utils/i18n/buildLinkSlug';
import type { Locale } from 'utils/i18n/localeRouteConfig';
import { useDocsNavigation } from 'components/Docs/DocsNavigationContext';
import React from 'react';

interface BreadcrumbItem {
  title: string;
  slug?: string;
  originalSlug?: string;
}

// Recursively create path
const findNavigationPathWithSlugs = (
  items: any[],
  targetContentId: string,
  normalizeSlug: (slug: string | undefined) => string | null,
  currentPath: BreadcrumbItem[] = []
): BreadcrumbItem[] | null => {
  for (const item of items) {
    const normalizedItemSlug = normalizeSlug(item.slug);
    const newPath = [...currentPath, { title: item.title, slug: item.slug, originalSlug: normalizedItemSlug }];
    
    if (normalizedItemSlug === targetContentId) {
      return newPath;
    }
    
    if (item.items && item.items.length > 0) {
      const childPath = findNavigationPathWithSlugs(item.items, targetContentId, normalizeSlug, newPath);
      if (childPath) {
        return childPath;
      }
    }
  }
  
  return null;
};

const DocsBreadcrumbs = ({ locale }: { locale: Locale }) => {
  const { NavigationDocsData, NavigationLearnData } = useNavigationData();
  const { learnActive } = useDocsNavigation();
  const navigationItems = learnActive ? NavigationLearnData?.data : NavigationDocsData?.data;
  
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  // Convert pathname to content ID format
  const convertPathToId = (pathname: string, locale: Locale): string | null => {
    let path = pathname;
    if (locale === 'zh' && pathname.startsWith('/zh/')) {
      path = pathname.substring(3);
    } else if (pathname.startsWith('/docs/')) {
      path = pathname.substring(6);
    }
    
    if (!path || path === '/') return null;
    
    path = path.replace(/\/$/, '');
    
    return `content/docs/${path}.mdx`;
  };

  const contentId = convertPathToId(currentPath, locale);
  
  if (!contentId || !navigationItems) {
    return null;
  }

  // Helper to normalize slugs for comparison
  const normalizeSlug = (slug: string | undefined): string | null => {
    if (!slug) return null;
    
    // If it's already in content/docs/ format
    if (slug.startsWith('content/docs/')) {
      return slug;
    }
    
    // If it's a URL slug format (starts with /)
    if (slug.startsWith('/')) {
      // Remove leading / and trailing / if present
      let path = slug;
      if (path.startsWith('/')) {
        path = path.substring(1);
      }
      if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1);
      }
      // Slugs already have /docs/ prefix, so use content/ + path
      return `content/${path}.mdx`;
    }
    
    return slug;
  };

  const breadcrumbPath = findNavigationPathWithSlugs(navigationItems, contentId, normalizeSlug);
  if (!breadcrumbPath || breadcrumbPath.length < 1) {
    return null;
  }

  return (
    <nav className="flex items-center text-sm text-slate-600 mb-1 flex-wrap" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center max-w-full">
        {breadcrumbPath.map((item, index) => {
          const isLast = index === breadcrumbPath.length - 1;
          const hasSlug = !!item.originalSlug;
          
          if (hasSlug) {
            const urlSlug = buildDocLinkSlug(item.originalSlug, locale);
            return (
              <li key={index} className="flex items-center whitespace-nowrap font-ibm-plex">
                {index > 0 && (
                  <span className="text-slate-400 px-1.5">
                    {'>'}
                  </span>
                )}
                <a
                  href={urlSlug}
                  className={isLast && 'text-slate-900'}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.title}
                </a>
              </li>
            );
          }
          
          // Ellipsis item - no link, just display ...
          return (
            <li key={index} className="flex items-center whitespace-nowrap font-ibm-plex">
              {index > 0 && (
                <span className="text-slate-400 px-1.5">
                  {'>'}
                </span>
              )}
              <span className="text-slate-400">
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
