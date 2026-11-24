import Link from 'next/link';
// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React, { useRef, useState } from 'react';
import { FiCheck, FiMinus } from 'react-icons/fi';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import {
  BODY_MUTED,
  BODY_SMALL,
  INK,
  LABEL,
  LINE,
  LINK,
  SUB_HEADING,
  SURFACE,
} from '@/component/styles/typography';

const gridColumnsClasses = {
  3: 'grid-cols-[minmax(0,1fr)_30px_repeat(3,minmax(150px,1fr))]',
  4: 'grid-cols-[minmax(0,1fr)_30px_repeat(4,minmax(150px,1fr))]',
  5: 'grid-cols-[minmax(0,1fr)_30px_repeat(5,minmax(150px,1fr))]',
};

const gridColumnsClass = (columnCount: number) =>
  gridColumnsClasses[columnCount] ?? gridColumnsClasses[5];

const TableHeader = ({ data, scrollData, isMonthly }) => {
  return (
    <div
      className={`grid ${gridColumnsClass(data.columnItems?.length)} pt-6 px-6 ${SURFACE.tableHead}`}
    >
      {/* Sticky Header Column */}
      <div
        className={`${SUB_HEADING} sticky top-0 left-0 z-10 ${SURFACE.tableHead} pl-4 pb-2`}
      >
        {data.tableHeader}
      </div>
      {/* Sticky void column */}
      <div className="sticky left-[175px] z-10">
        {scrollData && scrollData.scrollLeft > 80 && (
          <div
            className={`w-[30px] h-full bg-linear-to-r ${SURFACE.tableFade} to-transparent`}
          ></div>
        )}
      </div>
      {/* Remaining Columns Titles */}
      {data.columnItems?.map((headerItem, index) => (
        <div key={`${headerItem.columnHeader}-${index}`}>
          <div className="text-center">
            <Link
              href={`${headerItem.columnHeaderLink}`}
              className={`${LABEL} ${LINK}`}
            >
              {headerItem.columnHeader} {headerItem.isReccomended ? '⭐️' : ''}
            </Link>
          </div>
          <div className={`${BODY_MUTED} text-center`}>
            {isMonthly === false && headerItem.columnByLineAnnual
              ? headerItem.columnByLineAnnual
              : headerItem.columnByLine}
          </div>
        </div>
      ))}
    </div>
  );
};

const TableBox = ({ data, index = 0, isMonthly = undefined }) => {
  const [infoIconHoverIndex, setInfoHoveredIndex] = useState(null);
  const [scrollData, setScrollData] = useState(null);
  const scrollContainerRef = useRef(null);

  const handleMouseEnter = (rowIndex) => {
    setInfoHoveredIndex(rowIndex);
  };

  const handleMouseLeave = () => {
    setInfoHoveredIndex(null);
  };

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setScrollData({ scrollLeft, clientWidth, scrollWidth });
    }
  };

  return (
    <div className={`${SURFACE.tableHead} rounded-t-lg w-full`}>
      <div className="lg:mx-auto relative max-w-(--breakpoint-xl)">
        <div
          className="overflow-x-scroll lg:overflow-x-hidden shadow-2xl rounded-2xl lg:shadow-none snap-x"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          <div
            className={`min-w-[1200px] ${SURFACE.tableHead} p-6 rounded-3xl`}
          >
            {/* Void column on the right */}
            <div
              className={`absolute top-0 bottom-4 right-0 w-[40px] bg-linear-to-l ${SURFACE.tableFade} to-transparent rounded-2xl pointer-events-none lg:hidden`}
            ></div>

            {/* Sticky Table Header */}
            <div className={`${SURFACE.tableHead} pb-4`}>
              <TableHeader
                data={data}
                scrollData={scrollData}
                isMonthly={isMonthly}
              />
            </div>
            {/* Table Rows */}
            <div
              className={`border-t ${LINE.strong} lg:bg-transparent`}
              key={index}
            >
              {data.rowItems?.map((row, rowIndex) => (
                <div
                  key={`${row.rowHeader}-${rowIndex}`}
                  className={`grid ${gridColumnsClass(data.columnItems?.length)} min-h-[50px] px-6 hover:surface-table-row-hover ${SURFACE.tableHead} snap-start group`}
                >
                  <div
                    className={`flex ${SURFACE.tableHead} items-center sticky left-0 snap-start group-hover:surface-table-row-hover ${infoIconHoverIndex === rowIndex ? 'z-30' : ''}`}
                  >
                    <div className={`${LABEL} pl-2 py-2 flex items-center`}>
                      {row.rowHeaderLink ? (
                        <Link
                          href={row.rowHeaderLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={LINK}
                        >
                          {row.rowHeader}
                        </Link>
                      ) : (
                        row.rowHeader
                      )}
                      {row.rowDescription && (
                        <div
                          className="relative ml-1 flex items-center"
                          onMouseEnter={() => handleMouseEnter(rowIndex)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <IoMdInformationCircleOutline
                            className={`${INK.brand} text-xl z-20`}
                          />
                          {infoIconHoverIndex === rowIndex && (
                            <div
                              className={`${BODY_SMALL} absolute top-1/2 left-full transform -translate-y-1/2 ml-2 p-2 rounded-lg shadow-lg w-max max-w-xs break-words whitespace-normal text-center ${SURFACE.tooltip}`}
                            >
                              <div
                                className={`absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 ${SURFACE.tooltipArrow}`}
                              ></div>
                              {row.rowDescription}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Sticky void column */}
                  <div className="sticky left-[179px] z-10">
                    {scrollData && scrollData.scrollLeft > 80 && (
                      <div
                        className={`w-[30px] h-full bg-linear-to-r ${SURFACE.tableFade} to-transparent group-hover:surface-table-fade-hover`}
                      ></div>
                    )}
                  </div>

                  {row.rowCells?.map((cell, cellIndex) => {
                    let cellData = {
                      columnHeader: '',
                      cellValue: '',
                      isTicked: false,
                    };

                    try {
                      cellData = JSON.parse(cell);
                    } catch (error) {
                      console.error('Invalid cell data format:', error);
                    }

                    return (
                      <div
                        key={`${row.rowHeader}-${cellIndex}`}
                        className={`${LABEL} text-center flex items-center justify-center snap-start`}
                      >
                        {cellData.isTicked ? (
                          <FiCheck />
                        ) : (
                          cellData.cellValue || <FiMinus />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBox;
