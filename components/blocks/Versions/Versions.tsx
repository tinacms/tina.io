'use client';

import { useEffect, useState } from 'react';
import { Container } from '../Container';
import {
  fetchPackageInfo,
  isPackageInfoError,
  type PackageInfo,
} from './fetchPackageInfo';
import { formatPublishedDate } from './formatPublishedDate';
import { TINA_PACKAGES } from './packages';

type VersionsBlockData = {
  title?: string;
};

type RowState =
  | { status: 'loading'; name: string }
  | { status: 'resolved'; info: PackageInfo };

export function VersionsBlock({ data }: { data: VersionsBlockData }) {
  const [rows, setRows] = useState<RowState[]>(() =>
    TINA_PACKAGES.map((p) => ({ status: 'loading', name: p.name })),
  );

  useEffect(() => {
    let cancelled = false;
    Promise.all(TINA_PACKAGES.map((p) => fetchPackageInfo(p.name))).then(
      (results) => {
        if (cancelled) {
          return;
        }
        setRows(results.map((info) => ({ status: 'resolved', info })));
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container width="medium">
      <h1 className="text-3xl md:text-4xl font-ibm-plex font-medium text-blue-800 mt-16 mb-4">
        {data?.title ?? 'TinaCMS Package Versions'}
      </h1>
      <p className="text-gray-700 mb-8">
        Latest published version of every TinaCMS package, fetched live from
        npm.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 font-medium text-gray-600">Package</th>
              <th className="py-3 pr-4 font-medium text-gray-600">Latest</th>
              <th className="py-3 pr-4 font-medium text-gray-600">Published</th>
              <th className="py-3 font-medium text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody>
            {TINA_PACKAGES.map((pkg, i) => {
              const row = rows[i];
              return (
                <tr key={pkg.name} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-mono text-sm text-blue-800">
                    <a
                      href={`https://www.npmjs.com/package/${pkg.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {pkg.name}
                    </a>
                  </td>
                  <td className="py-3 pr-4 font-mono text-sm">
                    <VersionCell row={row} />
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-700">
                    <PublishedCell row={row} />
                  </td>
                  <td className="py-3 text-sm text-gray-700">
                    {pkg.description}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

function VersionCell({ row }: { row: RowState }) {
  if (row.status === 'loading') {
    return <span className="text-gray-400">—</span>;
  }
  if (isPackageInfoError(row.info)) {
    return <span className="text-red-600">error</span>;
  }
  return <span>{row.info.version}</span>;
}

function PublishedCell({ row }: { row: RowState }) {
  if (row.status === 'loading' || isPackageInfoError(row.info)) {
    return <span className="text-gray-400">—</span>;
  }
  return <span>{formatPublishedDate(row.info.publishedAt)}</span>;
}
