import { wrapFieldsWithMeta, type Template, type TinaField } from 'tinacms';
import IconSelector from './IconSelector';
import { actionsButtonTemplateFields } from './ActionsButton.template';

export const carouselFeatureTemplate: Template = {
  label: 'Carousel Feature',
  name: 'carouselFeature',
  ui: {
    previewSrc: '/img/blocks/feature-grid.png',
  },
  fields: [
    {
      name: 'blockHeadline',
      label: 'Block Headline',
      type: 'string',
    },
    {
      name: 'items',
      label: 'Carousel Feature',
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
          name: 'icon2',
          label: 'Icon',
          type: 'string',
          description:
            "Can't find the icon you want? ask a developer to add it",
          ui: {
            component: wrapFieldsWithMeta(IconSelector),
          },
        },
        {
          name: 'videoSrc',
          label: 'Video Source',
          type: 'image',
        },
        {
          name: 'button',
          label: 'Button',
          type: 'object',
          fields: [...actionsButtonTemplateFields.fields],
        },
      ] as TinaField[],
    },
  ],
};

export default carouselFeatureTemplate;
