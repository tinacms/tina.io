export const RecipeBlock = {
  name: 'recipeBlock',
  label: 'Recipe Block',
  fields: [
    {
      name: 'title',
      label: 'Heading Title',
      type: 'string',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
    },
    {
      name: 'codeblock',
      label: 'Code Block',
      type: 'rich-text',
    },
    {
      name: 'instruction',
      label: 'Instruction',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.header }
        },
      },
      fields: [
        {
          name: 'header',
          label: 'Header',
          type: 'string',
        },
        {
          name: 'itemDescription',
          label: 'Item Description',
          type: 'string',
        },
        {
          name: 'codeLineStart',
          label: 'Code Line Start',
          type: 'number',
          description: 'Please note that if you enter negative values, it will highlight from 0 to your end number'
        },
        {
          name: 'codeLineEnd',
          label: 'Code Line End',
          type: 'number',
          description: 'Please note that highlighting will not work if your end number is > than your start number'
        }
      ],
    },
  ],
};
