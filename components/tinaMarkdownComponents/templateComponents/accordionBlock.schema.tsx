export const AccordionBlockSchema = {
  name: 'accordionBlock',
  label: 'Accordion Block',
  fields: [
    {
      name: 'fullWidth',
      label: 'Full Width',
      type: 'boolean',
    },
    {
      name: 'accordionItems',
      label: 'Accordion Items',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.heading ?? 'Accordion Item',
          };
        },
        defaultItem: {
          heading: 'Click to expand',
        },
      },
      fields: [
        {
          name: 'heading',
          label: 'Heading',
          type: 'string',
          description:
            'The heading text that will be displayed in the collapsed state',
        },
        {
          name: 'docText',
          label: 'Body Text',
          type: 'rich-text',
        },
        {
          name: 'image',
          label: 'Image',
          type: 'image',
        },
      ],
    },
  ],
};
