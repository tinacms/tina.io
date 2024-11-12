import { type Template } from "tinacms";
import { checkboxList } from '../../tina/customTinaFormFields/checkboxList';

export const criteriaMapping = (values) => {
  values.blocks.forEach((block, blockIndex) => {
    if (block._template === 'CompareBox') {
    const criteriaItems = block.criteriaItems?.map((item) => {item.criteria});
    block.companies?.forEach((item, index) => {
      {
        // Add new criteria to the list of satisfied criteria
        const oldCriteria = item.satifiedCriteria?.map((item) => {item.split("-")[1]});
        criteriaItems.forEach((item) => {
          if (!oldCriteria.includes(item)) {
            item.satifiedCriteria?.push(`false-${item}`);
          }
        });
        // Remove criteria that are no longer in the list of criteria
        item.satifiedCriteria = item.satifiedCriteria?.flatMap((item) => {
          const keyItem = item.split("-");
          if (!criteriaItems.includes(keyItem[1])) {
            return [];
          }
          return item;
        });
        values.blocks[blockIndex].companies[index].satifiedCriteria = item.satifiedCriteria;
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
            name: 'satifiedCriteria',
            label: 'Satisfied Criteria',
            type: 'string',
            list: true,
            ui: {
              component: (props) => {
                console.log(`value _ ${props.input.value}`);
                checkboxList(
                  [],
                  // props.input.value.map((item) => {
                  //   return { criteria: item.split("-")[1], satisfied: item.split("-")[0] === 'true' };
                  // }),
                  (criteria, satisfied) => {
                    return `${satisfied}-${criteria}`;
                  }
                )
              }
            },
          }
        ],
      },
    ],
  };
