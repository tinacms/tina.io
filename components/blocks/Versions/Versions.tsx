'use client';

import { useEffect, useState } from 'react';
import {
  fetchPackageInfo,
  isPackageInfoError,
  type PackageInfo,
} from './fetchPackageInfo';
import { formatPublishedDate } from './formatPublishedDate';
import { TINA_PACKAGES, type TinaPackage } from './packages';

type VersionsButton = {
  label?: string;
  url?: string;
  variant?: string;
};

type VersionsBlockData = {
  title?: string;
  description?: string;
  buttons?: VersionsButton[];
};

type RowState =
  | { status: 'loading' }
  | { status: 'resolved'; info: PackageInfo };

export function VersionsBlock({ data }: { data: VersionsBlockData }) {
  const [rows, setRows] = useState<Record<string, RowState>>(() =>
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
  const buttons = (data?.buttons ?? []).filter(
    (b): b is VersionsButton & { label: string; url: string } =>
      Boolean(b?.label && b?.url),
  );
  const titleWords = title.trim().split(/\s+/);
  const titleHead = titleWords.slice(0, -1).join(' ');
  const titleTail = titleWords[titleWords.length - 1] ?? '';

  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto w-[90%] max-w-[1350px] lg:w-4/5">
        <header className="relative pt-20 pb-10 md:pt-28 md:pb-14">
          <h1 className="font-ibm-plex text-4xl leading-[1.05] tracking-tight text-gray-900 md:text-6xl">
            {titleHead ? <>{titleHead} </> : null}
            <span className="bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              {titleTail}
            </span>
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-balance text-lg text-gray-600">
              {description}
            </p>
          ) : null}
          {buttons.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {buttons.map((btn) => (
                <VersionsButtonLink key={`${btn.label}-${btn.url}`} {...btn} />
              ))}
            </div>
          ) : null}
        </header>

        <div className="relative">
          <div className="hidden md:block">
            <DesktopTable rows={rows} />
          </div>
          <div className="md:hidden">
            <MobileList rows={rows} />
          </div>
        </div>

        <footer className="pt-10 pb-24 font-source-code-pro text-xs uppercase tracking-[0.18em] text-gray-400">
          <span className="mr-2 text-orange-500">{'//'}</span>
          Source: registry.npmjs.org &nbsp;·&nbsp; {TINA_PACKAGES.length}{' '}
          packages
        </footer>
      </div>

      <style>{`
        @keyframes versionsShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes versionsRowIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .versions-skel {
          background: linear-gradient(
            90deg,
            rgba(17, 24, 39, 0.06) 0%,
            rgba(17, 24, 39, 0.12) 50%,
            rgba(17, 24, 39, 0.06) 100%
          );
          background-size: 200% 100%;
          animation: versionsShimmer 1.6s ease-in-out infinite;
          border-radius: 6px;
        }
        .versions-row-in {
          animation: versionsRowIn 240ms ease-out both;
        }
      `}</style>
    </div>
  );
}

function DesktopTable({ rows }: { rows: Record<string, RowState> }) {
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white/60 shadow-[0_1px_0_rgba(17,24,39,0.04),0_24px_48px_-24px_rgba(17,24,39,0.12)] backdrop-blur-sm">
      <table className="w-full border-collapse text-left">
        <colgroup>
          <col style={{ width: '30%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '18%' }} />
          <col />
        </colgroup>
        <thead>
          <tr className="border-b border-gray-200/80">
            <th className="py-4 pl-6 pr-4 font-source-code-pro text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
              Package
            </th>
            <th className="py-4 pr-4 font-source-code-pro text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
              Latest
            </th>
            <th className="py-4 pr-4 font-source-code-pro text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
              Published
            </th>
            <th className="py-4 pr-6 font-source-code-pro text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
              Role
            </th>
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
  const resolved = row.status === 'resolved' ? row.info : null;
  const errored = resolved ? isPackageInfoError(resolved) : false;

  return (
    <tr className="group relative border-b border-gray-100 last:border-b-0 transition-colors duration-150 hover:bg-orange-50/40">
      <td className="relative py-4 pl-6 pr-4">
        <span className="pointer-events-none absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 bg-orange-500 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
        <a
          href={`https://www.npmjs.com/package/${pkg.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-source-code-pro text-[13.5px] text-gray-900 decoration-orange-400/60 underline-offset-4 hover:text-orange-600 hover:underline"
        >
          {pkg.name}
        </a>
      </td>
      <td className="py-4 pr-4 align-middle">
        {row.status === 'loading' ? (
          <SkelBar widthClass="w-16" />
        ) : errored ? (
          <span className="font-source-code-pro text-[13px] text-gray-400">
            —
          </span>
        ) : (
          <span className="versions-row-in inline-flex items-center rounded-md border border-orange-200/80 bg-orange-50/80 px-2 py-0.5 font-source-code-pro text-[13px] font-medium text-orange-700">
            {(resolved as { version: string }).version}
          </span>
        )}
      </td>
      <td className="py-4 pr-4">
        {row.status === 'loading' ? (
          <SkelBar widthClass="w-24" />
        ) : errored ? (
          <span className="text-sm text-gray-400">unavailable</span>
        ) : (
          <span className="versions-row-in font-source-code-pro text-[13px] text-gray-600">
            {formatPublishedDate(
              (resolved as { publishedAt: string }).publishedAt,
            )}
          </span>
        )}
      </td>
      <td className="py-4 pr-6">
        <span className="text-sm text-gray-600">{pkg.description}</span>
      </td>
    </tr>
  );
}

function MobileList({ rows }: { rows: Record<string, RowState> }) {
  return (
    <ul className="flex flex-col gap-3">
      {TINA_PACKAGES.map((pkg) => {
        const row = rows[pkg.name];
        const resolved = row?.status === 'resolved' ? row.info : null;
        const errored = resolved ? isPackageInfoError(resolved) : false;
        return (
          <li
            key={pkg.name}
            className="rounded-xl border border-gray-200/80 bg-white/70 p-4 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <a
                href={`https://www.npmjs.com/package/${pkg.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-source-code-pro text-[13px] text-gray-900 hover:text-orange-600"
              >
                {pkg.name}
              </a>
              {row?.status === 'loading' ? (
                <SkelBar widthClass="w-14" />
              ) : errored ? (
                <span className="font-source-code-pro text-[13px] text-gray-400">
                  —
                </span>
              ) : (
                <span className="versions-row-in inline-flex shrink-0 items-center rounded-md border border-orange-200/80 bg-orange-50/80 px-2 py-0.5 font-source-code-pro text-[13px] font-medium text-orange-700">
                  {(resolved as { version: string }).version}
                </span>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">{pkg.description}</span>
              {row?.status === 'loading' ? (
                <SkelBar widthClass="w-20" />
              ) : errored ? null : (
                <span className="versions-row-in ml-3 shrink-0 font-source-code-pro text-[12px] text-gray-500">
                  {formatPublishedDate(
                    (resolved as { publishedAt: string }).publishedAt,
                  )}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function VersionsButtonLink({
  label,
  url,
  variant,
}: {
  label: string;
  url: string;
  variant?: string;
}) {
  const isExternal = /^https?:\/\//.test(url);
  const base =
    'group inline-flex items-center gap-2 rounded-full px-5 py-2 font-ibm-plex text-sm transition-all duration-150';
  const styles =
    variant === 'secondary'
      ? 'border border-gray-300 bg-white/70 text-gray-800 hover:border-orange-400 hover:text-orange-600'
      : 'bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 text-white shadow-[0_6px_18px_-8px_rgba(236,72,21,0.6)] hover:shadow-[0_10px_28px_-10px_rgba(236,72,21,0.7)]';

  return (
    <a
      href={url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`${base} ${styles}`}
    >
      {label}
      <span
        aria-hidden
        className="translate-x-0 transition-transform duration-150 group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}

function SkelBar({ widthClass }: { widthClass: string }) {
  return (
    <span
      aria-hidden
      className={`versions-skel inline-block h-[18px] align-middle ${widthClass}`}
    />
  );
}
