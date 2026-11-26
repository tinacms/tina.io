import type { ReactNode } from 'react';
import { EYEBROW, LINE } from '@/component/styles/typography';

export type GuideTableRow = { key: string; cells: ReactNode[] };

export type GuideTableProps = {
  columns: string[];
  /** Column widths from md up, so every table of one kind lines up. */
  widths?: string[];
  rows: GuideTableRow[];
  /**
   * `table`: columns under a header row. `spec`: each row is its specimen
   * (the first column) beside the other columns, stacked with their labels,
   * and no header row. Defaults to `spec` for a role guide (a table with a
   * Not for column), `table` otherwise.
   */
  layout?: 'table' | 'spec';
};

/** The column that marks a role guide: each row picks one role over another. */
const NOT_FOR = 'Not for';

/**
 * Each row as its specimen on the left and, on the right, every other column
 * stacked under its label. Lines divide the rows; there is no header.
 */
const SpecList = ({ columns, rows }: GuideTableProps) => (
  <ul className="grid">
    {rows.map((row) => {
      const [specimen, ...spec] = row.cells;
      return (
        <li
          key={row.key}
          className={`grid gap-6 border-t ${LINE.subtle} py-8 last:border-b md:grid-cols-2 md:gap-x-12`}
        >
          <div className="min-w-0 self-center wrap-anywhere">{specimen}</div>
          <dl className="grid min-w-0 content-center gap-3">
            {spec.map(
              (cell, i) =>
                cell && (
                  <div key={columns[i + 1]}>
                    <dt className={`${EYEBROW} mb-1`}>{columns[i + 1]}</dt>
                    <dd>{cell}</dd>
                  </div>
                ),
            )}
          </dl>
        </li>
      );
    })}
  </ul>
);

/**
 * The one table layout on the page: open, with lines between the rows and no
 * card or header fill. A table from md up; on phones each row stacks into a
 * block, with the column name in front of each value.
 */
export const GuideTable = (props: GuideTableProps) => {
  const { columns, widths, rows, layout } = props;
  if ((layout ?? (columns.includes(NOT_FOR) ? 'spec' : 'table')) === 'spec') {
    return <SpecList {...props} />;
  }
  return (
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
        <tr>
          {columns.map((c) => (
            <th
              key={c}
              className={`${EYEBROW} px-5 py-3 whitespace-nowrap first:pl-0`}
            >
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="max-md:block">
        {rows.map((row) => (
          <tr
            key={row.key}
            className={`border-t ${LINE.subtle} max-md:grid max-md:gap-3 max-md:py-5 md:last:border-b`}
          >
            {row.cells.map((cell, i) => (
              <td
                key={columns[i]}
                className="min-w-0 align-middle max-md:block md:px-5 md:py-4 md:first:pl-0"
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
  );
};
