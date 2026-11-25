import type { ReactNode } from 'react';
import { EYEBROW, LINE, SURFACE } from '@/component/styles/typography';

export type GuideTableRow = { key: string; cells: ReactNode[] };

export type GuideTableProps = {
  columns: string[];
  /** Column widths from md up, so every table of one kind lines up. */
  widths?: string[];
  rows: GuideTableRow[];
};

/**
 * The one table layout on the page. A table from md up; on phones each row
 * stacks into a block, with the column name in front of each value.
 */
export const GuideTable = ({ columns, widths, rows }: GuideTableProps) => (
  <div
    className={`${SURFACE.cardBordered} overflow-hidden rounded-xl border ${LINE.subtle}`}
  >
    <table
      className={`w-full text-left max-md:block ${widths ? 'md:table-fixed' : ''}`}
    >
      {widths && (
        <colgroup>
          {widths.map((w, i) => (
            <col key={columns[i]} className={w} />
          ))}
        </colgroup>
      )}
      <thead className="max-md:hidden">
        <tr className={SURFACE.neutral}>
          {columns.map((c) => (
            <th key={c} className={`${EYEBROW} px-5 py-3 whitespace-nowrap`}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="max-md:block">
        {rows.map((row) => (
          <tr
            key={row.key}
            className={`border-t ${LINE.subtle} first:border-t-0 max-md:grid max-md:gap-3 max-md:p-5 md:first:border-t`}
          >
            {row.cells.map((cell, i) => (
              <td
                key={columns[i]}
                className="min-w-0 align-middle max-md:block md:px-5 md:py-4"
              >
                {i > 0 && (
                  <p className={`${EYEBROW} mb-1 md:hidden`}>{columns[i]}</p>
                )}
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
