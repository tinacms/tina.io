import { useEffect, useState } from "react";
import { wrapFieldsWithMeta, type Template } from "tinacms";
import { checkboxList } from "../../../tina/customTinaFormFields/checkboxList";

export const splitOneAndJoin = (item, separator) => {
    const[first, ...rest] = item.split(separator)
    return [first, rest.join(separator)]
}

export const criteriaMapping = (values) => {
  values.blocks.forEach((block, blockIndex) => {
    if (block._template === 'CompareBox') {
    const criteriaItems = block.criteriaItems?.map((item) => item.criteria);
    block.companies?.forEach((company, index) => {
      {
        // Add new criteria to the list of satisfied criteria
        const oldCriteria = company.satisfiedCriteria?.map((item) => splitOneAndJoin(item, "-")[1]) ?? [];
        const updatedCriteriaSatisfaction = [];
        criteriaItems.forEach((item) => {
          if (oldCriteria.includes(item)) {
            const satisfaction = company.satisfiedCriteria.find((criteria) => splitOneAndJoin(criteria, "-")[1] === item);
            updatedCriteriaSatisfaction.push(satisfaction);
          } else {
            updatedCriteriaSatisfaction.push(`false-${item}`);
          }
        });
        values.blocks[blockIndex].companies[index].satisfiedCriteria = updatedCriteriaSatisfaction;
      }
    });
  };
  });
  return {
    values
  }
}


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
            description:
              'The text inside the description will NOT be displayed anywhere, this is just to elaborate on the criteria itself for our own users.',
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
                    return { criteria: splitOneAndJoin(item, "-")[1], satisfied: splitOneAndJoin(item, "-")[0] === 'true' };
                  });
                  setValueMap(mapping);
                }, [value]);

                return checkboxList(
                  (criteria: string, satisfied: boolean) => {
                    const index = value.findIndex((item) => splitOneAndJoin(item, "-")[1] === criteria);
                    value[index] = `${satisfied}-${criteria}`;
                    setValue([...value]);
                    input.onChange([...value]);
                    setValueFlag(true);
                  },
                  valueMap
                )
              }),
            },
          }
        ],
      },
    ],
  };
