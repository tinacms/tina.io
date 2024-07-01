import type { TinaTemplate } from 'tinacms';

export const verticalCardsTemplate: TinaTemplate = {
  label: 'Vertical Cards',
  name: 'verticalCards',
  ui: {
    previewSrc: '',
  },
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
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
        { name: 'timeDate', label: 'Time and Date', type: 'string' },
        { name: 'location', label: 'Location', type: 'string' },
        { name: 'image', label: 'Image', type: 'string' },
        { name: 'link', label: 'URL', type: 'string' },
        { name: 'markerLAT', label: 'Marker Latitude', type: 'number', description: 'Note this field corresponds to the Latitude position of the marker on the globe.' },
        { name: 'markerLONG', label: 'Marker Longitude', type: 'number', description: 'Note this field corresponds to the Longitude position of the marker on the globe.' },
      ],
    },
  ],
};
