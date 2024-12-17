import { wrapFieldsWithMeta, type Template, type TinaField } from 'tinacms';
import IconSelector from '../../forms/IconSelector';
import { actionsButtonTemplateFields } from '../ActionButton/ActionsButton.template';

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
          description:
            'Video source for desktop devices, we recommend using a webm file for better performance.',
        },
        {
          name: 'mobileVideoSrc',
          label: 'Mobile Video Source',
          type: 'image',
          description:
            'Video source for mobile devices, we recommend using a gif to avoid errors on certain iOS devices.',
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
