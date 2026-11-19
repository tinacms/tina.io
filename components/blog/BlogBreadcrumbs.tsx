import Link from 'next/link';
import type { ReactNode } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { BODY_MUTED, SUBTLE_LINK } from '@/component/styles/typography';

type Crumb = { label: string; href: string };

export function BlogBreadcrumbs({
  ariaLabel,
  parents,
  current,
}: {
  ariaLabel: string;
  parents: [Crumb, ...Crumb[]];
  current: ReactNode;
}) {
  const parent = parents[parents.length - 1];

  return (
    <nav aria-label={ariaLabel} className={BODY_MUTED}>
      <Link
        href={parent.href}
        className={`${SUBTLE_LINK} md:hidden inline-flex min-h-11 items-center gap-1`}
      >
        <BiChevronLeft aria-hidden="true" />
        {parent.label}
      </Link>
      <ol className="hidden md:flex min-h-11 items-center gap-2 whitespace-nowrap">
        {parents.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <Link href={crumb.href} className={SUBTLE_LINK}>
              {crumb.label}
            </Link>
            <span aria-hidden="true">/</span>
          </li>
        ))}
        <li aria-current="page" className="min-w-0 max-w-[80ch] truncate">
          {current}
        </li>
      </ol>
    </nav>
  );
}
