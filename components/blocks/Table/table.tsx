import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';
import { FiMinus } from 'react-icons/fi';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const TableHeader = ({ data, scrollData }) => {
  return (
    <div className="grid grid-cols-[1fr,30px,repeat(5,minmax(150px,1fr))] pt-6 px-6 bg-[#EBF8FD]">
      {/* Sticky Header Column */}
      <div className="sticky top-0 left-0 z-10 bg-[#EBF8FD] pl-4 pb-2 text-gray-700 font-bold">
        {data.tableHeader}
      </div>
      {/* Sticky void column */}
      <div className="sticky left-[175px] z-10">
        {scrollData && scrollData.scrollLeft > 80 && (
          <div className="w-[30px] h-full bg-gradient-to-r from-[#EBF8FD] via-[#EBF8FD]/30 to-transparent"></div>
        )}
      </div>
      {/* Remaining Columns Titles */}
      {data.columnItems.map((headerItem, index) => (
        <div key={index}>
          <div className="text-center font-bold text-gray-700 underline decoration-dotted">
            <Link href={`${headerItem.columnHeaderLink}`}>
              {headerItem.columnHeader}
            </Link>
          </div>
          <div className="text-center font-light text-slate-400">
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
      console.log(scrollLeft);
      if (scrollLeft === 0) {
        console.log('at the start', scrollLeft);
      } else if (scrollLeft + clientWidth >= scrollWidth) {
        console.log('at the end');
      }
    }
  };

  return (
    <div className="lg:mx-auto p-4 relative">
      <div
        className="overflow-x-scroll lg:overflow-x-hidden shadow-2xl rounded-2xl lg:shadow-none snap-x"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <div className="min-w-[1200px] bg-[#EBF8FD] lg:bg-transparent p-6 rounded-3xl">
          {/* Void column on the right */}
          <div className="absolute top-4 bottom-4 right-4 w-[40px] bg-gradient-to-r from-transparent rounded-2xl via-[#EBF8FD]/30 to-[#EBF8FD] pointer-events-none lg:hidden"></div>

          {/* Sticky Table Header */}
          <div className=" bg-[#EBF8FD]">
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
                className="grid grid-cols-[1fr,30px,repeat(5,minmax(150px,1fr))] h-[50px] border-b border-gray-300/50 px-6 hover:bg-cyan-400/5 bg-[#EBF8FD] snap-start"
              >
                <div className="flex bg-[#EBF8FD] items-center sticky left-0 snap-start ">
                  <div className="px-4 py-2 whitespace-nowrap font-medium flex items-center">
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
                    <div className="w-[30px] h-full bg-gradient-to-r from-[#EBF8FD] via-[#EBF8FD]/30 to-transparent"></div>
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
  );
};

export default TableBox;
