// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React, { useEffect, useState } from 'react';
import { type Template, wrapFieldsWithMeta } from 'tinacms';

//This is used to get the "boolean"  and criteria (string) values from the company x criteria strings
export const splitOneAndJoin = (item, separator) => {
  //"First" is the boolean value, "rest" is the criteria
  const [first, ...rest] = item.split(separator);
  return [first, rest.join(separator)];
};

export const tableTemplate: Template = {
  label: '<⭐> Table Box',
  name: 'table',
  ui: {
    previewSrc: '/img/blocks/table.png',
  },
  fields: [
    {
      name: 'tableHeader',
      label: 'Table Header',
      type: 'string',
    },
    {
      name: 'columnItems',
      label: 'Column Items',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.columnHeader,
        }),
      },
      fields: [
        { name: 'isReccomended', label: 'Is Reccomended?', type: 'boolean' },
        { name: 'columnHeader', label: 'Column Header', type: 'string' },
        { name: 'columnByLine', label: 'Column By-Line', type: 'string' },
        { name: 'columnHeaderLink', label: 'Column Link', type: 'string' },
      ],
    },
    {
      name: 'rowItems',
      label: 'Row Items',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.rowHeader,
        }),
      },
      fields: [
        { name: 'rowHeader', label: 'Row Header', type: 'string' },
        {
          name: 'rowDescription',
          label: 'Row Description',
          type: 'string',
          ui: { component: 'textarea' },
        },
        {
          name: 'rowCells',
          label: 'Row Cells',
          type: 'string',
          list: true,
          description:
            'Stored as a stringified object: {"columnHeader": "value", "cellValue": "", "cellTicked": true/false}',
          ui: {
            component: wrapFieldsWithMeta(({ input }) => {
              const [value, setValue] = useState(input.value || []);
              const [valueMap, setValueMap] = useState([]);

              useEffect(() => {
                if (!value) {
                  return;
                }
                const parsedValue = value.map((item) => {
                  try {
                    return JSON.parse(item);
                  } catch {
                    return {
                      columnHeader: 'Unknown',
                      cellValue: '',
                      isTicked: false,
                    };
                  }
                });
                setValueMap(parsedValue);
              }, [value]);

              const updateCellValue = (index, newValue) => {
                const updatedValueMap = [...valueMap];
                updatedValueMap[index].cellValue = newValue;

                setValueMap(updatedValueMap);
                const stringifiedValue = updatedValueMap.map((item) =>
                  JSON.stringify(item),
                );
                setValue(stringifiedValue);
                input.onChange(stringifiedValue);
              };

              const handleCheckboxChange = (index, isChecked) => {
                const updatedValueMap = [...valueMap];
                updatedValueMap[index].isTicked = isChecked;

                setValueMap(updatedValueMap);
                const stringifiedValue = updatedValueMap.map((item) =>
                  JSON.stringify(item),
                );
                setValue(stringifiedValue);
                input.onChange(stringifiedValue);
              };

              return (
                <div>
                  {valueMap.map((cell, index) => (
                    <div className="mb-2" key={cell.id}>
                      <div className="flex mb-1">
                        <span className="mr-3 font-bold">
                          {cell.columnHeader}:
                        </span>
                        <input
                          type="text"
                          value={cell.cellValue}
                          onChange={(e) =>
                            updateCellValue(index, e.target.value)
                          }
                          className={` flex-1 px-4 border  ${
                            cell.isTicked
                              ? 'bg-gray-700/30 cursor-not-allowed border-gray-700/30'
                              : ' border-gray-600'
                          }`}
                          disabled={cell.isTicked}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`defaultTickCheckbox-${index}`}
                          className="mr-3"
                        >
                          Tick Icon Instead?
                        </label>
                        <input
                          type="checkbox"
                          className=""
                          id={`defaultTickCheckbox-${index}`}
                          checked={cell.isTicked || false}
                          onChange={(e) =>
                            handleCheckboxChange(index, e.target.checked)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              );
            }),
          },
        },
      ],
    },
  ],
};
