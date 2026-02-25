import type { Template } from 'tinacms';
import { IconPickerInput } from '../../forms/IconPicker';

export const professionalServicesTemplate: Template = {
  label: 'Professional Services',
  name: 'professionalServices',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'string',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
      ui: { component: 'textarea' },
    },
    {
      name: 'services',
      label: 'Services',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
      },
      fields: [
        {
          name: 'icon',
          label: 'Icon',
          type: 'string',
          ui: {
            component: IconPickerInput,
          },
        },
        {
          name: 'title',
          label: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'string',
          ui: { component: 'textarea' },
        },
        {
          name: 'features',
          label: 'Features',
          type: 'string',
          list: true,
        },
        {
          name: 'link',
          label: 'Link',
          type: 'string',
        },
      ],
    },
  ],
};
