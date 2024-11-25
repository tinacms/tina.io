import { useEffect, useState } from 'react';
import { wrapFieldsWithMeta, type Template } from 'tinacms';
import { checkboxList } from '../../../tina/customTinaFormFields/checkboxList';
import { Blocks } from '../Blocks';
import { cp } from 'fs';

//This is used to get the "boolean"  and criteria (string) values from the company x criteria strings
export const splitOneAndJoin = (item, separator) => {
  //"First" is the boolean value, "rest" is the criteria
  const [first, ...rest] = item.split(separator);
  return [first, rest.join(separator)];
};

//This should be called on save to update the satisfied criteria list for each company
export const criteriaMapping = (values) => {
  values.blocks.forEach((block, blockIndex) => {
    if (block._template === 'CompareBox') {
      const criteriaItems = block.criteriaItems?.map((item) => item.criteria);
      block.companies?.forEach((company, index) => {
        {
          // Get current satisfied criteria list for the company
          const oldCriteria =
            company.satisfiedCriteria?.map(
              (item) => splitOneAndJoin(item, '-')[1]
            ) ?? [];
          const updatedCriteriaSatisfaction = [];
          // Populate the satisfied criteria list to match the criteria list, adding new criteria if needed and re-using old criteria if possible
          criteriaItems.forEach((item) => {
            if (oldCriteria.includes(item)) {
              const satisfaction = company.satisfiedCriteria.find(
                (criteria) => splitOneAndJoin(criteria, '-')[1] === item
              );
              updatedCriteriaSatisfaction.push(satisfaction);
            } else {
              updatedCriteriaSatisfaction.push(`false-${item}`);
            }
          });
          // Rewrite the Tina form values with the updated satisfied criteria list before saving
          values.blocks[blockIndex].companies[index].satisfiedCriteria =
            updatedCriteriaSatisfaction;
        }
      });
    }
    if (block._template === 'table') {
      const columnItems = block.columnItems?.map((item) => item.columnHeader);

      block.rowItems?.forEach((row, index) => {
        const oldRowCells = row.rowCells ?? [];
        

        const updatedRowCells = columnItems.map((item) => {
          const existingCell = oldRowCells.find((cell) => {
            try {
              const parsedCell = JSON.parse(cell);
              return parsedCell.columnHeader === item;
            } catch (e) {
              return false;
            }
          });

          return (
            existingCell ??
            JSON.stringify({ columnHeader: item, cellValue: '', isTicked: false })
          );
        });

        values.blocks[blockIndex].rowItems[index].rowCells = updatedRowCells;
      });
    }
  });
  return {
    values,
  };
};

export const compareBoxTemplate: Template = {
  label: 'Compare Box',
  name: 'CompareBox',
  fields: [
    {
      name: 'criteriaItems',
      label: 'Criteria',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.criteria,
        }),
      },
      fields: [
        { name: 'criteria', label: 'Criteria', type: 'string' },
        {
          name: 'description',
          label: 'Description',
          ui: { component: 'textarea' },
          type: 'string',
          description: 'Displayed as a tooltip when users hover over the ⓘ.',
        },
      ],
    },
    {
      name: 'companies',
      label: 'Company',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.headline,
        }),
      },
      fields: [
        { name: 'headline', label: 'Headline', type: 'string' },
        { name: 'logoColour', label: 'Logo Link (Colour)', type: 'string' },
        { name: 'logoWhite', label: 'Logo Link (White)', type: 'string' },
        {
          name: 'active',
          label: 'Active',
          type: 'boolean',
          description: 'Toggle to highlight which company is BY DEFAULT active',
        },
        {
          name: 'isHidden',
          label: 'Hidden',
          type: 'boolean',
          description:
            'Toggle will hide the company item from the list of clickable companies - it will also ensure it cannot be turned off.',
        },
        {
          name: 'backgroundColor',
          label: 'Background Color',
          type: 'string',
          ui: { component: 'color' },
          description: 'Choose a background color for the company',
        },
        {
          name: 'satisfiedCriteria',
          label: 'Satisfied Criteria',
          type: 'string',
          description:
            'Labels are updated to match the criteria list on save. ⚠️ Please save your changes before and after editing this field. ⚠️',
          list: true,
          ui: {
            component: wrapFieldsWithMeta(({ input }) => {
              const [value, setValue] = useState(input.value);
              const [valueFlag, setValueFlag] = useState(true);
              const [valueMap, setValueMap] = useState([]);

              useEffect(() => {
                if (valueFlag) {
                  setValueFlag(false);
                  return;
                }
                if (input.value !== value) {
                  setValue(input.value);
                }
              }, [input.value]);

              useEffect(() => {
                if (!value) return;
                const mapping = value?.map((item: string) => {
                  return {
                    criteria: splitOneAndJoin(item, '-')[1],
                    satisfied: splitOneAndJoin(item, '-')[0] === 'true',
                  };
                });
                setValueMap(mapping);
              }, [value]);

              return checkboxList((criteria: string, satisfied: boolean) => {
                const index = value.findIndex(
                  (item) => splitOneAndJoin(item, '-')[1] === criteria
                );
                value[index] = `${satisfied}-${criteria}`;
                setValue([...value]);
                input.onChange([...value]);
                setValueFlag(true);
              }, valueMap);
            }),
          },
        },
      ],
    },
  ],
};
