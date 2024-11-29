import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';
import { FiMinus } from 'react-icons/fi';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const TableHeader = ({ data, scrollData }) => {
  return (
    <div className="grid grid-cols-[1fr,30px,repeat(5,minmax(150px,1fr))] pt-6 px-6 bg-slate-50">
      {/* Sticky Header Column */}
      <div className="sticky top-0 left-0 z-10 bg-slate-50 pl-4 pb-2 text-gray-700 font-bold">
        {data.tableHeader}
      </div>
      {/* Sticky void column */}
      <div className="sticky left-[175px] z-10">
        {scrollData && scrollData.scrollLeft > 80 && (
          <div className="w-[30px] h-full bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent"></div>
        )}
      </div>
      {/* Remaining Columns Titles */}
      {data.columnItems?.map((headerItem, index) => (
        <div key={index}>
          <div className="text-center font-bold text-gray-700 underline decoration-dotted">
            <Link href={`${headerItem.columnHeaderLink}`}>
              {headerItem.columnHeader}
            </Link>
          </div>
          <div className="text-center font-light text-xs text-slate-400">
            {headerItem.columnByLine}
          </div>
        </div>
      ))}
    </div>
  );
};

const TableBox = ({ data, index }) => {
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
    <div className="bg-slate-50">
      <div className="lg:mx-auto relative max-w-screen-xl">
        <div
          className="overflow-x-scroll lg:overflow-x-hidden shadow-2xl rounded-2xl lg:shadow-none snap-x"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          <div className="min-w-[1200px] bg-slate-50 p-6 rounded-3xl">
            {/* Void column on the right */}
            <div className="absolute top-0 bottom-4 right-0 w-[40px] bg-gradient-to-r from-transparent  via-slate-50/80 to-slate-50 rounded-2xl pointer-events-none lg:hidden"></div>

            {/* Sticky Table Header */}
            <div className=" bg-slate-50 pb-4">
              <TableHeader data={data} scrollData={scrollData} />
            </div>
            {/* Table Rows */}
            <div
              className="border-t border-gray-300 lg:bg-transparent"
              key={index}
            >
              {data.rowItems?.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="grid grid-cols-[1fr,30px,repeat(5,minmax(150px,1fr))] h-[50px] px-6 hover:bg-cyan-400/5 bg-slate-50 snap-start group"
                >
                  <div className="flex bg-slate-50 items-center sticky left-0 snap-start group-hover:bg-transparent">
                    <div className="pl-2 py-2 whitespace-nowrap font-medium flex items-center">
                      {row.rowHeader}
                      {row.rowDescription && (
                        <div
                          className="relative ml-1 flex items-center"
                          onMouseEnter={() => handleMouseEnter(rowIndex)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <IoMdInformationCircleOutline className="text-orange-500 text-xl z-20" />
                          {infoIconHoverIndex === rowIndex && (
                            <div className="absolute top-1/2 left-full transform -translate-y-1/2 ml-2 text-sm p-2 rounded-lg shadow-lg w-[300px] break-words whitespace-normal text-center bg-white">
                              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
                              {row.rowDescription}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Sticky void column */}
                  <div className="sticky left-[175px] z-10">
                    {scrollData && scrollData.scrollLeft > 80 && (
                      <div className="w-[30px] h-full bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent"></div>
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
                        key={cellIndex}
                        className="text-center flex items-center justify-center snap-start"
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
