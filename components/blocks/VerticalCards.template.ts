import type { TinaTemplate } from 'tinacms';

export const verticalCardsTemplate: TinaTemplate = {
  label: 'Vertical Cards',
  name: 'verticalCards',
  ui: {
    previewSrc: '',
  },
  fields: [
    {name: 'title', label: 'Title', type: 'string'},
    {
      name: 'cardItems',
      label: 'Card Items',
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
        { name: 'description', label: 'Description', type: 'string' },
        { name: 'timeDate', label: 'Time and Date', type: 'string' },
        { name: 'location', label: 'Location', type: 'string' },
        { name: 'price', label: 'Price', type: 'string' },
        { name: 'image', label: 'Image', type: 'string' },
        { name: 'link', label: 'URL', type: 'string'},
        { name: 'globeid', label:'globe-id', type: 'number', description: 'Note this field corresponds to a location on the globe. When adding new events contact a developer to add new locations to the globe.'}
      ],
    },
  ],
};
