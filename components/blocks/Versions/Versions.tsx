'use client';

import { useEffect, useState } from 'react';
import {
  fetchPackageInfo,
  isPackageInfoError,
  type PackageInfo,
} from 'utils/fetchPackageInfo';
import { formatPublishedDate } from 'utils/formatPublishedDate';
import RenderButton from 'utils/renderButtonArrayHelper';
import { SkeletonBar } from '@/component/ui/SkeletonBar';
import { TINA_PACKAGES, type TinaPackage } from './packages';

type VersionsBlockData = {
  title?: string;
  description?: string;
  buttons?: Array<
    { __typename?: string; id?: string; label?: string } & Record<
      string,
      unknown
    >
  >;
};

type RowState =
  | { status: 'loading' }
  | { status: 'resolved'; info: PackageInfo };

type RowMap = Record<string, RowState>;

const HEADER_CELL_CLASS =
  'py-4 font-source-code-pro text-xxs font-medium uppercase tracking-widest text-gray-500';
const CARD_CLASS =
  'rounded-2xl border border-gray-200/80 bg-white/60 shadow-lg backdrop-blur-sm';
const PACKAGE_LINK_BASE =
  'font-source-code-pro text-xs text-gray-900 hover:text-orange-600';
const PILL_CLASS =
  'animate-row-in inline-flex items-center rounded-md border border-orange-200/80 bg-orange-50/80 px-2 py-0.5 font-source-code-pro text-xs font-medium text-orange-700';
const PLACEHOLDER_CLASS = 'font-source-code-pro text-xs text-gray-400';

export function VersionsBlock({ data }: { data: VersionsBlockData }) {
  const [rows, setRows] = useState<RowMap>(() =>
    Object.fromEntries(
      TINA_PACKAGES.map((p) => [p.name, { status: 'loading' } as RowState]),
    ),
  );

  useEffect(() => {
    let cancelled = false;
    for (const pkg of TINA_PACKAGES) {
      fetchPackageInfo(pkg.name).then((info) => {
        if (cancelled) {
          return;
        }
        setRows((prev) => ({
          ...prev,
          [pkg.name]: { status: 'resolved', info },
        }));
      });
    }
    return () => {
      cancelled = true;
    };
  }, []);

  const title = data?.title ?? 'TinaCMS Package Versions';
  const description =
    data?.description ??
    'The currently published version of every package in the TinaCMS ecosystem — pulled straight from the npm registry on page load.';
  const buttons = data?.buttons ?? [];
  const titleWords = title.trim().split(/\s+/);
  const titleHead = titleWords.slice(0, -1).join(' ');
  const titleTail = titleWords[titleWords.length - 1] ?? '';

  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <header className="relative pt-20 pb-10 md:pt-28 md:pb-14">
          <h1 className="font-ibm-plex text-4xl leading-tight tracking-tight text-gray-900 md:text-6xl">
            {titleHead && <>{titleHead} </>}
            <span className="bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              {titleTail}
            </span>
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-balance text-lg text-gray-600">
              {description}
            </p>
          )}
          {buttons.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {buttons.map((button, index) => (
                <RenderButton
                  key={button.id ?? `${button.label}-${index}`}
                  button={button}
                />
              ))}
            </div>
          )}
        </header>

        <div className="relative">
          <div className="hidden md:block">
            <DesktopTable rows={rows} />
          </div>
          <div className="md:hidden">
            <MobileList rows={rows} />
          </div>
        </div>

        <footer className="pt-10 pb-24 font-source-code-pro text-xs uppercase tracking-widest text-gray-400">
          <span className="mr-2 text-orange-500">{'//'}</span>
          Source: registry.npmjs.org &nbsp;·&nbsp; {TINA_PACKAGES.length}{' '}
          packages
        </footer>
      </div>
    </div>
  );
}

function DesktopTable({ rows }: { rows: RowMap }) {
  return (
    <div className={CARD_CLASS}>
      <table className="w-full table-fixed border-collapse text-left">
        <colgroup>
          <col className="w-1/3" />
          <col className="w-1/6" />
          <col className="w-1/6" />
          <col />
        </colgroup>
        <thead>
          <tr className="border-b border-gray-200/80">
            <HeaderCell className="pl-6 pr-4">Package</HeaderCell>
            <HeaderCell className="pr-4">Latest</HeaderCell>
            <HeaderCell className="pr-4">Published</HeaderCell>
            <HeaderCell className="pr-6">Role</HeaderCell>
          </tr>
        </thead>
        <tbody>
          {TINA_PACKAGES.map((pkg) => (
            <DesktopRow key={pkg.name} pkg={pkg} row={rows[pkg.name]} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DesktopRow({ pkg, row }: { pkg: TinaPackage; row: RowState }) {
  return (
    <tr className="group relative border-b border-gray-100 last:border-b-0 transition-colors duration-150 hover:bg-orange-50/40">
      <td className="relative py-4 pl-6 pr-4">
        <span className="pointer-events-none absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 bg-orange-500 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
        <PackageLink
          name={pkg.name}
          className={`${PACKAGE_LINK_BASE} decoration-orange-400/60 underline-offset-4 hover:underline`}
        />
      </td>
      <td className="py-4 pr-4 align-middle">
        <VersionField row={row} skeletonWidth="w-16" />
      </td>
      <td className="py-4 pr-4">
        <PublishedField row={row} skeletonWidth="w-24" />
      </td>
      <td className="py-4 pr-6">
        <span className="text-sm text-gray-600">{pkg.description}</span>
      </td>
    </tr>
  );
}

function MobileList({ rows }: { rows: RowMap }) {
  return (
    <ul className="flex flex-col gap-3">
      {TINA_PACKAGES.map((pkg) => (
        <li
          key={pkg.name}
          className="rounded-xl border border-gray-200/80 bg-white/70 p-4 backdrop-blur-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <PackageLink name={pkg.name} className={PACKAGE_LINK_BASE} />
            <VersionField row={rows[pkg.name]} skeletonWidth="w-14" shrink />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-600">{pkg.description}</span>
            <PublishedField
              row={rows[pkg.name]}
              skeletonWidth="w-20"
              variant="compact"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function HeaderCell({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <th className={`${HEADER_CELL_CLASS} ${className}`}>{children}</th>;
}

function PackageLink({ name, className }: { name: string; className: string }) {
  return (
    <a
      href={`https://www.npmjs.com/package/${name}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {name}
    </a>
  );
}

function VersionField({
  row,
  skeletonWidth,
  shrink = false,
}: {
  row: RowState;
  skeletonWidth: string;
  shrink?: boolean;
}) {
  if (row.status === 'loading') {
    return <SkeletonBar width={skeletonWidth} />;
  }
  if (isPackageInfoError(row.info)) {
    return <span className={PLACEHOLDER_CLASS}>—</span>;
  }
  return (
    <span className={shrink ? `${PILL_CLASS} shrink-0` : PILL_CLASS}>
      {row.info.version}
    </span>
  );
}

function PublishedField({
  row,
  skeletonWidth,
  variant = 'regular',
}: {
  row: RowState;
  skeletonWidth: string;
  variant?: 'regular' | 'compact';
}) {
  if (row.status === 'loading') {
    return <SkeletonBar width={skeletonWidth} />;
  }
  if (isPackageInfoError(row.info)) {
    if (variant === 'compact') {
      return null;
    }
    return <span className="text-sm text-gray-400">unavailable</span>;
  }
  const formatted = formatPublishedDate(row.info.publishedAt);
  if (variant === 'compact') {
    return (
      <span className="animate-row-in ml-3 shrink-0 font-source-code-pro text-xxs text-gray-500">
        {formatted}
      </span>
    );
  }
  return (
    <span className="animate-row-in font-source-code-pro text-xs text-gray-600">
      {formatted}
    </span>
  );
}
