import React, { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { FiMinus } from 'react-icons/fi';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const TableBox = ({ data, index }) => {
  const [infoIconHoverIndex, setInfoHoveredIndex] = useState(null);

  const handleMouseEnter = (rowIndex) => {
    setInfoHoveredIndex(rowIndex);
  };

  const handleMouseLeave = () => {
    setInfoHoveredIndex(null);
  };

  return (
    <div className="mx-auto p-4">
      <div className="pl-4 text-gray-700 font-bold">{data.tableHeader}</div>
      <div className="border-t border-gray-300" key={index}>
        {data.rowItems?.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid grid-cols-[1fr,repeat(5,minmax(0,1fr))] 2xl:grid-cols-[1fr,repeat(5,minmax(0,1.10fr))] border-b border-gray-300/50 px-6 py-2 hover:bg-cyan-400/5 relative`}
          >
            <div className="px-4 whitespace-nowrap font-medium flex items-center relative">
              {row.rowHeader}
              {row.rowDescription && (
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(rowIndex)}
                  onMouseLeave={handleMouseLeave}
                >
                  <IoMdInformationCircleOutline className="ml-1 text-orange-500 text-xl relative z-20" />
                  {infoIconHoverIndex === rowIndex && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-sm p-2 rounded-lg shadow-lg xl:w-[300px] w-[150px] break-words z-[1050]">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
                      {row.rowDescription}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Row Cells */}
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
                  className="text-center flex items-center justify-center z-10"
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
  );
};

export default TableBox;
