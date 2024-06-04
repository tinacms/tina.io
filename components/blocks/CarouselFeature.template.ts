import type { TinaTemplate } from 'tinacms';
import IconSelector from './IconSelector';
import { actionsTemplate } from './Actions.template';

export const carouselFeatureTemplate: TinaTemplate = {
  label: 'Carousel Feature',
  name: 'carouselFeature',
  ui: {
    previewSrc: '/img/blocks/feature-grid.png',
  },
  fields: [
    {
      name: 'items',
      label: 'Carousel Feature Items',
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
        {
          name: 'text',
          label: 'Text',
          ui: { component: 'textarea' },
          type: 'string',
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'string',
          ui: {
            component: IconSelector,
          },
        },
        {
          name: 'videoSrc',
          label: 'Video Source',
          description: 'This is the Cloudinary Public ID, for example "tina-io/docs/quick-edit-demo".',
          type: 'string',
        },
        // @ts-ignore
        ...actionsTemplate.fields,
      ],
    },
  ],
};

export default carouselFeatureTemplate;
