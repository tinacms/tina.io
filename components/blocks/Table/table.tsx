import React, { useState } from 'react';
import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';
import { FiMinus } from 'react-icons/fi';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const TableHeader = ({ data }) => {
  return (
    <div className="grid grid-cols-[1fr,repeat(5,minmax(150px,1fr))] px-6">
      <div className="sticky left-0 z-10"></div>
      {data.map((headerItem, index) => (
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

  const handleMouseEnter = (rowIndex) => {
    setInfoHoveredIndex(rowIndex);
  };

  const handleMouseLeave = () => {
    setInfoHoveredIndex(null);
  };

  return (
    <div className="lg:mx-auto p-4">
      <div className="overflow-x-scroll lg:overflow-x-hidden shadow-2xl lg:shadow-none">
        <div className="min-w-[1200px] bg-[#EBF8FD] lg:bg-transparent p-6 rounded-3xl">
          <TableHeader data={data.columnItems} />
          <div className="pl-10 pb-2  text-gray-700 font-bold sticky rounded-3xl left-0 z-10">
            {data.tableHeader}
          </div>
          <div
            className="border-t border-gray-300 lg:bg-transparent"
            key={index}
          >
            {data.rowItems?.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-[1fr,repeat(5,minmax(150px,1fr))] border-b border-gray-300/50 px-6 py-2 hover:bg-cyan-400/5"
              >
                <div
                  className="px-4 whitespace-nowrap font-medium flex items-center sticky bg-[#EBF8FD] lg:bg-transparent left-0 z-10"
                >
                  {row.rowHeader}
                  {row.rowDescription && (
                    <div
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(rowIndex)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <IoMdInformationCircleOutline className="ml-1 text-orange-500 text-xl" />
                      {infoIconHoverIndex === rowIndex && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2  text-sm p-2 rounded-lg shadow-lg w-[300px] break-words">
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
                          {row.rowDescription}
                        </div>
                      )}
                    </div>
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
                      className="text-center flex items-center justify-center"
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
